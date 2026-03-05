import express from 'express'
import { createExtra, deleteExtra, getAllExtras, getExtra, updateExtra } from '../controllers/extrasController'

const router = express.Router()

// ! Admin only
router.get('/admin/extras', getAllExtras)
router.get('/admin/extras/:id', getExtra)
router.post('/admin/extras', createExtra)
router.delete('/admin/extras/:id', deleteExtra)
router.patch('/admin/extras/:id', updateExtra)

export default router;