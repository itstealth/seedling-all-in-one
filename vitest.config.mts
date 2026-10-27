import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      // Tests run under jsdom, where `server-only` resolves to the build that
      // throws on import. The guard matters in the real bundler, not here.
      'server-only': new URL('./test/server-only-stub.ts', import.meta.url)
        .pathname,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
