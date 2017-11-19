import HTMLwebpackPlugin from 'html-webpack-plugin'

let HTMLwebpackConfig = new HTMLwebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
})

export default {
  entry: __dirname + '/src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'malformed.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLwebpackConfig]
}
