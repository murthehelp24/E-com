import { changeOrderStatus, getOrderAdmin } from '../controllers/admin.controller.js'
import { authCheck } from '../middleware/authCheck.js'
import express from 'express'

const router = express.Router()

router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)


export default router