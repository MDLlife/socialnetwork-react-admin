module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'index.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, exclude: /node_modules/, loaders:[ "style", "css"] }

        ],
    },
    resolve: {
        alias: {
            'the-react':  path.join(__dirname, 'node_modules/react')
        },
    },
};
