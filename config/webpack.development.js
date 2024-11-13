const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

const notifier = require('node-notifier');

const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3001,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name][ext]',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index-dev.html',
      // favicon: '../public/favicon.ico',
    }),
    new FriendlyErrorsWebpackPlugin({
      // 编译成功时的消息
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3001'],
        notes: ['Some additional notes to be displayed upon successful compilation'],
      },
      // 编译错误时的配置
      onErrors: function (severity, errors) {
        // 您可以监听错误并显示通知
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
        });
      },
      // 是否每次都清除控制台
      clearConsole: true,
      // 自定义错误格式化
      formatters: [
        {
          type: 'error',
          formatter: function (errors) {
            return errors.map(error => {
              return `${error.type} ${error.file}\n${error.message}`;
            });
          },
        },
      ],
      // 自定义错误转换
      transformers: [
        {
          transform: function (error) {
            const newError = Object.assign({}, error);
            newError.message = `${error.message} (${error.file})`;
            return newError;
          },
        },
      ],
    }),
    // new bundleAnalyzerPlugin(),
  ],
  // 设置统计信息展示
  stats: {
    // 关闭 webpack 的内置错误处理
    errors: false,
    warnings: false,
    modules: false,
    chunks: false,
  },
};
