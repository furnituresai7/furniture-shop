import { Router } from 'express'
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

// Admin-only routes (auth added in Step 15)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router