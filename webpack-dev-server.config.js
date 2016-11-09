const path = require('path')

const srcPath = path.join(__dirname, 'src', 'example')
const buildPath = path.join(__dirname, 'example')

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(srcPath, 'example.js')
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'example',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    outputPath: buildPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [
          'react-hot-loader/webpack',
          'babel?presets[]=react,presets[]=es2015'
        ]
      }
    ]
  }
}

module.exports = config
