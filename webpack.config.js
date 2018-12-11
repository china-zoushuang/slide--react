'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var ENV = process.env.NODE_ENV || 'development'
var isDev = ENV === 'development'
var isPro = ENV === 'production'
var port = 3004
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: resolve('src/entry/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: isPro ? 'static/js/[name].[chunkhash:8].js' : 'static/js/[name].js',
    chunkFilename: isPro ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          failOnWarning: false,
          failOnError: false,
          fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'modules': false,
              'targets': {
                'browsers': ['> 1%', 'last 10 versions', 'not ie <= 8']
              }
            }],
            'stage-2',
            'react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true&&importLoaders=1', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isPro ? 'static/media/[name].[hash:8].[ext]' : 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|eot|svg)(\??.*)$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: isPro ? 'static/media/[name].[hash:8].[ext]' : 'static/media/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/entry/index.html'),
      chunks: ['app'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: !!isPro,
        minifyCSS: !!isPro,
        minifyURLs: !!isPro
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: isPro ? 'static/css/[name].[contenthash:8].css' : 'static/css/[name].css'
    }),
    new webpack.DefinePlugin({ // 你可以理解为，通过配置了 DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin({ // 根据模块的相对路径生成一个长度只有四位的字符串作为模块的 id
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    })
  ],
  devtool: isPro ? '' : 'source-map',
  devServer: {
    contentBase: resolve('src'),
    host: '0.0.0.0',
    port: port,
    compress: true, // Enable gzip compression for everything served
    hot: true,
    inline: true
  }
}
if (isDev) {
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin() // 热加载插件
  )
} else if (isPro) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    })
  )
}
