const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    new_customers: './src/new_customers/index.js',
    warm_customers: './src/warm_customers/index.js',
    speaking_package: './src/speaking_package/index.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/new_customers/main.hbs',
      filename: 'new_customers.html',
      chunks: ['new_customers'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/warm_customers/main.hbs',
      filename: 'warm_customers.html',
      chunks: ['warm_customers'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/speaking_package/main.hbs',
      filename: 'speaking_package.html',
      chunks: ['speaking_package'],
    })],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
  },
}