//---------------------------------------------------------------- JS

const jsRules = [
  {
    test: /\.js$/,
    use: { loader: 'babel-loader' },
    exclude: /node_modules/,
  },
]

//---------------------------------------------------------------- TS

const tsRules = [
  {
    test: /\.ts$/,
    use: { loader: 'ts-loader' },
    exclude: /node_modules/,
  },
]

module.exports = [...jsRules, ...tsRules]
