import express from 'express'
import Controller from './controller'

const router = express.Router()

router.get('/api/v1/circulating', Controller.circulating)
router.get('/api/v1/total', Controller.total)

export default router