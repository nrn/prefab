var path = require('path')

module.exports = {
  entry: ['./global.js', './index.js'],
  output: {
    path: __dirname + '/public/build',
    filename: 'bundle.js',
    publicPath: 'http://localhost:6789/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    contentBase: './public',
    port: 6789
  }
}

