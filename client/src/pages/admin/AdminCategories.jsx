import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import SafeImage from '../../components/common/SafeImage'
import Spinner from '../../components/common/Spinner'
import TextField from '../../components/common/TextField'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ImageUploader from '../../components/admin/ImageUploader'
import Modal from '../../components/admin/Modal'
import { useFetch } from '../../hooks/useFetch'
import { getCategories } from '../../services/categoryService'
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../services/categoryAdminService'

const EMPTY_FORM = { name: '', image: null }

export default function AdminCategories() {
  const categoriesFetch = useFetch(() => getCategories(), [])
  const [refreshKey, setRefreshKey] = useState(0)

  const [editingCategory, setEditingCategory] = useState(null) // null=closed, {}=new, {...}=edit
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const categories = categoriesFetch.data || []
  const refetch = () => setRefreshKey((key) => key + 1)

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setFormError('')
    setEditingCategory({})
  }

  const openEdit = (category) => {
    setForm({ name: category.name, image: category.image?.url ? category.image : null })
    setFormError('')
    setEditingCategory(category)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!form.name.trim()) {
      setFormError('Category name is required.')
      return
    }

    setIsSaving(true)
    setFormError('')

    const payload = {
      name: form.name.trim(),
      image: form.image
        ? { url: form.image.url, publicId: form.image.publicId }
        : { url: '', publicId: '' },
    }

    try {
      if (editingCategory?._id) {
        await updateCategory(editingCategory._id, payload)
      } else {
        await createCategory(payload)
      }
      setEditingCategory(null)
      refetch()
    } catch (err) {
      setFormError(err.message || 'Failed to save category')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteCategory(deleteTarget._id)
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete category')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div key={refreshKey}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Categories</h1>
          <p className="mt-1 text-muted">Manage furniture categories</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={18} aria-hidden="true" />
          Add Category
        </Button>
      </div>

      <div className="mt-6">
        {categoriesFetch.isLoading && <Spinner label="Loading categories" />}
        {!categoriesFetch.isLoading && categoriesFetch.error && (
          <ErrorMessage message={categoriesFetch.error} />
        )}

        {!categoriesFetch.isLoading && !categoriesFetch.error && (
          <div className="overflow-hidden rounded-xl border border-sand-dark bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-sand-dark bg-sand/50 text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Products</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dark">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg border border-sand-dark">
                        <SafeImage
                          src={category.image?.url}
                          alt=""
                          fallbackText=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-muted">{category.productCount ?? '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(category)}
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg p-1.5 text-wood hover:bg-sand"
                        >
                          <Pencil size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(category)}
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg p-1.5 text-danger hover:bg-red-50"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted">
                      No categories yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingCategory !== null && (
        <Modal
          title={editingCategory?._id ? 'Edit Category' : 'Add Category'}
          onClose={() => setEditingCategory(null)}
        >
          <form onSubmit={handleSave} noValidate className="space-y-4">
            <TextField
              id="category-name"
              label="Category name"
              required
              value={form.name}
              onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
            />

            <ImageUploader
              value={form.image}
              onChange={(image) => setForm((f) => ({ ...f, image }))}
              folder="categories"
            />

            {formError && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
                {formError}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingCategory(null)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Category"
          message={`Delete "${deleteTarget.name}"? This cannot be undone. Categories with products cannot be deleted.`}
          onConfirm={handleDelete}
          onCancel={() => {
            setDeleteTarget(null)
            setDeleteError('')
          }}
          isLoading={isDeleting}
        />
      )}
      {deleteError && (
        <p className="mt-2 text-right text-sm text-danger">{deleteError}</p>
      )}
    </div>
  )
}