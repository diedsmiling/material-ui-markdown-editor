module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    debug: true,
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]'
        ]
      }
    ]
  }
}
