var webpack = require('webpack');
const path = require('path');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var StatsPlugin = require('stats-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
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
        path: __dirname + "/public/bundle/",
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
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
          },
          output: {
            comments: false,
          },
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),

        // new CompressionPlugin({
        //   asset: "[path].gz[query]",
        //   algorithm: "gzip",
        //   test: /\.js$|\.css$|\.html$/,
        //   threshold: 10240,
        //   minRatio: 0
        // }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            // suppressSuccess: true,
            sound: "Tink"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            filename: 'vendor.bundle.js',
        }),
    ],
};
