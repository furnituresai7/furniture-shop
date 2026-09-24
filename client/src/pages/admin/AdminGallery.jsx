import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import SafeImage from '../../components/common/SafeImage'
import Spinner from '../../components/common/Spinner'
import TextField from '../../components/common/TextField'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ImageUploader from '../../components/admin/ImageUploader'
import Modal from '../../components/admin/Modal'
import { galleryCategories } from '../../data/galleryData'
import { useFetch } from '../../hooks/useFetch'
import { getGalleryItems } from '../../services/galleryService'
import {
  createGalleryItem,
  deleteGalleryItem,
} from '../../services/galleryAdminService'
import { deleteImage } from '../../services/uploadService'

const EMPTY_FORM = { image: null, caption: '', category: galleryCategories[0]?.slug || '' }

export default function AdminGallery() {
  const [refreshKey, setRefreshKey] = useState(0)
  const galleryFetch = useFetch(() => getGalleryItems(), [refreshKey])

  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const items = galleryFetch.data || []
  const refetch = () => setRefreshKey((key) => key + 1)

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setFormError('')
    setIsAdding(true)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!form.image?.url) {
      setFormError('Please upload an image.')
      return
    }

    setIsSaving(true)
    setFormError('')

    try {
      await createGalleryItem({
        image: form.image,
        caption: form.caption.trim(),
        category: form.category,
      })
      setIsAdding(false)
      refetch()
    } catch (err) {
      setFormError(err.message || 'Failed to add image')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setDeleteError('')
    try {
      // Remove from Cloudinary too, not just MongoDB
      if (deleteTarget.image?.publicId) {
        await deleteImage(deleteTarget.image.publicId).catch(() => {})
      }
      await deleteGalleryItem(deleteTarget._id)
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete image')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Gallery</h1>
          <p className="mt-1 text-muted">Manage showroom and work photos</p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={18} aria-hidden="true" />
          Add Photo
        </Button>
      </div>

      <div className="mt-6">
        {galleryFetch.isLoading && <Spinner label="Loading gallery" />}
        {!galleryFetch.isLoading && galleryFetch.error && (
          <ErrorMessage message={galleryFetch.error} />
        )}

        {!galleryFetch.isLoading && !galleryFetch.error && (
          items.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-xl border border-sand-dark bg-white"
                >
                  <SafeImage
                    src={item.image?.url}
                    alt={item.caption}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    aria-label="Delete photo"
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-danger shadow hover:bg-white"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                  <div className="px-2 py-2">
                    <p className="truncate text-xs text-muted">
                      {galleryCategories.find((c) => c.slug === item.category)?.name}
                    </p>
                    {item.caption && (
                      <p className="truncate text-sm font-medium">{item.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center text-muted">
              No gallery photos yet.
            </p>
          )
        )}
      </div>

      {isAdding && (
        <Modal title="Add Gallery Photo" onClose={() => setIsAdding(false)}>
          <form onSubmit={handleSave} noValidate className="space-y-4">
            <ImageUploader
              value={form.image}
              onChange={(image) => setForm((f) => ({ ...f, image }))}
              folder="gallery"
              label="Photo"
            />

            <div>
              <label htmlFor="gallery-category" className="mb-1 block text-sm font-medium text-ink">
                Category
              </label>
              <select
                id="gallery-category"
                value={form.category}
                onChange={(event) => setForm((f) => ({ ...f, category: event.target.value }))}
                className="w-full rounded-lg border border-sand-dark bg-white px-3 py-3 text-base"
              >
                {galleryCategories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <TextField
              id="gallery-caption"
              label="Caption (optional)"
              value={form.caption}
              onChange={(event) => setForm((f) => ({ ...f, caption: event.target.value }))}
            />

            {formError && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
                {formError}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Add Photo'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Photo"
          message="Delete this photo? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => {
            setDeleteTarget(null)
            setDeleteError('')
          }}
          isLoading={isDeleting}
        />
      )}
      {deleteError && <p className="mt-2 text-right text-sm text-danger">{deleteError}</p>}
    </div>
  )
}