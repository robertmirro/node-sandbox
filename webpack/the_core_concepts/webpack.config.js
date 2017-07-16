const path = require('path');
const ExamplePlugin = require('./ExamplePlugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: { rules: [{
        test: /\.js$/,
        use: [{
            loader: 'babel-loader',
            options: { presets: ['stage-0', 'latest', 'react'] }
        }]
    }, {
        test: /\.jpe?g$/,
        use: 'file-loader'
    }] },
    plugins: [
        new ExamplePlugin()
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
