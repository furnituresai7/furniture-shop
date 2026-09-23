import Enquiry from '../models/Enquiry.js'
import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { validateEnquiryInput } from '../utils/validators.js'

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, message, productSlug, website } = req.body

  // Honeypot: a real visitor never fills this hidden field. If it's filled,
  // pretend success (don't tip off the bot) but save nothing.
  if (website) {
    sendSuccess(res, { statusCode: 201, message: 'Enquiry received' })
    return
  }

  const { isValid, errors, normalized } = validateEnquiryInput({ name, phone, email, message })
  if (!isValid) throw new ApiError(400, errors.join(', '))

  let productId = null
  let source = 'contact_form'

  if (productSlug) {
    const product = await Product.findOne({ slug: productSlug }).select('_id')
    if (product) {
      productId = product._id
      source = 'product'
    }
  }

  const enquiry = await Enquiry.create({
    ...normalized,
    product: productId,
    source,
  })

  sendSuccess(res, {
    statusCode: 201,
    message: 'Enquiry received',
    data: { id: enquiry._id },
  })
})

// Admin-only in practice (auth added in Step 15)
export const getEnquiries = asyncHandler(async (req, res) => {
  const { status } = req.query
  const filter = status ? { status } : {}

  const enquiries = await Enquiry.find(filter)
    .populate('product', 'name slug')
    .sort({ createdAt: -1 })
    .lean()

  sendSuccess(res, { data: enquiries })
})

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  const allowed = ['new', 'contacted', 'closed']

  if (!allowed.includes(status)) {
    throw new ApiError(400, `status must be one of: ${allowed.join(', ')}`)
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  )

  if (!enquiry) throw new ApiError(404, 'Enquiry not found')

  sendSuccess(res, { data: enquiry, message: 'Enquiry updated' })
})