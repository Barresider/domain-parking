const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.d.ts']
  },
  stats: 'minimal',
  target: 'node',
};
