const { path: PROJECT_ROOT } = require('app-root-path')
const { join, resolve } = require('path')

exports.BUILD_DIRECTORY = join(PROJECT_ROOT, './build')
exports.SOURCE_DIRECTORY = join(PROJECT_ROOT, './src')

exports.ASSETS = resolve(PROJECT_ROOT, './src/assets')
exports.COMPONENTS = resolve(PROJECT_ROOT, './src/blocks/components')
exports.FEATURES = resolve(PROJECT_ROOT, './src/blocks/features')
exports.LAYOUTS = resolve(PROJECT_ROOT, './src/blocks/layouts')
exports.COMMON = resolve(PROJECT_ROOT, './src/common')
exports.DATA = resolve(PROJECT_ROOT, './src/data')
exports.PAGES = resolve(PROJECT_ROOT, './src/pages')
exports.TYPES = resolve(PROJECT_ROOT, './src/types')
