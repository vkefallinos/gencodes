const path = require('path');
const webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({filename: 'public/assets.json'})
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./requires.js",
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: [
          /.*?$/,
        ],
        use: {
          loader: require.resolve('./loader'),
        },
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: true,
    inline: true,
  },
  plugins: [
    // assetsPluginInstance,
  //   new HtmlWebpackPlugin({
  //   title: 'Astql',
  //   template: path.resolve(__dirname, './template.ejs'), // template file
  // }),
],

};