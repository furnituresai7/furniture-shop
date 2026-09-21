import ProductCard from '../product/ProductCard'
import SectionHeading from '../common/SectionHeading'

export default function FeaturedProducts({ products }) {
  if (products.length === 0) return null

  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionHeading
          title="Featured Products"
          subtitle="A selection of our most popular pieces."
          linkTo="/products"
          linkLabel="View all products"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}