// html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                  // `.swcrc` can be used to configure swc
                  loader: "swc-loader"
                }
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'postcss-loader'
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })       
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: 3000,
          hot: true,
          historyApiFallback: true,
    }
};