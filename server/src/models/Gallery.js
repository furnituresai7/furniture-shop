import mongoose from 'mongoose'

const galleryItemSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
    },
    caption: { type: String, trim: true, default: '' },
    category: {
      type: String,
      enum: ['showroom', 'living-room', 'bedroom', 'dining', 'custom-work', 'workshop'],
      required: true,
    },
  },
  { timestamps: true },
)

galleryItemSchema.index({ category: 1 })

export default mongoose.model('GalleryItem', galleryItemSchema)