const path = require("path");
const buildCfg = require("./webpack.build.conf");
const devCfg = require("./webpack.dev.conf");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let resolve = (...params) => {
    return path.resolve(...params);
};
module.exports = (env) => {
    const isDev = env.development;
    const baseCfg = {
        entry: {
            app: ["babel-polyfill", resolve(__dirname, "..", "./src/main.js")]
        },
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
                test:/\.js/, // 匹配js 使用babel-loader 进行转义
                use:{
                    loader:'babel-loader', // 默认回调用@babel/core
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },{
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
