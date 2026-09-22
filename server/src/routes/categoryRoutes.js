import { Router } from 'express'
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

// Admin-only routes. Auth middleware will be added in Step 15;
// these are left open for now so you can test them with Postman/Thunder Client.
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router