var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");


module.exports = {
    entry: ['./style.scss'],
    output: {
        path: path.join(__dirname, "../dist/"),
        filename: "[name].bundle.js"
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        port: 9000
    },
    module: {
        rules: [{
            test: /\.(css|sass|scss)$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'DatePicker',
            myPageHeader: 'DatePicker',
            template: './index.html',
            path: path.join(__dirname, "../dist/"),
            filename: 'index.html'
        })
    ],
};