const path = require('path')
const webpack = require('webpack'); //eslint-disable-line

const srcPath = path.join(__dirname, 'src', 'MarkdownEditor')
const buildPath = path.join(__dirname, 'dist')
const filename = 'MarkdownEditor.js'
const config = {
  entry: path.join(srcPath, filename),
  output: {
    path: buildPath,
    filename,
    library: 'materialUiMarkdownEditor',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-addons-transition-group': 'React.addons.TransitionGroup',
    'react-addons-pure-render-mixin': 'React.addons.PureRenderMixin',
    'react-addons-create-fragment': 'React.addons.createFragment',
    'react-addons-update': 'React.addons.update',
    'material-ui': 'MaterialUi'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['babel-plugin-transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
}
module.exports = config
