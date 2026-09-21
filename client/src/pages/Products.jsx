import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'
import Pagination from '../components/common/Pagination'
import CategoryChips from '../components/product/CategoryChips'
import ProductCard from '../components/product/ProductCard'
import SearchBar from '../components/product/SearchBar'
import SortSelect from '../components/product/SortSelect'
import { demoCategories, demoProducts } from '../data/demoData'
import { DEFAULT_SORT, filterAndSortProducts } from '../utils/productFilters'

const PAGE_SIZE = 8

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  // All filter state lives in the URL
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || DEFAULT_SORT
  const requestedPage = Number(searchParams.get('page')) || 1

  const results = filterAndSortProducts(demoProducts, { search, category, sort })
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const page = Math.min(Math.max(requestedPage, 1), totalPages)

  const startIndex = (page - 1) * PAGE_SIZE
  const visibleProducts = results.slice(startIndex, startIndex + PAGE_SIZE)

  // Updates URL parameters. An empty value removes that parameter.
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)

    Object.entries(changes).forEach(([key, value]) => {
      if (value) {
        next.set(key, value)
      } else {
        next.delete(key)
      }
    })

    setSearchParams(next)
  }

  // Any filter change goes back to page 1
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
        {/* key remounts the search box when the URL search value changes */}
        <SearchBar
          key={search}
          initialValue={search}
          onSearch={handleSearch}
          className="md:max-w-xl md:flex-1"
        />
        <SortSelect value={sort} onChange={handleSort} />
      </div>

      <CategoryChips
        categories={demoCategories}
        activeSlug={category}
        onSelect={handleCategory}
      />

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length > 0
          ? `Showing ${startIndex + 1}-${startIndex + visibleProducts.length} of ${results.length} products`
          : 'No products found'}
      </p>

      <div className="mt-4">
        {visibleProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}