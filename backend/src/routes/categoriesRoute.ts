import express from 'express'
import { getAllCategories, createCategories, updateCategories, deleteCategories } from '../controllers/categoriesController'


const router = express.Router()

router.get('/categories', getAllCategories)


// ! Admin only
router.post('/categories', createCategories)
router.delete('/categories', deleteCategories )
router.patch('/categories', updateCategories)

export default router;