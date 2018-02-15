import HTMLwebpackPlugin from 'html-webpack-plugin'
import combineLoaders from 'webpack-combine-loaders'
import path from 'path'

export default {
  entry: path.join(__dirname, '/src/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: combineLoaders([{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }])
      }
    ]
  },
  output: {
    filename: 'malformed.js',
    path: path.join(__dirname, '/build')
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: path.join(__dirname, '/public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
