'use strict'
const path = require('path')
const webpack=require('webpack')
const ImageMinPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AddAssetHtmlPlugin=require('add-asset-html-webpack-plugin')
const defaultSettings = require('./src/settings.js')

function resolve(...dir) {
  return path.join(__dirname, ...dir)
}

const name = defaultSettings.title || '后台管理系统'
const isLint = true  //是否开启ESLint  default:true
const isSource=false //是否开启dev source源码（断点调试）default:false
const isProd = process.env.NODE_ENV === 'production'
const cdnUrl = process.env.VUE_APP_CDN_URL || '/'
const publicPath = isProd ? cdnUrl : '/'

module.exports = {
  publicPath,
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: isLint && !isProd,
  devServer: {
    port: 9527,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: (config)=>{
    let extraPlugins=[]
    if (isProd){
      extraPlugins=[
        new ImageMinPlugin({ //图片压缩
          disable: false,
          pngquant: {
            quality: '90'
          }
        }),
        new AddAssetHtmlPlugin({
          filepath:path.resolve(__dirname, './dll/chunk-dll.*.js'),
          outputPath:'js',
          publicPath:`${publicPath}js`
        }), //dll.js添加
        new webpack.DllReferencePlugin({
          manifest:path.resolve(__dirname, './dll/chunk-dll.manifest.json')
        })  //dll 映射关系
      ]
    }
    return {
      name: name,
      devtool:isSource&&'eval-source-map'||'eval',
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, './static'),
            to: 'static',
            ignore: ['.*']
          }
        ]),
        ...extraPlugins
      ],
      resolve: {
        alias: {
          '@': resolve('src'),
          'static': resolve('static'),
          'api': resolve('src/api'),
          'assets': resolve('src/assets'),
          'components': resolve('src/components'),
          'directive': resolve('src/directive'),
          'icons': resolve('src/icons'),
          'layout': resolve('src/layout'),
          'router': resolve('src/router'),
          'sprites': resolve('src/sprites'),
          'store': resolve('src/store'),
          'styles': resolve('src/styles'),
          'utils': resolve('src/utils'),
          'views': resolve('src/views')
        }
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.module.rule('vue').use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
              options.compilerOptions.preserveWhitespace = true
              return options
            })
            .end()
          config.plugin('html').tap(args => {
            args[0].minify.collapseWhitespace=false
            return args
          })
          config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }]).end()
          config.optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
