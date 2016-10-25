'use strict';

require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'client': './server/client-scripts/index.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '/public/js'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
