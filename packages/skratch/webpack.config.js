const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, '_bundles'),
}

module.exports = {
  mode: "development",
  entry: {
    skratch: [PATHS.entryPoint],
    'skratch.min': [PATHS.entryPoint],
  },
  // We target a UMD and name it skratch. When including the bundle in the browser
  // it will be accessible at `window.skratch`
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'skratch',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        // we don't want any declaration file in the bundles
        // folder since it wouldn't be of any use ans the source
        // map already include everything for debugging
        declaration: false,
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ]
};
