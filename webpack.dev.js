import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/', // Ensure publicPath is set for correct asset loading
        libraryTarget: 'var',
        library: 'Client'
    },
    devtool: 'inline-source-map', // Source maps for easier debugging
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects styles into the DOM
                    'css-loader',   // Resolves CSS imports
                    'sass-loader'   // Compiles Sass to CSS
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                type: 'asset/resource' // Handles image files
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css' // Extracts CSS into separate files
        }),
        new webpack.HotModuleReplacementPlugin() // Enables HMR
    ],
    devServer: {
        port: 8001,
        allowedHosts: 'all',
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        hot: true
    }
};
