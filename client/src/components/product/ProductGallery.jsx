import { useState } from 'react'
import SafeImage from '../common/SafeImage'

// Large main image with a thumbnail strip (thumbnails only appear for 2+ images)
export default function ProductGallery({ images = [], name }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <SafeImage
        src={images[activeIndex]}
        alt={name}
        loading="eager"
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`block overflow-hidden rounded-lg border-2 transition-colors ${
                  index === activeIndex
                    ? 'border-wood'
                    : 'border-transparent hover:border-sand-dark'
                }`}
              >
                <SafeImage
                  src={src}
                  alt={`${name} - view ${index + 1}`}
                  fallbackText=""
                  className="h-16 w-20 object-cover sm:h-20 sm:w-24"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}