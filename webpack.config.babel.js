
import HtmlPlugin from 'html-webpack-plugin'
import path from 'path'

export default {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'malformed.js',
    path: path.join(__dirname, '/build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, '/public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
