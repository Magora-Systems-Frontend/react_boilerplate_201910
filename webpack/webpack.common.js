const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { NODE_ENV, API_DOMAIN, API_VERSION, isPROD, isDEV, paths } = require('../bin');


module.exports = {
  entry: {
    app: paths.appIndexJs
  },
  output: {
    filename: `[name]-[hash]${isPROD ? '.min' : ''}.js`,
    path: paths.appBuild
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isPROD: JSON.stringify(isPROD),
        isDEV: JSON.stringify(isDEV),
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_DOMAIN: JSON.stringify(API_DOMAIN),
        API_VERSION: JSON.stringify(API_VERSION)
      },
    }),
    new ProgressBarPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // Set only one chunk for current App iteration
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve('src/components/AntIcons'),
      'assets': paths.resolveApp('src/assets/'),
      'constants': paths.resolveApp('src/constants/'),
      'pages': paths.resolveApp('src/pages/'),
      'components': paths.resolveApp('src/components/'),
      'routes': paths.resolveApp('src/routes/'),
      'config': paths.resolveApp('src/config/'),
      'common': paths.resolveApp('src/common/'),
      'styles': paths.resolveApp('src/styles/'),
    },
  }
};
