import express from 'express'
import { createExtra, deleteExtra, getAllExtras, getExtra, updateExtra } from '../controllers/extrasController'

const router = express.Router()

router.get('/products/extras', getAllExtras)
router.get('/products/extras/:id', getExtra)

// ! Admin only
router.post('/products/extras', createExtra)
router.delete('/products/extras/:id', deleteExtra)
router.patch('/products/extras/:id', updateExtra)

export default router;