const { merge } = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const common = require('./webpack.common.js');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        port: 8080, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory), //tells webpack to serve from the app directory
        hot: false,
        open: true,
        devMiddleware: {
            publicPath: "/",
        },
        // https: true // enable when HTTPS is needed (like in WebXR)
    },
});

