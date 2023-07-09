const { merge } = require('webpack-merge')
const path = require('path')
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const { BUILD_DIRECTORY } = require('./paths.js')
const rules = require('../modules/rules.js')
const { devPlugins, prodPlugins } = require('../modules/plugins.js')
const devServer = require('../modules/devServer.js')
const alias = require('../modules/alias.js')

const mode = process.env.NODE_ENV

module.exports = () => {
  return merge({
    mode: mode,
    entry: {
      main: './src/index.tsx',
      sw: './src/data/sw/sw.ts',
    },
    output: {
      path: path.resolve(BUILD_DIRECTORY),
      filename: pathData => {
        switch (pathData.chunk.name) {
          case 'sw': {
            return '[name].js'
          }
          default:
            return 'scripts/[name].[contenthash].js'
        }
      },
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: rules,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: alias,
    },
    optimization: {
      runtimeChunk: mode === 'production' ? false : 'single',
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [`...`, new CSSMinimizerWebpackPlugin()],
    },
    plugins: mode === 'production' ? prodPlugins : devPlugins,
    devServer: devServer,
    devtool: mode === 'production' ? 'hidden-source-map' : 'eval-cheap-module-source-map',
  })
}
