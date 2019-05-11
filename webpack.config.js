const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const DESTINATION = path.resolve(__dirname, 'build')

module.exports = {
  entry: ['./src/main.ts'],
  output: {
    filename: '[name].js',
    path: DESTINATION
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.js'],
    modules: ['./src', 'node_modules']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html' },
      { from: './src/index.css' },
      { from: './roms/*' }
    ])
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build')
  }
}
