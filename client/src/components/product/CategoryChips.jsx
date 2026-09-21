const chipBase =
  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors'
const chipActive = 'border-wood bg-wood text-cream'
const chipIdle = 'border-sand-dark bg-white text-ink hover:border-wood-light'

// One row that scrolls sideways on phones and wraps on larger screens
export default function CategoryChips({ categories, activeSlug, onSelect }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0"
    >
      <div className="flex gap-2 sm:flex-wrap">
        <button
          type="button"
          onClick={() => onSelect('')}
          aria-pressed={!activeSlug}
          className={`${chipBase} ${!activeSlug ? chipActive : chipIdle}`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => onSelect(category.slug)}
            aria-pressed={activeSlug === category.slug}
            className={`${chipBase} ${
              activeSlug === category.slug ? chipActive : chipIdle
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}