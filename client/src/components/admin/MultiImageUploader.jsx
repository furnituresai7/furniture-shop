import { useRef, useState } from 'react'
import { GripVertical, Loader2, Upload, X } from 'lucide-react'
import { deleteImage, uploadImage } from '../../services/uploadService'
import SafeImage from '../common/SafeImage'

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGES = 6

// value: [{ url, publicId }]. First image is the cover/card image.
export default function MultiImageUploader({ value = [], onChange, folder }) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setError('')

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG or WEBP images are allowed.')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('Image must be 5MB or smaller.')
      return
    }
    if (value.length >= MAX_IMAGES) {
      setError(`You can add up to ${MAX_IMAGES} images.`)
      return
    }

    setIsUploading(true)
    try {
      const uploaded = await uploadImage(file, folder)
      onChange([...value, uploaded])
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async (index) => {
    const image = value[index]
    if (image?.publicId) {
      await deleteImage(image.publicId).catch(() => {})
    }
    onChange(value.filter((_, i) => i !== index))
  }

  const moveImage = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= value.length) return
    const next = [...value]
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    onChange(next)
  }

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-ink">
        Product Images <span className="font-normal text-muted">(first image is the cover)</span>
      </p>

      <div className="flex flex-wrap gap-3">
        {value.map((image, index) => (
          <div
            key={image.publicId || index}
            className="relative h-24 w-24 overflow-hidden rounded-lg border border-sand-dark"
          >
            <SafeImage src={image.url} alt="" fallbackText="" className="h-full w-full object-cover" />
            {index === 0 && (
              <span className="absolute left-1 top-1 rounded bg-wood/90 px-1.5 py-0.5 text-[10px] font-semibold text-cream">
                Cover
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-0.5">
              <button
                type="button"
                onClick={() => moveImage(index, -1)}
                disabled={index === 0}
                aria-label="Move left"
                className="p-0.5 text-white disabled:opacity-30"
              >
                <GripVertical size={12} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                aria-label="Remove image"
                className="p-0.5 text-white hover:text-red-300"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}

        {value.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-sand-dark text-muted hover:border-wood-light hover:text-wood disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            ) : (
              <Upload size={18} aria-hidden="true" />
            )}
            <span className="text-xs">Add</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  )
}