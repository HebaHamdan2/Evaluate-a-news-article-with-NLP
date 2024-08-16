import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/', 
        libraryTarget: 'var',
        library: 'Client'
    },
    devtool: 'inline-source-map', 
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
                    'style-loader', 
                    'css-loader',   
                    'sass-loader'  
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                type: 'asset/resource' 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css' 
        }),
        new webpack.HotModuleReplacementPlugin() 
    ],
    devServer: {
        port: 8001,
        allowedHosts: 'all',
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8001', 
                changeOrigin: true,
                pathRewrite: { '^/api': '' } 
            }
        ],
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        hot: true
    }
};    
