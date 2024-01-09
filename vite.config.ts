import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'ra-auth-ui',

            fileName: 'index',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-admin', 'react/jsx-runtime', '@mui/material'],
        },
    },
})
