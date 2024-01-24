import { resolve } from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'ra-auth-ui',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {}), 'react/jsx-runtime'],
        },
    },
})
