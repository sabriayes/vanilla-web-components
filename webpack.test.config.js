const path = require('path');
const glob = require('glob');
const WebpackBar = require('webpackbar');

const entries = glob
	.sync('./src/components/**/**.js')
	.reduce(function (obj, el) {
		obj[path.parse(el).name] = el;
		return obj;
	}, {});

module.exports = (_env, _argv) => ({
	watch: false,
	entry: entries,
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].min.js',
	},
	resolve: {
		alias: {
			partials: path.resolve(__dirname, 'src/partials'),
			components: path.resolve(__dirname, 'src/components'),
		},
	},
	devServer: {
		static: './dist/',
		port: 3003,
		hot: false,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader',
			},
			{
				test: /\.html$/i,
				use: ['html-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [new WebpackBar()],
});
