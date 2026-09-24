import GalleryItem from '../models/Gallery.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'

export const getGalleryItems = asyncHandler(async (req, res) => {
  const { category } = req.query
  const filter = category ? { category } : {}

  const items = await GalleryItem.find(filter).sort({ createdAt: -1 }).lean()
  sendSuccess(res, { data: items })
})

export const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.create(req.body)
  sendSuccess(res, { data: item, statusCode: 201, message: 'Gallery image added' })
})

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Gallery image not found')
  sendSuccess(res, { message: 'Gallery image deleted' })
})