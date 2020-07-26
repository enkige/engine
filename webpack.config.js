const path = require("path");

const scriptLibraryConfig = {
  mode: 'development',
  entry: "./src/index.js",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "enki-engine.script.js",
    library: 'EnkiEngine',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}

const NodeConfig = {
  mode: 'development',
  entry: "./src/index.js",
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "enki-engine.node.js",
    library: 'EnkiEngine',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

}

module.exports = [scriptLibraryConfig, NodeConfig];
