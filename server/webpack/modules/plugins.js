const WebpackBar = require('webpackbar')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = [
  new ESLintPlugin({
    files: 'src/{**/*,*}.{tsx,ts}',
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    openAnalyzer: true,
    generateStatsFile: true,
  }),
  new WebpackBar({}),
]
