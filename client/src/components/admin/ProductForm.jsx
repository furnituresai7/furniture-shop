import { useState } from 'react'
import Button from '../common/Button'
import TextField from '../common/TextField'
import MultiImageUploader from './MultiImageUploader'

const EMPTY_FORM = {
  name: '',
  category: '',
  price: '',
  discountPrice: '',
  material: '',
  color: '',
  dimensions: '',
  capacity: '',
  warranty: '',
  availability: 'in_stock',
  description: '',
  featured: false,
  images: [],
}

export function toFormValues(product) {
  if (!product) return EMPTY_FORM
  return {
    name: product.name || '',
    category: product.category?._id || product.category || '',
    price: product.price ?? '',
    discountPrice: product.discountPrice ?? '',
    material: product.material || '',
    color: product.color || '',
    dimensions: product.dimensions || '',
    capacity: product.capacity || '',
    warranty: product.warranty || '',
    availability: product.availability || 'in_stock',
    description: product.description || '',
    featured: Boolean(product.featured),
    images: product.images || [],
  }
}

export default function ProductForm({ categories, initialValues, onSubmit, onCancel, isSaving, error }) {
  const [form, setForm] = useState(initialValues || EMPTY_FORM)

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <TextField
        id="product-name"
        label="Product name"
        required
        value={form.name}
        onChange={(event) => update('name', event.target.value)}
      />

      <div>
        <label htmlFor="product-category" className="mb-1 block text-sm font-medium text-ink">
          Category <span className="text-danger">*</span>
        </label>
        <select
          id="product-category"
          required
          value={form.category}
          onChange={(event) => update('category', event.target.value)}
          className="w-full rounded-lg border border-sand-dark bg-white px-3 py-3 text-base"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-price"
          type="number"
          min="0"
          label="Price (₹)"
          required
          value={form.price}
          onChange={(event) => update('price', event.target.value)}
        />
        <TextField
          id="product-discount-price"
          type="number"
          min="0"
          label="Discount price (₹, optional)"
          value={form.discountPrice}
          onChange={(event) => update('discountPrice', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-material"
          label="Material"
          value={form.material}
          onChange={(event) => update('material', event.target.value)}
        />
        <TextField
          id="product-color"
          label="Colour"
          value={form.color}
          onChange={(event) => update('color', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-dimensions"
          label="Dimensions"
          placeholder="e.g. 96 x 60 x 32 in"
          value={form.dimensions}
          onChange={(event) => update('dimensions', event.target.value)}
        />
        <TextField
          id="product-capacity"
          label="Capacity (optional)"
          placeholder="e.g. 5 Seater"
          value={form.capacity}
          onChange={(event) => update('capacity', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-warranty"
          label="Warranty (optional)"
          placeholder="e.g. 1 Year"
          value={form.warranty}
          onChange={(event) => update('warranty', event.target.value)}
        />
        <div>
          <label htmlFor="product-availability" className="mb-1 block text-sm font-medium text-ink">
            Availability
          </label>
          <select
            id="product-availability"
            value={form.availability}
            onChange={(event) => update('availability', event.target.value)}
            className="w-full rounded-lg border border-sand-dark bg-white px-3 py-3 text-base"
          >
            <option value="in_stock">In Stock</option>
            <option value="made_to_order">Made to Order</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <TextField
        id="product-description"
        label="Description"
        multiline
        rows={3}
        value={form.description}
        onChange={(event) => update('description', event.target.value)}
      />

      <MultiImageUploader
        value={form.images}
        onChange={(images) => update('images', images)}
        folder="products"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => update('featured', event.target.checked)}
          className="h-4 w-4 rounded border-sand-dark"
        />
        Show on Home page as a featured product
      </label>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}