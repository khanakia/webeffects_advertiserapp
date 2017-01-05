var webpack = require('webpack');
const path = require('path');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    // entry: "./src/main.js",

    entry: {
        js: [
            './src/main.js',
        ],
        vendor: [
            'react', 'react-dom', 'react-router', 'react-redux', 'redux-logger', 'redux-thunk', 'redux-devtools', 'redux-devtools-log-monitor', 'redux-devtools-dock-monitor', 'redux-promise'
        ],
    },

    output: {
        path: __dirname + "/public/",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-0"]
                }
            },
            { test: /\.jsx$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] } },

            { test: /\.json$/, loader: 'json' },
        ]
    },

    resolve: {
      root: path.resolve(__dirname),
      alias: {
        constants: 'src/constants',
        helpers: 'src/helpers',
        actions: 'src/actions',
        containers: 'src/containers',
        components: 'src/components',
        
      },
      extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            // suppressSuccess: true,
            sound: "Tink"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,

            // chunks: ["vendor"],
            filename: 'vendor.bundle.js',
        }),
    ],
};
