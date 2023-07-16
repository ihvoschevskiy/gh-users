import * as dotenv from 'dotenv'
dotenv.config()

import { logger } from '@services/logger.service'
import fs from 'fs'
import http, { Server as HTTPServer } from 'http'
import https, { Server as HTTPSServer } from 'https'
import { app } from './app'

const MODE = process.env.NODE_ENV

const PORT = process.env.PORT || 3001
const HOST = MODE === 'production' ? process.env.PROD_HOST : process.env.DEV_HOST
let server: HTTPServer | HTTPSServer

if (MODE === 'production') {
  const credentials = {
    key: fs.readFileSync(process.env.PRIVATE_KEY || '', 'utf8'),
    cert: fs.readFileSync(process.env.CERTIFICATE || '', 'utf8'),
    ca: fs.readFileSync(process.env.CA || '', 'utf8'),
  }

  server = https.createServer(credentials, app)
} else {
  server = http.createServer(app)
}

async function startServer() {
  server.listen(PORT, () => {
    logger.info(`Сервер запущен в режиме ${process.env.NODE_ENV} на ${HOST}:${PORT}`)
  })
}

startServer()
