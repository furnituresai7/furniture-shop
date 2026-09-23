import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { deleteImage, uploadImage } from '../controllers/uploadController.js'

const router = Router()

router.post('/', requireAuth, upload.single('image'), uploadImage)
router.delete('/', requireAuth, deleteImage)

export default router