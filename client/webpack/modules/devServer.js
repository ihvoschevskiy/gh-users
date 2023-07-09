const { BUILD_DIRECTORY } = require('../config/paths')

module.exports = {
  host: 'localhost',
  port: 3000,
  client: {
    overlay: {
      errors: true,
      warnings: false,
      runtimeErrors: true,
    },
  },
  static: { directory: BUILD_DIRECTORY },
  hot: false,
  open: true,
  historyApiFallback: true,
}
