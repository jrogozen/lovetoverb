import path from 'path'
import webpack from 'webpack'

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'app', 'client', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    }) 
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.scss']
  },
  node: {
    net: "empty",
    tls: "empty",
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname)
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.scss$/,
      //   loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      //   include: path.join(__dirname)
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/, 
        loader: 'url', 
        query: {limit: 10240} 
      }
    ]
  }
}