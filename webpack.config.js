const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    entry: './src/br-dom.js',
    output: {
        filename: 'br-dom.js',
        path: path.resolve(__dirname, 'dist'),
    },
};