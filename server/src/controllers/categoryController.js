import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ order: 1, name: 1 }).lean()

  // Attach a live product count to each category
  const withCounts = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      productCount: await Product.countDocuments({
        category: category._id,
        isActive: true,
      }),
    })),
  )

  sendSuccess(res, { data: withCounts })
})

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).lean()

  if (!category) throw new ApiError(404, 'Category not found')

  sendSuccess(res, { data: category })
})

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body)
  sendSuccess(res, { data: category, statusCode: 201, message: 'Category created' })
})

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!category) throw new ApiError(404, 'Category not found')

  sendSuccess(res, { data: category, message: 'Category updated' })
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const inUse = await Product.exists({ category: req.params.id })
  if (inUse) {
    throw new ApiError(409, 'Cannot delete a category that still has products')
  }

  const category = await Category.findByIdAndDelete(req.params.id)
  if (!category) throw new ApiError(404, 'Category not found')

  sendSuccess(res, { message: 'Category deleted' })
})