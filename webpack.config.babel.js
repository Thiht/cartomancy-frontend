import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from './config'

const env = process.env.NODE_ENV || 'development'
const production = env === 'production'

const projectRoot = __dirname

export default {
  devtool: production ? 'source-map' : 'eval-source-map',
  devServer: {
    open: true,
    contentBase: path.join(projectRoot, 'dist'),
    historyApiFallback: true
  },
  entry: path.join(projectRoot, 'src/index.jsx'),
  output: {
    path: path.join(projectRoot, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: path.join(projectRoot, '.eslintrc')
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /.ttf$|.eot$|.woff2?$|\.svg$/,
        loader: 'file-loader',
        query: {
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /.png$|.jpe?g$|.ico?$/,
        loader: 'file-loader',
        query: {
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      },
      'SERVER_URL': JSON.stringify(`${config.serverHost}:${config.serverPort}`),
      'LOCAL_STORAGE_KEY': JSON.stringify(config.localStorageKey)
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
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
  )
}
