
import express from 'express'
import { currentUser, login, register } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login )
router.post('/current-user', currentUser)
router.post('/current-admin', currentUser)

export default router