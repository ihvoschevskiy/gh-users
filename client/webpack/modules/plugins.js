const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

const devPlugins = [
  new HtmlWebpackPlugin({
    favicon: './src/assets/images/favicon.ico',
    template: './src/common/views/index.html',
    excludeChunks: [],
  }),
  new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash].css',
  }),
  new StyleLintPlugin({
    files: 'src/{**/*,*}.css',
  }),
  new ESLintPlugin({
    files: 'src/{**/*,*}.{tsx,ts}',
  }),
  new Dotenv(),
]

const prodPlugins = [
  ...devPlugins,
  new PreloadWebpackPlugin({
    rel: 'preload',
    include: 'allAssets',
    fileBlacklist: [/\.(js|png|jpe?g|svg|ico|webp|css)/],
    as(entry) {
      return /\.(woff2|woff?)$/.test(entry) ? 'font' : 'script'
    },
  }),
  new ImageMinimizerPlugin({
    minimizer: [
      {
        implementation: ImageMinimizerPlugin.sharpMinify,
        filter: (source, sourcePath) => !/\.(svg)$/i.test(sourcePath),
        options: {
          encodeOptions: {
            jpeg: {
              quality: 90,
            },
            webp: {
              quality: 90,
            },
            png: {
              quality: 90,
            },
          },
        },
      },
      {
        implementation: ImageMinimizerPlugin.svgoMinify,
        options: {
          encodeOptions: {
            multipass: true,
            plugins: ['preset-default'],
          },
        },
      },
    ],
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    openAnalyzer: true,
    generateStatsFile: true,
  }),
  new WebpackBar({}),
]

module.exports = { devPlugins, prodPlugins }
