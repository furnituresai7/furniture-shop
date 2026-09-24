import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import Pagination from '../components/common/Pagination'
import Spinner from '../components/common/Spinner'
import CategoryChips from '../components/product/CategoryChips'
import ProductCard from '../components/product/ProductCard'
import SearchBar from '../components/product/SearchBar'
import SortSelect from '../components/product/SortSelect'
import { useFetch } from '../hooks/useFetch'
import { getCategories } from '../services/categoryService'
import { getProducts } from '../services/productService'
import { DEFAULT_SORT } from '../utils/productFilters'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || DEFAULT_SORT
  const page = Number(searchParams.get('page')) || 1

  const categoriesFetch = useFetch(() => getCategories(), [])
  const productsFetch = useFetch(
    () => getProducts({ search, category, sort, page }),
    [search, category, sort, page],
  )

  const products = productsFetch.data || []
  const totalPages = productsFetch.meta?.totalPages || 1
  const total = productsFetch.meta?.total || 0
  const startIndex = (page - 1) * 8

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    setSearchParams(next)
  }

  const handleSearch = (value) => updateParams({ search: value, page: '' })
  const handleCategory = (slug) => updateParams({ category: slug, page: '' })
  const handleSort = (value) =>
    updateParams({ sort: value === DEFAULT_SORT ? '' : value, page: '' })
  const handlePageChange = (newPage) => {
    updateParams({ page: newPage > 1 ? String(newPage) : '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const clearFilters = () => setSearchParams({})

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Our Products</h1>
        <p className="mt-2 text-muted">
          Browse our furniture collection and find the right piece for your home.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          key={search}
          initialValue={search}
          onSearch={handleSearch}
          className="md:max-w-xl md:flex-1"
        />
        <SortSelect value={sort} onChange={handleSort} />
      </div>

      <CategoryChips
        categories={categoriesFetch.data || []}
        activeSlug={category}
        onSelect={handleCategory}
      />

      {productsFetch.isLoading && <Spinner label="Loading products" />}

      {!productsFetch.isLoading && productsFetch.error && (
        <ErrorMessage
          message={productsFetch.error}
          onRetry={() => setSearchParams(new URLSearchParams(searchParams))}
        />
      )}

      {!productsFetch.isLoading && !productsFetch.error && (
        <>
          <p className="mt-6 text-sm text-muted" aria-live="polite">
            {products.length > 0
              ? `Showing ${startIndex + 1}-${startIndex + products.length} of ${total} products`
              : 'No products found'}
          </p>

          <div className="mt-4">
            {products.length > 0 ? (
                          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching products"
                text="Try a different search word or category, or clear the filters to see everything."
                actionLabel="Clear filters"
                onAction={clearFilters}
              />
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  )
}