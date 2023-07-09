const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//---------------------------------------------------------------- JS

const jsRules = [
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
]

//---------------------------------------------------------------- TS

const tsRules = [
  {
    test: /\.(tsx?)$/,
    use: 'ts-loader',
    exclude: [/node_modules/, /worker\.ts$/],
  },
]

//--------------------------------------------------------------- CSS

const cssRules = [
  {
    test: /\.(css)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: '../' },
      },
      { loader: 'css-loader' },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              'postcss-import',
              'postcss-nested',
              require('postcss-custom-properties')({ preserve: false }),
              'postcss-media-minmax',
              'postcss-custom-media',
              'postcss-calc',
              'postcss-hexrgba',
            ],
          },
        },
      },
    ],
  },
]

//------------------------------------------------------------ IMAGES

const imageRules = [
  {
    test: /\.(jpe?g|png)$/,
    type: 'asset/resource',
    generator: {
      filename: 'images/[contenthash][ext]',
    },
  },
  {
    test: /\.webp$/,
    type: 'asset',
    generator: {
      filename: 'images/[contenthash][ext]',
    },
  },
  {
    test: /\.svg$/,
    type: 'asset/resource',
    generator: {
      filename: 'images/[contenthash][ext]',
    },
  },
]

//------------------------------------------------------------- FONTS

const fontsRules = [
  {
    test: /\.(woff2?)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]',
    },
  },
]

module.exports = [...jsRules, ...tsRules, ...cssRules, ...imageRules, ...fontsRules]
