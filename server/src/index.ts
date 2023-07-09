import * as dotenv from 'dotenv'
dotenv.config()

import { logger } from '@services/logger.service'
import http from 'http'
import { app } from './app'

const PORT = process.env.PORT || 3001
const HOST = `http://localhost:${PORT}`

const server = http.createServer(app)

async function startServer() {
  server.listen(PORT, () => {
    logger.info(`Сервер запущен в режиме ${process.env.NODE_ENV} на ${HOST}`)
  })
}

startServer()
