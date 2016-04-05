/* eslint-disable */

var extractTextPlugin = require('extract-text-webpack-plugin')
var path              = require('path')
var webpack           = require('webpack')

var assign = require('./assign')
var common = require('./common')



module.exports = assign(common, {
  module: {
    loaders: [
      {
        test: /\.sass$/,
        include: /styles/,
        loader: extractTextPlugin.extract([
          'css?minimize',
          'postcss',
          'resolve-url',
          'sass?sourceMap&indentedSyntax',
        ]),
      },
      {
        test: /\.scss$/,
        include: /styles/,
        loader: extractTextPlugin.extract([
          'css?minimize',
          'postcss',
          'resolve-url',
          'sass?sourceMap',
        ]),
      },
    ],
  },
  plugins: [
    new extractTextPlugin('[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
})