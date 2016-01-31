'use strict';

module.exports = {
  entry: './source/client/js/index.js',

  output: {
    filename: 'bundle.js',
    path: './public'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
