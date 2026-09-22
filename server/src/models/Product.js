import mongoose from 'mongoose'
import { slugify } from '../utils/slugify.js'

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
  },
  { _id: false },
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: { type: String, trim: true, maxlength: 2000, default: '' },

    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0, default: null },

    material: { type: String, trim: true, default: '' },
    color: { type: String, trim: true, default: '' },
    dimensions: { type: String, trim: true, default: '' },
    capacity: { type: String, trim: true, default: '' },
    warranty: { type: String, trim: true, default: '' },

    availability: {
      type: String,
      enum: ['in_stock', 'made_to_order', 'out_of_stock'],
      default: 'in_stock',
    },

    images: { type: [imageSchema], default: [] },

    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

productSchema.pre('validate', function generateSlug(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name)
  }
  next()
})

// A discount price, if set, must be lower than the regular price
productSchema.pre('validate', function checkDiscount(next) {
  if (this.discountPrice && this.discountPrice >= this.price) {
    next(new Error('discountPrice must be lower than price'))
    return
  }
  next()
})

// Text index powers the search feature (name, description, material)
productSchema.index({ name: 'text', description: 'text', material: 'text' })
productSchema.index({ category: 1 })

export default mongoose.model('Product', productSchema)