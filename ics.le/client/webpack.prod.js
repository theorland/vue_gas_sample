const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

let  html_plugin = new HtmlWebpackPlugin({
   template: 'client/src/index.html',
 inlineSource: '.(js|css)$'
});
module.exports = merge(common, {
	mode: 'production',
  output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, '../deploy/gas')
    },
    plugins: [
     new VueLoaderPlugin(),
     html_plugin,
     new HtmlWebpackInlineSourcePlugin()
   ]
});
