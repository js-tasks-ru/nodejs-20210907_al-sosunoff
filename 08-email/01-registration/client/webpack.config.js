/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const fileName = (ext) => `[name].${ext}`;

const CONFIGS = {
  default: {
    mode: 'development',

    context: path.resolve(__dirname, `./src`),

    devtool: 'eval-source-map',

    entry: {
      index: ['./index.tsx'],
    },

    output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, '../public'),
      publicPath: '/',
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json',
              },
            },
          ],
        },
      ],
    },
  },
};

const config = CONFIGS[process.env.CONFIG] || CONFIGS.default;

module.exports = {
  ...config,
};
