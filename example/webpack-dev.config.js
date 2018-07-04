const path = require('path');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

console.log(srcPath);

const config = {
  entry: path.join(srcPath, 'index.js'),
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
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [
          'react-hot-loader/webpack',
          'babel?presets[]=react,presets[]=es2015,plugins[]=babel-plugin-transform-class-properties'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}

module.exports = config;
