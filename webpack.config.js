var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config')

module.exports = {
  //  context: path.resolve(__dirname, "/"),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: 'build.js'
  },
  module: {
    rules: [

      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            css: 'vue-style-loader!css-loader',
            less: 'vue-style-loader!css-loader!less-loader'
          },
          postLoaders: {
            html: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    port: 9000,
    inline: true,
    historyApiFallback: true,
    noInfo: false,
    overlay: true,
    proxy: {
      "/flood": {
        target: process.env.NODE_ENV === 'production' ?
          config.build.domain : config.dev.domain,
        //  pathRewrite: {"^/flood" : ""},
        changeOrigin: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      arcgisUrl: 'http://localhost:8080/arcgis/3.16/init.js',
      mapServiceUrl: 'http://218.77.42.151:7090/arcgis/rest/services/map/flood/MapServer'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      title: '值班系统',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      arcgisUrl: 'http://10.43.1.1:8017/arcgis/3.23/',
      mapServiceUrl: 'http://10.43.234.54:6080/arcgis/rest/services/map/floodSituation/MapServer'
    })
  ])
}
