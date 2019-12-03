const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => (
  {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
    name: 'client',
    target: 'web',

    entry: {
      app: './app/public/js/index.js',
    },

    output: {
      path: path.join(__dirname, 'build/public'),
      filename: 'index.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            retainLines: true,
          },
        },
        {
          test: /\.scss$/,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: env.production ? false : true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer,
                  cssDeclarationSorter,
                ],
                sourceMap: env.production ? false : true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env.production ? false : true,
              },
            },
          ]
        },
      ],
    },

    watchOptions: {
      ignored: ['node_modules', 'build'],
    },

    plugins: [
      new webpack.IgnorePlugin(/^.*\/server.*$/),
      new webpack.IgnorePlugin(/^node-fetch.*$/),
      new CssoWebpackPlugin({ pluginOutputPostfix: 'min' }),
      new ExtractCssChunks(),
    ],
  }
);
