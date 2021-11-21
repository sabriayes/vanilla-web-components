const path = require('path');
const glob = require('glob');

const entries = glob.sync('./src/components/**.js').reduce(
    function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },
    {}
);

module.exports = {
    watch: true,
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
    },
    devServer: {
        static: './',
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    }
};
