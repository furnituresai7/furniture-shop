import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
} from '../controllers/galleryController.js'

const router = Router()

router.get('/', getGalleryItems)
router.post('/', requireAuth, createGalleryItem)
router.delete('/:id', requireAuth, deleteGalleryItem)

export default router