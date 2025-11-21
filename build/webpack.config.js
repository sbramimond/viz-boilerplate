let path = require('path');

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

let resolve = dir => path.join(process.cwd(), dir);

module.exports = {
    mode: 'development',
    entry: '/src/index.tsx',
    output: {
        filename: 'bundle.js',
        globalObject: 'this',
        umdNamedDefine: true,
        publicPath: '/'
    },
    node: { global: true },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

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
                        presets: ['@babel/preset-env', '@babel/preset-react']
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
            inject: true
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
        hot: true,
        compress: false,
        liveReload: true,
        historyApiFallback: true
    },
    // stats: 'verbose',
};
