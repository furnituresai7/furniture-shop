import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import Pagination from '../../components/common/Pagination'
import SafeImage from '../../components/common/SafeImage'
import Spinner from '../../components/common/Spinner'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import Modal from '../../components/admin/Modal'
import ProductForm, { toFormValues } from '../../components/admin/ProductForm'
import { useFetch } from '../../hooks/useFetch'
import { getCategories } from '../../services/categoryService'
import { getProducts } from '../../services/productService'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../services/productAdminService'
import { formatPrice } from '../../utils/formatPrice'
import { getCategoryName, getProductCoverImage } from '../../utils/productHelpers'

export default function AdminProducts() {
  const [page, setPage] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)

  const categoriesFetch = useFetch(() => getCategories(), [])
  const productsFetch = useFetch(() => getProducts({ page }), [page, refreshKey])

  const [editingProduct, setEditingProduct] = useState(null) // null=closed, {}=new, {...}=edit
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const products = productsFetch.data || []
  const categories = categoriesFetch.data || []
  const refetch = () => setRefreshKey((key) => key + 1)

  const handleSave = async (values) => {
    setIsSaving(true)
    setFormError('')

    try {
      if (editingProduct?._id) {
        await updateProduct(editingProduct._id, values)
      } else {
        await createProduct(values)
      }
      setEditingProduct(null)
      refetch()
    } catch (err) {
      setFormError(err.message || 'Failed to save product')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteProduct(deleteTarget._id)
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete product')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Products</h1>
          <p className="mt-1 text-muted">Manage your furniture catalogue</p>
        </div>
        <Button onClick={() => setEditingProduct({})}>
          <Plus size={18} aria-hidden="true" />
          Add Product
        </Button>
      </div>

      <div className="mt-6">
        {productsFetch.isLoading && <Spinner label="Loading products" />}
        {!productsFetch.isLoading && productsFetch.error && (
          <ErrorMessage message={productsFetch.error} />
        )}

        {!productsFetch.isLoading && !productsFetch.error && (
          <>
            <div className="overflow-x-auto rounded-xl border border-sand-dark bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sand-dark bg-sand/50 text-xs uppercase text-muted">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-3">
                        <div className="h-10 w-10 overflow-hidden rounded-lg border border-sand-dark">
                          <SafeImage
                            src={getProductCoverImage(product)}
                            alt=""
                            fallbackText=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-muted">{getCategoryName(product)}</td>
                      <td className="px-4 py-3">{formatPrice(product.price)}</td>
                      <td className="px-4 py-3">
                        {product.featured && (
                          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(product)}
                            aria-label={`Edit ${product.name}`}
                            className="rounded-lg p-1.5 text-wood hover:bg-sand"
                          >
                            <Pencil size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(product)}
                            aria-label={`Delete ${product.name}`}
                            className="rounded-lg p-1.5 text-danger hover:bg-red-50"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted">
                        No products yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={productsFetch.meta?.totalPages || 1}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {editingProduct !== null && (
        <Modal
          title={editingProduct?._id ? 'Edit Product' : 'Add Product'}
          onClose={() => setEditingProduct(null)}
          maxWidth="max-w-2xl"
        >
          <ProductForm
            categories={categories}
            initialValues={toFormValues(editingProduct)}
            onSubmit={handleSave}
            onCancel={() => setEditingProduct(null)}
            isSaving={isSaving}
            error={formError}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Product"
          message={`Delete "${deleteTarget.name}"? This cannot be undone.`}
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