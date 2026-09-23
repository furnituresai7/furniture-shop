import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from '../controllers/categoryController.js'

const router = Router()

router.get('/', getCategories)
router.get('/:slug', getCategoryBySlug)

router.post('/', requireAuth, createCategory)
router.put('/:id', requireAuth, updateCategory)
router.delete('/:id', requireAuth, deleteCategory)

export default router