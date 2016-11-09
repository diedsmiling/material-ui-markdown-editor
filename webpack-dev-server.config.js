const path = require('path')

const srcPath = path.join(__dirname, 'src', 'example')
const buildPath = path.join(__dirname, 'example')

const config = {
  entry: path.join(srcPath, 'example.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'example',
    devtool: 'eval',
    hot: false,
    inline: true,
    port: 3000,
    outputPath: buildPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}

module.exports = config
