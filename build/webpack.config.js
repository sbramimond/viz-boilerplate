let path = require('path');

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

let resolve = dir => path.join(process.cwd(), dir);

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    experiments: {
        outputModule: true, // Enable ECMAScript Module output
    },
    output: {
        filename: '[name].[contenthash:5].js',
        chunkFilename: '[id].[contenthash:5].chunk.js',
        globalObject: 'this',
        umdNamedDefine: true,
        publicPath: '/',
        module: true,
    },
    node: { global: true },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 100000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '+',
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: 'react',
                    priority: 20,
                    reuseExistingChunk: true,
                },
                ui: {
                    test: /[\\/]node_modules[\\/](antd)[\\/]/,
                    name: 'ui',
                    priority: 15,
                    reuseExistingChunk: true,
                },
                three: {
                    test: /[\\/]node_modules[\\/](three)[\\/]/,
                    name: 'three',
                    priority: 15,
                    reuseExistingChunk: true,
                },
                charts: {
                    test: /[\\/]node_modules[\\/](echarts)[\\/]/,
                    name: 'charts',
                    priority: 15,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 10,
                    reuseExistingChunk: true,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true,
                }
            }
        }
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            static: resolve('/static'),
            assets: resolve('/assets'),
            '@': resolve('src')
        },
        modules: [resolve('/src'), 'node_modules'],
        mainFiles: ['main', 'index'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /.worker.ts$/, type: 'javascript/auto' },
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                    transpileOnly: true
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: []
                    }
                }
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            fileName: 'index.html',
            inject: true,
            scriptLoading: 'module'
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.DefinePlugin({
            global: function() {
                return this;
            }
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        // client: {
        //     progress: true,
        //     logging: 'error',
        //     overlay: true,
        // },
        hot: true,
        compress: true,
        liveReload: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true
        },
        watchFiles: ['./src/worker/*.ts'],
    },
    // stats: 'verbose',
};
