import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from '../controllers/productController.js'

const router = Router()

router.get('/', getProducts)
router.get('/slug/:slug', getProductBySlug)
router.get('/slug/:slug/related', getRelatedProducts)

router.post('/', requireAuth, createProduct)
router.put('/:id', requireAuth, updateProduct)
router.delete('/:id', requireAuth, deleteProduct)

export default router