/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { extendDefaultPlugins } = require('svgo');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template,
  template: path.resolve(environment.paths.source, template)
//   favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico')
}));

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: environment.paths.output
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            //  minimize: true
          }
        }
      }

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json']
    })

  ].concat(htmlPluginEntries),
  target: 'web'
};
