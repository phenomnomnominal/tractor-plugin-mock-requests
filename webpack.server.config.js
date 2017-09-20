const webpack = require('webpack');

module.exports = {
    entry: {
        "add-mocking": './src/tractor/server/scripts/add-mocking.js',
        "init": './src/tractor/server/scripts/init.js',
        "shim-fetch": './src/tractor/server/scripts/shim-fetch.js',
        "shim-xhr": './src/tractor/server/scripts/shim-xhr.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/tractor/server/scripts/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', { modules: false }]]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                unsafe: true
            },
            comments: false
        })
    ],
    node: { Buffer: 'mock' }
};
