import { useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import SafeImage from '../components/common/SafeImage'
import Seo from '../components/common/Seo'
import Spinner from '../components/common/Spinner'
import Lightbox from '../components/gallery/Lightbox'
import CategoryChips from '../components/product/CategoryChips'
import { galleryCategories } from '../data/galleryData'
import { useFetch } from '../hooks/useFetch'
import { getGalleryItems } from '../services/galleryService'

export default function Gallery() {
  const [category, setCategory] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const galleryFetch = useFetch(() => getGalleryItems(category), [category])
  const items = (galleryFetch.data || []).map((item) => ({
    id: item._id,
    src: item.image?.url,
    caption: item.caption,
    category: item.category,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Seo
        title="Gallery"
        description="A glimpse of our showroom, designs and finished work."
      />

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
        {galleryFetch.isLoading && <Spinner label="Loading gallery" />}

        {!galleryFetch.isLoading && galleryFetch.error && (
          <ErrorMessage message={galleryFetch.error} />
        )}

        {!galleryFetch.isLoading && !galleryFetch.error && (
          items.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {items.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View larger: ${item.caption || 'gallery image'}`}
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
          )
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}