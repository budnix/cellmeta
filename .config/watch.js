/**
 * Config responsible for building Handsontable `dist/` files with enabled watching mode:
 *  - handsontable.js
 *  - handsontable.css
 */
const path = require('path');
const configFactory = require('./base');

const PACKAGE_FILENAME = 'build';

module.exports.create = function create(envArgs) {
  const config = configFactory.create(envArgs);

  config.forEach(function(c) {
    c.cache = true;
    c.devtool = 'cheap-module-source-map';
    // Exclude all external dependencies from 'base' bundle (handsontable.js and handsontable.css)
    c.module.rules.unshift({
      test: [
         // Disable loading css files from pikaday module
        /pikaday\/css/,
      ],
      loader: path.resolve(__dirname, 'loader/empty-loader.js'),
    });
  });

  return config;
}
