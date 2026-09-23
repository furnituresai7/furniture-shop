import CategoryGrid from '../components/home/CategoryGrid'
import ErrorMessage from '../components/common/ErrorMessage'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Hero from '../components/home/Hero'
import HomeCTA from '../components/home/HomeCTA'
import Spinner from '../components/common/Spinner'
import StatsBar from '../components/home/StatsBar'
import WhyChooseUs from '../components/home/WhyChooseUs'
import { useFetch } from '../hooks/useFetch'
import { getCategories } from '../services/categoryService'
import { getProducts } from '../services/productService'

export default function Home() {
  const categoriesFetch = useFetch(() => getCategories(), [])
  const featuredFetch = useFetch(() => getProducts({ featured: 'true' }), [])

  const isLoading = categoriesFetch.isLoading || featuredFetch.isLoading
  const error = categoriesFetch.error || featuredFetch.error

  return (
    <main>
      <Hero />
      <StatsBar />

      {isLoading && <Spinner label="Loading" />}

      {!isLoading && error && (
        <div className="mx-auto max-w-6xl px-4 py-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {!isLoading && !error && (
        <>
          <CategoryGrid categories={categoriesFetch.data || []} />
          <FeaturedProducts products={(featuredFetch.data || []).slice(0, 4)} />
        </>
      )}

      <WhyChooseUs />
      <HomeCTA />
    </main>
  )
}