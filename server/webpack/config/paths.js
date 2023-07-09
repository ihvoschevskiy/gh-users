const { path: PROJECT_ROOT } = require('app-root-path')
const { join, resolve } = require('path')

exports.BUILD_DIRECTORY = join(PROJECT_ROOT, './build')
exports.SOURCE_DIRECTORY = join(PROJECT_ROOT, './src')

exports.DATA = resolve(PROJECT_ROOT, './src/data')
exports.ENTITIES = resolve(PROJECT_ROOT, './src/entities')
exports.ERRORS = resolve(PROJECT_ROOT, './src/errors')
exports.HELPERS = resolve(PROJECT_ROOT, './src/helpers')
exports.MIDDLEWARE = resolve(PROJECT_ROOT, './src/middleware')
exports.SERVICES = resolve(PROJECT_ROOT, './src/services')
