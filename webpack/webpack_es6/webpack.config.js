const path = require('path');

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
        }] }
    };
};
