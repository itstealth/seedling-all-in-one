// Supervise one production Next instance. Never terminate a process found on a port.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

async function main() {
  const port = Number(process.argv[2]);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Usage: node scripts/run-next.mjs <port>');
  }
  const root = fileURLToPath(new URL('..', import.meta.url));
  process.chdir(root);
  process.env.NODE_ENV = 'production';
  const buildDir = process.env.NEXT_BUILD_DIR || '.next';
  if (!existsSync(path.resolve(root, buildDir, 'BUILD_ID'))) {
    throw new Error(`No production build in ${buildDir}. Build with the same NEXT_BUILD_DIR before starting.`);
  }
  const cli = createRequire(import.meta.url).resolve('next/dist/bin/next');
  let child;
  let stopping = false;
  const stop = () => {
    stopping = true;
    child?.kill('SIGTERM');
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  let failures = 0;
  while (!stopping) {
    // A duplicate launcher exits instead of killing the healthy app.
    await new Promise((resolve, reject) => {
      const probe = net.createServer();
      probe.once('error', reject);
      probe.listen(port, '127.0.0.1', () => probe.close(resolve));
    });
    if (stopping) break;
    const started = Date.now();
    console.log(`[${new Date().toISOString()}] Starting Next: port=${port}, build=${buildDir}`);
    child = spawn(process.execPath, [cli, 'start', '--hostname', '127.0.0.1',
      '--port', String(port), '--keepAliveTimeout', '125000'], { cwd: root, stdio: 'inherit' });
    const result = await new Promise((resolve, reject) => {
      child.once('error', reject);
      child.once('exit', (code, signal) => resolve({ code, signal }));
    });
    child = undefined;
    if (stopping) break;
    failures = Date.now() - started >= 60000 ? 1 : failures + 1;
    const waitMs = Math.min(30000, 1000 * 2 ** Math.min(failures - 1, 5));
    console.error(`[${new Date().toISOString()}] Next exited ${JSON.stringify(result)}; restart in ${waitMs}ms`);
    await delay(waitMs);
  }
}
main().catch((error) => {
  console.error(`[${new Date().toISOString()}] Launcher stopped: ${error.message}`);
  process.exitCode = 1;
});
