import { useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import SafeImage from '../components/common/SafeImage'
import Lightbox from '../components/gallery/Lightbox'
import CategoryChips from '../components/product/CategoryChips'
import { demoGallery, galleryCategories } from '../data/galleryData'

export default function Gallery() {
  const [category, setCategory] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const visibleItems = category
    ? demoGallery.filter((item) => item.category === category)
    : demoGallery

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Our Gallery</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          A glimpse of our showroom, designs and finished work.
        </p>
      </header>

      <CategoryChips
        categories={galleryCategories}
        activeSlug={category}
        onSelect={setCategory}
      />

      <div className="mt-6">
        {visibleItems.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {visibleItems.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`View larger: ${item.caption}`}
                  className="group block w-full overflow-hidden rounded-lg"
                >
                  <SafeImage
                    src={item.src}
                    alt={item.caption}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No photos in this category yet"
            text="Please check back soon, or view all photos."
            actionLabel="Show all photos"
            onAction={() => setCategory('')}
          />
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={visibleItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}