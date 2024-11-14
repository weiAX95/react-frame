const { resolve, join } = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // entry: {
  //   main: resolve(__dirname, '../src/index'),
  // },
  output: {
    publicPath: '/',
    path: join(__dirname, '../dist'),
    filename: 'scripts/[name].[contenthash:5].bundle.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  performance: {
    hints: 'warning', // "error" | "warning" | "none"
    maxEntrypointSize: 512000, // 增加入口文件大小限制到 500KB
    maxAssetSize: 512000, // 增加单个资源大小限制到 500KB
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true, // 开启多线程压缩
      }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index-prod.html'),
    }),
  ],
};
