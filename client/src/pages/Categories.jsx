import { MessageCircle } from 'lucide-react'
import Button from '../components/common/Button'
import CategoryCard from '../components/category/CategoryCard'
import { demoCategories, demoProducts } from '../data/demoData'
import { getProductCount } from '../utils/categoryHelpers'
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp'

export default function Categories() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Shop by Category</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Explore our wide range of furniture categories.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {demoCategories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            productCount={getProductCount(demoProducts, category.slug)}
          />
        ))}
      </div>

      {/* Confirm with the client that custom furniture is offered before launch */}
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