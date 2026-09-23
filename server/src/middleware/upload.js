import multer from 'multer'
import { ApiError } from './errorHandler.js'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Files are held in memory (as a Buffer), never written to disk here.
// They get streamed straight to Cloudinary in the controller.
const storage = multer.memoryStorage()

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    cb(new ApiError(400, 'Only JPG, PNG and WEBP images are allowed'))
    return
  }
  cb(null, true)
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
})