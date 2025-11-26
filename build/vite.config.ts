import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';

let resolve = (dir: string) => path.join(process.cwd(), dir);

export default defineConfig({
    root: 'src',
    publicDir: resolve('public'),
    plugins: [
        react(),
        // 移除生产环境中的 console 语句
        removeConsole({
            // exclude: ['error', 'warn'] // 保留 error 和 warn 信息，仅移除 log 等其他 console 语句
        })
    ],
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
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9200',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            },
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'Sentry']
    }
});
