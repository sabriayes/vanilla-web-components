const path = require('path');
const glob = require('glob');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const entries = glob.sync('./src/components/**/**.js').reduce(
    function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },
    {}
);

const copyPaths = [
    {
        source: 'dist/**.js',
        destination: 'demos/assets/js/',
    }
];

const config = {
    watch: false,
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
    },
    resolve: {
        alias: {
            partials: path.resolve(__dirname, './src/partials'),
        },
    },
    devServer: {
        static: './demos/',
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'sass-to-string',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: { copy: copyPaths },
            },
        }),
    ],
};

module.exports = (env, argv) => {
	config.watch = argv.mode === 'development';
	return config;
};
