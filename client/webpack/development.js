const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const config = require('./config/webpack.config')()

const compiler = webpack(config)
const options = { ...config.devServer, open: true }

const server = new DevServer(options, compiler)

async function run() {
  await server.start()
}

run()
