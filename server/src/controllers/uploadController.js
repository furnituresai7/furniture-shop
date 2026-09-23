import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { deleteFromCloudinary, uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js'

// folder must be one of these, so uploads always land in an organised place
// e.g. furniture-shop/products/, furniture-shop/gallery/, furniture-shop/categories/
const ALLOWED_FOLDERS = ['products', 'categories', 'gallery', 'branding']

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file was provided')

  const { folder } = req.body
  if (!ALLOWED_FOLDERS.includes(folder)) {
    throw new ApiError(400, `folder must be one of: ${ALLOWED_FOLDERS.join(', ')}`)
  }

  const result = await uploadBufferToCloudinary(
    req.file.buffer,
    `furniture-shop/${folder}`,
  )

  sendSuccess(res, {
    statusCode: 201,
    message: 'Image uploaded',
    data: { url: result.secure_url, publicId: result.public_id },
  })
})

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body
  if (!publicId) throw new ApiError(400, 'publicId is required')

  await deleteFromCloudinary(publicId)

  sendSuccess(res, { message: 'Image deleted' })
})