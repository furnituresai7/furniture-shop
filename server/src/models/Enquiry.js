import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 1000 },

    // Optional link to the product the enquiry was made from
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },

    source: {
      type: String,
      enum: ['contact_form', 'product'],
      default: 'contact_form',
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true },
)

enquirySchema.index({ createdAt: -1 })
enquirySchema.index({ status: 1 })

export default mongoose.model('Enquiry', enquirySchema)