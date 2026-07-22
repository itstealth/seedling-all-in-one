# Package manager

This project uses **pnpm** (see `packageManager` in `package.json`). Install
and add dependencies with `pnpm`, never `npm` or `yarn` — a stray
`package-lock.json` alongside `pnpm-lock.yaml` makes Vercel's build fail
with `ERR_PNPM_OUTDATED_LOCKFILE`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
