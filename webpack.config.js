const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = glob.sync('./src/components/**.js').reduce(
    function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },
    {}
);

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].min.js",
    },
    devServer: {
        static: "./dist",
        port: 3000,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'raw-loader', 
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: /^\n|\s+|\s+$|\s+(?=\s)/g, 
                            replace: ''
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        })
    ]
};
