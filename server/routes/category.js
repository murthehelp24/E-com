
import express from 'express'
import { create, list, remove } from '../controllers/category.controller.js'

const router = express.Router()

router.post('/category', create)
router.get('/category', list)
router.delete('/category/:id', remove)

export default router