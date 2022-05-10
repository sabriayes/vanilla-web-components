const path = require('path');
const glob = require('glob');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const WebpackBar = require('webpackbar');

const DEV_MODE = 'development';
const isMode = (argv, mode) => (argv?.mode || DEV_MODE) === mode;

const entries = glob
	.sync('./src/components/**/**.js')
	.reduce(function (obj, el) {
		obj[path.parse(el).name] = el;
		return obj;
	}, {});

const copyPaths = [
	{
		source: 'dist/**.js',
		destination: 'demos/assets/js/',
	},
];

module.exports = (env, argv) => ({
	watch: isMode(argv, DEV_MODE),
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
	devServer: {
		static: './demos/',
		port: 3000,
		hot: isMode(argv, DEV_MODE),
		liveReload: isMode(argv, DEV_MODE),
		watchFiles: ['src/**/*.js', 'src/**/*.html', 'src/**/*.scss'],
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
							sourceMap: isMode(argv, DEV_MODE),
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isMode(argv, DEV_MODE),
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isMode(argv, DEV_MODE),
						},
					},
				],
			},
		],
	},
	plugins: [
		new WebpackBar(),
		new FileManagerPlugin({
			events: {
				onEnd: { copy: copyPaths },
			},
		}),
	],
	...(isMode(argv, DEV_MODE) ? { devtool: 'eval-source-map' } : {}),
});
