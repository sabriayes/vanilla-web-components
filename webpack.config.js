const path = require('path');
const glob = require('glob');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const entries = glob.sync('./src/components/**.js').reduce(
    function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },
    {}
);

const copyPaths = [
    {
        source: 'dist',
        destination: 'demos/assets/js/'
    }
];

module.exports = {
    watch: true,
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
    },
    devServer: {
        static: './demos/',
        port: 3000,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: { copy: copyPaths }
            }
        })
    ]
};
