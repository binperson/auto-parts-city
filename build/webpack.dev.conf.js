var utils = require('./utils')//工具方法
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')//合并配置文件
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//webpack提供操作html的插件

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])//变成了一个数组 ->热加载
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })//独立的css做编译
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',//开发时源码调试用
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),//热加载
    new webpack.NoEmitOnErrorsPlugin(),//编译错误时跳过那段代码
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//css html js
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
