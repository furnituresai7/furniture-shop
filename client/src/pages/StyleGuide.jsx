import Button from '../components/common/Button'
import ProductCard from '../components/product/ProductCard'

const colors = [
  { name: 'cream', className: 'bg-cream', hex: '#FAF6F0' },
  { name: 'sand', className: 'bg-sand', hex: '#EFE6D8' },
  { name: 'sand-dark', className: 'bg-sand-dark', hex: '#E2D6C4' },
  { name: 'wood', className: 'bg-wood', hex: '#4A3226' },
  { name: 'wood-dark', className: 'bg-wood-dark', hex: '#3A261C' },
  { name: 'wood-light', className: 'bg-wood-light', hex: '#7A5A45' },
  { name: 'ink', className: 'bg-ink', hex: '#2B211B' },
  { name: 'muted', className: 'bg-muted', hex: '#6B635C' },
  { name: 'accent', className: 'bg-accent', hex: '#B8863B' },
  { name: 'whatsapp', className: 'bg-whatsapp', hex: '#147A3D' },
]

const demoProducts = [
  {
    name: 'Modern L Shape Sofa',
    slug: 'modern-l-shape-sofa',
    category: 'Sofa',
    price: 38999,
    discountPrice: 32999,
    image: '',
  },
  {
    name: 'Solid Wood Queen Bed',
    slug: 'solid-wood-queen-bed',
    category: 'Beds',
    price: 28999,
    image: '',
  },
]

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  )
}

export default function StyleGuide() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-bold">Style Guide</h1>
      <p className="mt-2 text-muted">
        Furniture Shop — design system preview (for client approval)
      </p>

      <Section title="Colours">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {colors.map((c) => (
            <div key={c.name}>
              <div className={`h-16 rounded-lg border border-sand-dark ${c.className}`} />
              <p className="mt-1 text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted">{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <h1 className="text-4xl font-bold">Heading 1 — Furniture That Feels Like Home</h1>
        <h2 className="mt-3 text-3xl font-semibold">Heading 2 — Shop by Category</h2>
        <h3 className="mt-3 text-xl font-semibold">Heading 3 — Featured Products</h3>
        <p className="mt-3 max-w-2xl">
          Body text (Inter). Solid wood furniture crafted for comfort and
          durability, made to fit your home and your budget.
        </p>
        <p className="mt-2 text-sm text-muted">Small muted text for secondary info.</p>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Explore Products</Button>
          <Button variant="outline">Get a Quote</Button>
          <Button variant="whatsapp">Chat on WhatsApp</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" size="lg">Large Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Product Card">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </main>
  )
}