var path = require('path');
var webpack = require('webpack');
const pkg = require('../package')
const camel = require('./camel')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: `${pkg.name}.min.js`,
        library: `${camel(pkg.name)}`,
        libraryTarget: 'umd',
        umdNamedDefine: true

    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        },
          {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url?limit=8192'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'vue-html'
        }]
    },
    vue: {
      loaders: {
        css: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap',
          {
            publicPath: '/css'
          }
        ),
        less: ExtractTextPlugin.extract(
          'vue-style-loader',
          'css-loader!less-loader',
          {
            publicPath: '/css'
          }
        ),
        js: 'babel'
      }
    },
  
    plugins: [
      new ExtractTextPlugin('css/[name].css', {allChunks: true, resolve: ['modules']}),             // 提取CSS

      new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
}
