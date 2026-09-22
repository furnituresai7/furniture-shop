import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'

const PAGE_SIZE = 8

const SORT_MAP = {
  newest: { createdAt: -1 },
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  'name-asc': { name: 1 },
}

export const getProducts = asyncHandler(async (req, res) => {
  const { search = '', category = '', sort = 'newest', featured, page = 1 } = req.query

  const filter = { isActive: true }

  if (category) {
    // category comes in as a slug from the frontend; resolve it to an ObjectId
    const Category = (await import('../models/Category.js')).default
    const categoryDoc = await Category.findOne({ slug: category }).select('_id')
    filter.category = categoryDoc ? categoryDoc._id : null
  }

  if (search) {
    filter.$text = { $search: search }
  }

  if (featured === 'true') {
    filter.featured = true
  }

  const currentPage = Math.max(Number(page) || 1, 1)
  const sortOption = SORT_MAP[sort] || SORT_MAP.newest

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip((currentPage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    Product.countDocuments(filter),
  ])

  sendSuccess(res, {
    data: products,
    meta: {
      page: currentPage,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
      total,
    },
  })
})

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    isActive: true,
  }).populate('category', 'name slug')

  if (!product) throw new ApiError(404, 'Product not found')

  sendSuccess(res, { data: product })
})

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
  if (!product) throw new ApiError(404, 'Product not found')

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
  })
    .populate('category', 'name slug')
    .limit(4)
    .lean()

  sendSuccess(res, { data: related })
})

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body)
  sendSuccess(res, { data: product, statusCode: 201, message: 'Product created' })
})

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product) throw new ApiError(404, 'Product not found')

  sendSuccess(res, { data: product, message: 'Product updated' })
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) throw new ApiError(404, 'Product not found')

  sendSuccess(res, { message: 'Product deleted' })
})