import express from 'express'
import Controller from './controller'

const router = express.Router()

router.get('/api/v1/circulating', Controller.circulating)
router.get('/api/v1/total', Controller.total)
router.get('/api/v1/cg/circulating', Controller.cgCirculating)
router.get('/api/v1/cg/total', Controller.cgTotal)

export default router