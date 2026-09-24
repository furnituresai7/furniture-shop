import { useRef, useState } from 'react'
import { Loader2, Upload, X } from 'lucide-react'
import { deleteImage, uploadImage } from '../../services/uploadService'
import SafeImage from '../common/SafeImage'

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// value: { url, publicId } | null. onChange receives the new value.
export default function ImageUploader({ value, onChange, folder, label = 'Image' }) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = '' // allow choosing the same file again later
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

    setIsUploading(true)
    try {
      // Replace: remove the old image from Cloudinary first
      if (value?.publicId) {
        await deleteImage(value.publicId).catch(() => {})
      }
      const uploaded = await uploadImage(file, folder)
      onChange(uploaded)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    if (value?.publicId) {
      await deleteImage(value.publicId).catch(() => {})
    }
    onChange(null)
  }

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-ink">{label}</p>

      <div className="flex items-center gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-sand-dark">
          {value?.url ? (
            <SafeImage src={value.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sand text-xs text-muted">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-lg border border-sand-dark bg-white px-3 py-2 text-sm font-medium text-wood hover:bg-sand disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Upload size={16} aria-hidden="true" />
            )}
            {value?.url ? 'Replace' : 'Upload'}
          </button>

          {value?.url && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="inline-flex items-center gap-1 text-sm text-danger hover:underline"
            >
              <X size={14} aria-hidden="true" />
              Remove
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
      </div>

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  )
}