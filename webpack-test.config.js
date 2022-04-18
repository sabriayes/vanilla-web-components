const path = require('path');
const glob = require('glob');
const WebpackBar = require('webpackbar');

const entries = glob
	.sync('./src/components/**/**.js')
	.reduce(function (obj, el) {
		obj[path.parse(el).name] = el;
		return obj;
	}, {});

module.exports = (env, argv) => ({
	mode: 'development',
	devtool: 'eval-source-map',
	watch: false,
	entry: entries,
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
