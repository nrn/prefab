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
  resolve: {
    alias: {
      config: path.join(__dirname, 'config', (process.env.NODE_ENV || 'development') + '.js')
    }
  },
  devServer: {
    contentBase: './public',
    port: 6789
  }
}

