import path from 'path';

import { defineConfig, type PluginOption } from 'vite';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import progress from 'vite-plugin-progress';

import removeConsole from 'vite-plugin-remove-console';
import topLevelAwait from 'vite-plugin-top-level-await';
import viteJdistsPlugin from 'vite-plugin-jdists';

let resolve = (dir: string) => path.join(process.cwd(), dir);

export default defineConfig(({mode}) => {

    return {
        root: 'src',
        publicDir: resolve('public'),
        plugins: [
            react(),
            progress(),
            visualizer({
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
            removeConsole({
                // exclude: ['error', 'warn'] // 保留 error 和 warn 信息，仅移除 log 等其他 console 语句
            }),
            topLevelAwait({
                promiseExportName: '__tla',
                promiseImportName: i => `__tla_${i}`
            }),
            viteJdistsPlugin({
                include: ['**/*.tsx', '**/*.ts'], // 修正路径模式
                exclude: ['node_modules/**', 'dist/**'],
                remove: mode === 'development' ? ['prod'] : ['dev'],
                trigger: ['release']
            }) as PluginOption,
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
                    manualChunks: (moduleId: string, meta: { getModuleInfo: (moduleId: string) => ModuleInfo | null; }) => {
                        if (moduleId.includes('react') ||
                            moduleId.includes('react-dom') ||
                            moduleId.includes('react-router') ||
                            moduleId.includes('react-router-dom')) {
                            return 'react';
                        }
                        if (moduleId.includes('antd')) {
                            return 'ui';
                        }
                        if (moduleId.includes('three')) {
                            return 'three';
                        }
                        if (moduleId.includes('echarts')) {
                            return 'charts';
                        }
                        if (moduleId.includes('axios') ||
                            moduleId.includes('zustand') ||
                            moduleId.includes('protobufjs')) {
                            return 'vendors';
                        }
                        return undefined;
                    }
                }
            },
            minify: 'terser',
        },
        worker: {
            format: 'es'
        },
        define: {
            'global': 'globalThis', // 将 global 指向 globalThis
        },
        server: {
            port: 8080,
            open: true,
            host: true,
            proxy: {
                '/apis': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '/api')
                },
            }
        },
        optimizeDeps: {
            include: ['react', 'react-dom', 'three', 'echarts'],
            force: true
        }
    }
});

