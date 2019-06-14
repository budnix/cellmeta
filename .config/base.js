const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports.create = function create(envArgs) {
  const config = {
    devtool: false,
    performance: {
      maxEntrypointSize: 2000000,
      maxAssetSize: 2000000,
    },
    entry: {
      'tests-browser': './src/tests-browser.js',
      'tests-node': './src/tests-node.js',
      //
      'utils': './src/utils.js',
      'prototype-class': './src/modules/prototype-class.js',
      'prototype-define-properties': './src/modules/prototype-define-properties.js',
      'prototype-map-holder': './src/modules/prototype-map-holder.js',
      'prototype-wrapper': './src/modules/prototype-wrapper.js',
      'prototype-proxy': './src/modules/prototype-proxy.js',
      'prototype': './src/modules/prototype.js',
    },
    output: {
      globalObject: `typeof self !== 'undefined' ? self : this`,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
      alias: {},
    },
    mode: 'none',
    module: {
      noParse: [
        /benchmark/,
      ],
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            /node_modules/,
          ],
          options: {
            cacheDirectory: false, // Disable cache. Necessary for injected variables into source code via hot.config.js
          },
        },
      ]
    },
    plugins: [
      new ProgressBarPlugin({
        format: '  build [:bar] \u001b[32m:percent\u001b[0m (:elapsed seconds)',
        summary: false,
      }),
      // This helps ensure the builds are consistent if source code hasn't changed
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        '__ENV_ARGS__': JSON.stringify(envArgs),
      }),
    ],
    node: {
      global: false,
      process: false,
      Buffer: false,
      setImmediate: false,
    },
  };

  return [config];
}
