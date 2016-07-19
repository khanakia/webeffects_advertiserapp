module.exports = {
    entry: "./index.js",
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
        ]
     }
};