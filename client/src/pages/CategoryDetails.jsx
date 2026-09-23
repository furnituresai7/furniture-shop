import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'
import CategoryChips from '../components/product/CategoryChips'
import ProductCard from '../components/product/ProductCard'
import { useFetch } from '../hooks/useFetch'
import { getCategories, getCategoryBySlug } from '../services/categoryService'
import { getProducts } from '../services/productService'
import { formatProductCount } from '../utils/categoryHelpers'

export default function CategoryDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const categoryFetch = useFetch(() => getCategoryBySlug(slug), [slug])
  const allCategoriesFetch = useFetch(() => getCategories(), [])
  const productsFetch = useFetch(() => getProducts({ category: slug }), [slug])

  const handleSelectCategory = (nextSlug) =>
    navigate(nextSlug ? `/categories/${nextSlug}` : '/categories')

  if (categoryFetch.isLoading) return <Spinner label="Loading category" />

  if (categoryFetch.error || !categoryFetch.data) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl">Category not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          This category may have been removed or the link may be incorrect.
        </p>
        <Button href="/categories" size="lg" className="mt-8">
          View all categories
        </Button>
      </main>
    )
  }

  const category = categoryFetch.data
  const products = productsFetch.data || []

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Categories', to: '/categories' },
          { label: category.name },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">{category.name}</h1>
        <p className="mt-2 text-muted">
          {formatProductCount(products.length)} in this category
        </p>
      </header>

      <CategoryChips
        categories={allCategoriesFetch.data || []}
        activeSlug={slug}
        onSelect={handleSelectCategory}
      />

      <div className="mt-6">
        {productsFetch.isLoading && <Spinner label="Loading products" />}

        {!productsFetch.isLoading && productsFetch.error && (
          <ErrorMessage message={productsFetch.error} />
        )}

        {!productsFetch.isLoading && !productsFetch.error && (
          products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products in this category yet"
              text="Please check back soon, or browse everything we have."
              actionLabel="Browse all products"
              onAction={() => navigate('/products')}
            />
          )
        )}
      </div>
    </main>
  )
}