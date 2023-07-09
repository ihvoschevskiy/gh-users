const nodeExternals = require('webpack-node-externals')
const CONSTANTS = require('./paths')
const rules = require('../modules/rules')
const alias = require('../modules/alias')
const plugins = require('../modules/plugins')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: CONSTANTS.BUILD_DIRECTORY,
    clean: true,
  },
  target: 'node',
  module: {
    rules: rules,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: alias,
  },
  plugins: plugins,
  externalsPresets: { node: true },
  externals: [nodeExternals()],
}
