import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import { deleteImage, uploadImage } from '../controllers/uploadController.js'

const router = Router()

// Admin-only in practice (auth middleware added in Step 15).
// field name must be "image" on the frontend's FormData.
router.post('/', upload.single('image'), uploadImage)
router.delete('/', deleteImage)

export default router