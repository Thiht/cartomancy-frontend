import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const production = process.env.NODE_ENV === 'production'

const projectRoot = __dirname

export default {
  devtool: 'source-map',
  devServer: {
    open: true,
    contentBase: path.join(projectRoot, 'dist'),
    historyApiFallback: true
  },
  context: projectRoot,
  entry: path.join(projectRoot, 'src/index.jsx'),
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css'
        )
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /.ttf$|.eot$|.woff2?$|\.svg$/,
        loader: 'file',
        query: {
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /.png$|.jpe?g$|.ico?$/,
        loader: 'file',
        query: {
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      disable: !production
    }),
    new HtmlWebpackPlugin({
      title: 'Cartomancy',
      template: path.join(projectRoot, 'src/index.ejs'),
      hash: true,
      minify: production && {
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ].concat(
    production ? [
      // Production-only plugins
      new CleanWebpackPlugin(['dist'], {
        verbose: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ] : [
      // Development-only plugins
    ]
  ),
  eslint: {
    configFile: path.join(projectRoot, '.eslintrc')
  }
}
