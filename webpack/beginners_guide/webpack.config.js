module.exports = {
    entry: ['./someOtherFile.js', './app.js'],
    output: {
        filename: "bundle.js"
    },
    watch: false,
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'

        }],
        loaders: [{
            test: [/\.js$/, /\.es6$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-2']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
}