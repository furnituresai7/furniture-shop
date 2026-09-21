import CategoryCard from '../category/CategoryCard'
import SectionHeading from '../common/SectionHeading'

export default function CategoryGrid({ categories }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <SectionHeading
        title="Shop by Category"
        subtitle="Browse our furniture collection by room and type."
        linkTo="/categories"
        linkLabel="View all categories"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  )
}