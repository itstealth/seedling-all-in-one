// instrumentation.ts
//
// Runs once when the server starts. Starts the CMS outbox's retry timer
// (lib/cms-leads.ts) so submissions queued before a restart, or while the CMS
// was unreachable, are delivered even if no new form is submitted. Does not
// wait for delivery: startup is never slowed by the CMS.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { flushOutbox } = await import('./lib/cms-leads');
    setTimeout(() => void flushOutbox(), 30_000).unref?.();
  }
}
