const path = require("path");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    productionSourceMap: false,
    publicPath: '/',
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                path.resolve(__dirname, "./src/assets/theme.scss")
            ]
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // @是src的别名
                prependData: `
                @import "@/assets/theme.scss";
                @import "@/style/mixin.scss";
              `
            },
            postcss: { //适配方案，主要针对vant
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 20,
                        propList: ['*'],
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        // selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    },
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
            '/devApi': {
                // 目标 API 地址
                target: 'http://localhost:3000',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                // 如果是https接口，需要配置这个参数
                secure: false,
                pathRewrite: {
                    '^/devApi': ''
                }
            }
        }
    }
};
