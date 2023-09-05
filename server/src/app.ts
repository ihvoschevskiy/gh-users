import { router } from '@entities/github/github.router'
import { logger } from '@services/logger.service'
import { AxiosError } from 'axios'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'

export const app: Express = express()

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.PROD_HOST as string]
        : [process.env.DEV_ORIGIN as string],
  }),
)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use('/api', router)
app.use('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.use(
  (err: NodeJS.ErrnoException | AxiosError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AxiosError) {
      const code = err.response?.status || 500
      logger.error(`${code}: ${err.message}`)
      return res.status(code).json({ response: 'error', message: err.message })
    }

    logger.error(`${err.code}: ${err.message}`)
    return res.status(500).json({ response: 'error', message: err.message })
  },
)
