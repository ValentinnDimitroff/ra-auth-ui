/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        coverage: {
            provider: 'v8',
            reporter: [['text'], ['lcov', { projectRoot: './src' }]],
        },
        environment: 'jsdom',
        exclude: [...configDefaults.exclude],
        globals: true,
        include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['./src/setupTests.ts'],
    },
})
