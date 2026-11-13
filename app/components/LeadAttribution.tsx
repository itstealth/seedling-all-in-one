// components/LeadAttribution.tsx
//
// Remembers how a visitor arrived -- UTM tags, ad click ids, the landing page
// and the referring site -- so that whichever form they fill in later, even
// days later or on another Seedling site, the lead carries its campaign.
//
// Stored in one first-party cookie, `sd_attr`, shared across
// *.seedlingschools.com for 90 days:
//
//   first: the first visit we ever saw from this browser (never overwritten)
//   last:  the most recent visit that came from a campaign or another site
//
// A plain internal click, or a direct visit, leaves both untouched, so a
// parent who clicks an ad, browses, and comes back by typing the address
// still credits the ad. Renders nothing.
'use client';

import { useEffect } from 'react';

const COOKIE = 'sd_attr';
const MAX_AGE = 90 * 24 * 60 * 60;
const PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'gbraid', 'wbraid', 'msclkid',
];
// Coming back from a payment page is not a new source of traffic.
const IGNORED_REFERRERS = /(^|\.)(seedlingschools\.com|atomtech\.in|ndpsgroup\.com|paynetz\.in)$/i;

type Touch = Record<string, string>;
type Attribution = { first?: Touch; last?: Touch };

function read(): Attribution | null {
  try {
    const match = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
    return match ? (JSON.parse(decodeURIComponent(match.slice(COOKIE.length + 1))) as Attribution) : null;
  } catch {
    return null;
  }
}

function write(value: Attribution): void {
  const host = window.location.hostname;
  const domain = host === 'seedlingschools.com' || host.endsWith('.seedlingschools.com') ? '; Domain=.seedlingschools.com' : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${domain}${secure}`;
}

function capture(): void {
  const url = new URL(window.location.href);
  const touch: Touch = {};
  for (const key of PARAMS) {
    const v = url.searchParams.get(key);
    if (v) touch[key] = v.slice(0, 200);
  }

  let referrer = '';
  if (document.referrer) {
    try {
      if (!IGNORED_REFERRERS.test(new URL(document.referrer).hostname)) referrer = document.referrer.slice(0, 500);
    } catch {
      /* ignore malformed referrer */
    }
  }

  const existing = read();
  const isNewSource = Object.keys(touch).length > 0 || referrer !== '';
  if (existing?.first && !isNewSource) return;

  if (referrer) touch.referrer = referrer;
  touch.landing_page = `${url.origin}${url.pathname}${url.search}`.slice(0, 500);
  touch.ts = new Date().toISOString();

  write(existing?.first ? { first: existing.first, last: touch } : { first: touch, last: touch });
}

export default function LeadAttribution() {
  useEffect(() => {
    try {
      capture();
    } catch {
      /* attribution is best-effort and must never break a page */
    }
  }, []);
  return null;
}
