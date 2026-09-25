import { MessageCircle } from 'lucide-react'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'
import Seo from '../components/common/Seo'
import Spinner from '../components/common/Spinner'
import CategoryCard from '../components/category/CategoryCard'
import { useFetch } from '../hooks/useFetch'
import { getCategories } from '../services/categoryService'
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp'

export default function Categories() {
  const categoriesFetch = useFetch(() => getCategories(), [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Seo title="Categories" description="Explore our wide range of furniture categories." />

      <header className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Shop by Category</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Explore our wide range of furniture categories.
        </p>
      </header>

      {categoriesFetch.isLoading && <Spinner label="Loading categories" />}

      {!categoriesFetch.isLoading && categoriesFetch.error && (
        <ErrorMessage message={categoriesFetch.error} />
      )}

      {!categoriesFetch.isLoading && !categoriesFetch.error && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {(categoriesFetch.data || []).map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              productCount={category.productCount}
            />
          ))}
        </div>
      )}

      <section className="mt-12 rounded-2xl bg-sand px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold">Looking for something custom?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Tell us what you have in mind and we will get back to you.
        </p>
        <Button
          href={getWhatsAppLink(WHATSAPP_MESSAGES.custom)}
          variant="whatsapp"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Discuss on WhatsApp
        </Button>
      </section>
    </main>
  )
}