import express from 'express'
import { createExtra, deleteExtra, getAllExtras, getExtra, updateExtra } from '../controllers/extrasController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { adminMiddleware } from '../middlewares/adminMiddleware'

const router = express.Router()

router.get('/admin/extras', authMiddleware, adminMiddleware, getAllExtras)
router.get('/admin/extras/:id',authMiddleware, adminMiddleware,  getExtra)
router.post('/admin/extras',authMiddleware, adminMiddleware,  createExtra)
router.delete('/admin/extras/:id',authMiddleware, adminMiddleware,  deleteExtra)
router.patch('/admin/extras/:id',authMiddleware, adminMiddleware,  updateExtra)

export default router;