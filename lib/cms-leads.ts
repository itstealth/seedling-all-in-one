// lib/cms-leads.ts
//
// Copies form submissions into the CMS (cms.stealthnexus.in) so each school
// sees every website lead, with its UTM attribution, in one inbox.
//
// The rules this file exists to keep:
//
//   1. It never changes what a form already does. The site's own database,
//      Google Sheet and payment flow run exactly as before; this is an extra
//      copy, and nothing here can fail a submission (every entry point
//      swallows its own errors).
//
//   2. A submission is never lost. It is first written to a file in a local
//      outbox (outside the web root), and only deleted once the CMS has
//      confirmed it. If the CMS is down, slow, or not configured yet, the file
//      stays and is retried after later submissions and every 10 minutes.
//
//   3. A retry can never create a duplicate. Each submission gets one id when
//      it is queued, and the CMS stores at most one lead per id per school.
//
//   4. Tokens are never written into an outbox file -- each file records only
//      the NAME of the setting that holds its token.
//
// Settings (CMS_URL and the ingest tokens) come from the environment or, if
// absent there, from `config.json` in the outbox directory. The file is read
// on every delivery run, so the CMS can be switched on, or a token rotated,
// without restarting the website.
import { randomUUID } from 'node:crypto';
import { mkdir, readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type LeadTouch = Record<string, string>;
export type LeadAttribution = { first?: LeadTouch; last?: LeadTouch };

type Kind = 'lead' | 'career';

type Envelope = {
  kind: Kind;
  tokenEnv: string;
  payload: Record<string, unknown>;
  queuedAt: string;
};

export const ATTRIBUTION_COOKIE = 'sd_attr';

const ENDPOINT: Record<Kind, string> = {
  lead: '/api/ingest/v1/leads',
  career: '/api/ingest/v1/career',
};

function outboxDir(): string {
  return process.env.CMS_OUTBOX_DIR || path.join(process.cwd(), '.cms-outbox');
}

async function readSettings(): Promise<Record<string, string>> {
  try {
    const parsed = JSON.parse(await readFile(path.join(outboxDir(), 'config.json'), 'utf8')) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter((e): e is [string, string] => typeof e[1] === 'string'),
    );
  } catch {
    return {};
  }
}

// ─── Reading the request ─────────────────────────────────────────────────

const TOUCH_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'gbraid', 'wbraid', 'msclkid', 'landing_page', 'referrer', 'ts',
];

function cleanTouch(value: unknown): LeadTouch | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const out: LeadTouch = {};
  for (const key of TOUCH_KEYS) {
    const v = (value as Record<string, unknown>)[key];
    if (typeof v === 'string' && v.trim()) out[key] = v.trim().slice(0, 1000);
  }
  return Object.keys(out).length ? out : undefined;
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

/** The first and latest visit the visitor's browser recorded (see LeadAttribution.tsx). */
export function attributionFrom(request: Request): LeadAttribution {
  try {
    const raw = readCookie(request.headers.get('cookie'), ATTRIBUTION_COOKIE);
    if (!raw) return {};
    const parsed = JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>;
    const out: LeadAttribution = {};
    const first = cleanTouch(parsed.first);
    const last = cleanTouch(parsed.last);
    if (first) out.first = first;
    if (last) out.last = last;
    return out;
  } catch {
    return {};
  }
}

/** The page the form was on, from the Referer the browser sends with a same-site POST. */
export function pageFrom(request: Request): { site: string | null; pageUrl: string | null } {
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const u = new URL(referer);
      return { site: u.host, pageUrl: `${u.origin}${u.pathname}${u.search}`.slice(0, 1000) };
    } catch {
      /* fall through */
    }
  }
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('x-original-host') ?? request.headers.get('host');
  return { site: host ? host.split(',')[0].trim() : null, pageUrl: null };
}

// ─── Queueing ────────────────────────────────────────────────────────────

/**
 * Writes the submission to the outbox and returns once it is on disk.
 *
 * `payload.externalId` is filled in when absent. Never throws: a failure is
 * logged and the form carries on exactly as it would have without the CMS.
 */
export async function queueForCms(
  kind: Kind,
  payload: Record<string, unknown>,
  tokenEnv = 'CMS_INGEST_TOKEN',
): Promise<void> {
  try {
    const externalId = typeof payload.externalId === 'string' ? payload.externalId : randomUUID();
    const envelope: Envelope = {
      kind,
      tokenEnv,
      payload: { submittedAt: new Date().toISOString(), ...payload, externalId },
      queuedAt: new Date().toISOString(),
    };
    const dir = path.join(outboxDir(), 'pending');
    await mkdir(dir, { recursive: true });
    // Timestamp first so a directory listing is oldest-first.
    const file = path.join(dir, `${Date.now()}-${kind}-${externalId}.json`);
    // Written to a temp name and renamed, so a crash mid-write can never leave
    // a half-written file for the sender to choke on.
    await writeFile(`${file}.tmp`, JSON.stringify(envelope), 'utf8');
    await rename(`${file}.tmp`, file);
  } catch (err) {
    console.error('[cms-leads] could not queue submission for the CMS:', err);
  }
}

// ─── Delivery ────────────────────────────────────────────────────────────

const state = globalThis as typeof globalThis & {
  __cmsOutboxFlush?: Promise<FlushResult> | null;
  __cmsOutboxTimer?: ReturnType<typeof setInterval>;
};

export type FlushResult = { sent: number; failed: number; waiting: number };

/**
 * Sends queued submissions to the CMS. Safe to call from anywhere and as often
 * as you like: concurrent calls share one run, and it never throws.
 */
export function flushOutbox(limit = 50): Promise<FlushResult> {
  if (!state.__cmsOutboxFlush) {
    state.__cmsOutboxFlush = runFlush(limit)
      .catch((err) => {
        console.error('[cms-leads] outbox flush failed:', err);
        return { sent: 0, failed: 0, waiting: -1 };
      })
      .finally(() => {
        state.__cmsOutboxFlush = null;
      });
  }
  return state.__cmsOutboxFlush;
}

async function runFlush(limit: number): Promise<FlushResult> {
  const result: FlushResult = { sent: 0, failed: 0, waiting: 0 };
  const settings = await readSettings();
  const setting = (name: string) => process.env[name] || settings[name];
  const base = setting('CMS_URL')?.replace(/\/$/, '');
  const pendingDir = path.join(outboxDir(), 'pending');
  let files: string[];
  try {
    files = (await readdir(pendingDir)).filter((f) => f.endsWith('.json')).sort();
  } catch {
    return result; // no outbox yet
  }
  result.waiting = files.length;
  if (!base) return result; // not configured yet: keep everything for later

  for (const name of files.slice(0, limit)) {
    const file = path.join(pendingDir, name);
    let envelope: Envelope;
    try {
      envelope = JSON.parse(await readFile(file, 'utf8')) as Envelope;
    } catch {
      await park(file, 'unreadable outbox file');
      result.failed++;
      continue;
    }
    const token = setting(envelope.tokenEnv);
    if (!token) continue; // token not configured yet: keep it

    let res: Response;
    try {
      res = await fetch(`${base}${ENDPOINT[envelope.kind]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(envelope.payload),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      break; // CMS unreachable: stop and try again later
    }

    if (res.ok) {
      await unlink(file).catch(() => undefined);
      result.sent++;
      result.waiting--;
    } else if (res.status === 400 || res.status === 413 || res.status === 422) {
      // The CMS will never accept this one as it is. Kept, not deleted, so a
      // person can look at it -- but out of the retry loop.
      await park(file, `HTTP ${res.status}: ${(await res.text().catch(() => '')).slice(0, 500)}`);
      result.failed++;
      result.waiting--;
    } else {
      // 401/403 (token problem), 429 (flood limit), 5xx: keep and stop.
      console.error(`[cms-leads] CMS answered HTTP ${res.status}; will retry later`);
      break;
    }
  }
  return result;
}

async function park(file: string, reason: string): Promise<void> {
  try {
    const failedDir = path.join(outboxDir(), 'failed');
    await mkdir(failedDir, { recursive: true });
    const dest = path.join(failedDir, path.basename(file));
    await rename(file, dest);
    await writeFile(`${dest}.reason.txt`, reason, 'utf8');
    console.error(`[cms-leads] parked ${path.basename(file)}: ${reason}`);
  } catch (err) {
    console.error('[cms-leads] could not park outbox file:', err);
  }
}

// Retry on a timer too, so a lead queued during a CMS outage goes out even if
// no one submits another form for a while. Not during `next build`, which
// imports route modules but must not start timers.
if (!state.__cmsOutboxTimer && process.env.NEXT_PHASE !== 'phase-production-build') {
  state.__cmsOutboxTimer = setInterval(() => void flushOutbox(), 10 * 60 * 1000);
  state.__cmsOutboxTimer.unref?.();
}

/** "Contact us page" for "/contact-us", "Home page" for "/". */
export function formNameForPath(pathname: string | null | undefined): string | undefined {
  if (!pathname) return undefined;
  const first = pathname.split(/[?#]/)[0].split('/').filter(Boolean)[0];
  if (!first) return 'Home page';
  const words = first.replace(/[-_]+/g, ' ').trim();
  return `${words.charAt(0).toUpperCase()}${words.slice(1)} page`.slice(0, 120);
}
