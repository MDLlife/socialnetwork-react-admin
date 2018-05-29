var path = require('path');
module.exports = {
    devtool: 'eval',
    entry: path.join(__dirname,'app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, exclude: /node_modules/, loaders:[ "style", "css"] }
        ],
    },
    resolve: {
        alias: {
            'admin-on-rest': path.join(__dirname, '..', 'src'),
            'the-react':  path.join(__dirname, '..', 'node_modules/react')
        },
    },
};
