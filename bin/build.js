const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = require('../webpack.config.js');

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new CleanWebpackPlugin(['www'], {
    root: `${__dirname}/`,
    dry: false
  })
);

module.exports = webpackConfig;
