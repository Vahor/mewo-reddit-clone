import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
        ],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001/v1',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => {
                    return path.replace(/^\/api/, '');
                },
            },
        },
    },
})
