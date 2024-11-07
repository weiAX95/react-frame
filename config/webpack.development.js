const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index-dev.html',
      // favicon: '../public/favicon.ico',
    }),
  ],
};
