/**
 * No-op stand-in for the `server-only` package under vitest.
 *
 * `server-only` deliberately throws when resolved through a client condition,
 * which is exactly what the jsdom test environment does. The import guard is
 * enforced by the Next bundler at build time; stubbing it here lets the
 * server-side modules be unit-tested directly.
 */
export {};
