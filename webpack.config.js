var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname+"/public/",
        filename: "bundle.js"
    },
     module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['react','es2015', "stage-0"]
            }
          },
          {test: /\.jsx$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }},

          { test: /\.json$/, loader: 'json' },
        ]
     },

     plugins: [
        new WebpackBuildNotifierPlugin({
          title: "My Project Webpack Build",
          // logo: path.resolve("./img/favicon.png"),
          // suppressSuccess: true,
          sound: "Tink"
        }),
    ],
};