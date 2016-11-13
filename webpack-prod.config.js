const path = require('path')

const srcPath = path.join(__dirname, 'src')
const buildPath = path.join(__dirname, 'dist')
const filename = 'MarkdownEditor.js'
const config = {
  entry: path.join(srcPath, filename),
  output: {
    path: buildPath,
    filename
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
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}

module.exports = config
