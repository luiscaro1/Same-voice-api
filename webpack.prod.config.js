const path = require('path');

const Dotenv = require('dotenv-webpack');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  target: 'node',
  mode: 'production',
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        keepNames: true,
      }),
    ],
  },
  entry: './src/Startup.ts',
  output: {
    filename: 'prod.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: [new Dotenv({ path: path.resolve(__dirname, '.env') })],
};
