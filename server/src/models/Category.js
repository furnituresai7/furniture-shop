import mongoose from 'mongoose'
import { slugify } from '../utils/slugify.js'

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

// Auto-generate the slug from the name whenever the name changes
categorySchema.pre('validate', function generateSlug(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name)
  }
  next()
})

export default mongoose.model('Category', categorySchema)