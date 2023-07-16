import express, { Router } from 'express'
import * as controller from './github.controller'

export const router: Router = express.Router()

router.route('/users').get(controller.getUsers)
router.route('/users/:id').get(controller.getUserById)
router.route('/users/:id/repos').get(controller.getReposByUser)
router.route('/search/users?').get(controller.getUsersByName)
