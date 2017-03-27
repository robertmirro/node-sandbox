const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
    return {
        entry: { app: './src/index.js' },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js'
        },
        module: { rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: [{
                loader: 'babel-loader',
                options: { presets: ['stage-0', 'latest', 'react'] }
            }]
        }] },
        plugins: [new HtmlWebpackPlugin({
            title: 'webpack + es2015',
            template: './src/index.html.ejs',
            hash: true
        })]
    };
};
