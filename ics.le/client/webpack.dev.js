const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './deploy/local',
		port: 9090
	},
	output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, '../deploy/local')
    },
    plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
     	template: 'client/src/index.html'
     }),
     new VueLoaderPlugin()
   ]
});
