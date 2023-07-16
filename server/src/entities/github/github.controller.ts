import { logger } from '@services/logger.service'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import * as service from './github.service'

type TResponse = Response<any, Record<string, any>>

const asyncWrapper = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)
export const getUsers = asyncWrapper(async (req: Request, res: Response): Promise<TResponse> => {
  logger.info(`${req.method}: ${req.originalUrl}`)

  const result = await service.getUsers()
  return res.status(200).json(result)
})

export const getUsersByName = asyncWrapper(
  async (req: Request, res: Response): Promise<TResponse> => {
    logger.info(`${req.method}: ${req.originalUrl}`)
    const result = await service.getUsers(req.query.q as string)
    return res.status(200).json(result)
  },
)

export const getUserById = asyncWrapper(async (req: Request, res: Response): Promise<TResponse> => {
  logger.info(`${req.method}: ${req.originalUrl}`)
  const result = await service.getUserById(req.params.id)
  return res.status(200).json(result)
})

export const getReposByUser = asyncWrapper(
  async (req: Request, res: Response): Promise<TResponse> => {
    logger.info(`${req.method}: ${req.originalUrl}`)
    const result = await service.getReposByUser(req.params.id)
    return res.status(200).json(result)
  },
)
