import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
let resolve = (dir: string) => path.join(process.cwd(), dir);

export default defineConfig({
    root: 'src',
    publicDir: resolve('public'),
    plugins: [react()],
    resolve: {
        alias: {
        '@': resolve('src'),
        'static': resolve('static'),
        'assets': resolve('assets')
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                // 如果有全局的 Less 变量或混合，可以在这里导入
                // additionalData: `@import "@/styles/variables.less";`
            }
        }
    },
    build: {
        sourcemap: true,
        target: 'esnext',
        outDir: resolve('dist'),
        emptyOutDir: true,
        rollupOptions: {
        input: resolve('src/index.html'), // 使用根目录的index.html
        output: {
            manualChunks: {
                react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
                    ui: ['antd'],
                    three: ['three'],
                    charts: ['echarts'],
                    vendors: ['axios', 'zustand', 'protobufjs']
                }
            }
        }
    },
    worker: {
        format: 'es'
    },
    server: {
        port: 8080,
        open: true,
        host: true
    },
    optimizeDeps: {
        include: ['react', 'react-dom']
    }
});
