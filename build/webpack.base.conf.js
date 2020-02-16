const path = require("path");
const buildCfg = require("./webpack.build.conf");
const devCfg = require("./webpack.dev.conf");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let resolve = (...params) => {
    return path.resolve(...params);
};
module.exports = (env) => {
    const isDev = env.development;
    const baseCfg = {
        entry: resolve(__dirname, "..", "./src/main.js"),//唯一入口文件
        output: {//输出目录
            path: resolve(__dirname, "..","./"),
            filename: 'bundle.js'
        },
        plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin({
            template: resolve(__dirname, "..", "./src/index.html"),
            hash: !isDev,
            minify: isDev ? false: {
                removeAttributeQuotes: true,
                collapseWhiteSpace: true
            }
        })],
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }],

        }
    };
    return merge(baseCfg, isDev ? devCfg : buildCfg);
}
