'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //name: 'client',
  target: 'web',
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'www'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      hash: true,
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-class-properties'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?prefix=images/&name=[path][name].[ext]'
      },
      {
        test: /\.css/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 2 version'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 2 version',
          'sass'
        ]
      },
      /* eslint-disable */
      {
        test: /\.woff(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream"
      },
      { test: /\.eot(\?.*)?$/, loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      {
        test: /\.svg(\?.*)?$/,
        loader: "file-loader?prefix=fonts/&name=[path][name][hash].[ext]&mimetype=image/svg+xml"
      }
      /* eslint-enable */
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'src/sass'), path.resolve(__dirname, 'src/fonts')]
  },
  fileLoader: {
    includePaths: [path.resolve(__dirname, 'src/fonts')]
  },
  urlLoader: {
    includePaths: [path.resolve(__dirname, 'src/fonts')]
  },
  node: {
    fs: 'empty'
  }
};
