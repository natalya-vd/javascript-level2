const path = require('path');

module.exports = {
  watch: true,

  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  }
};