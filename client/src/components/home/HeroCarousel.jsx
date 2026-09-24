import { useEffect, useRef, useState } from 'react'
import SafeImage from '../common/SafeImage'

const AUTOPLAY_MS = 4000
const SWIPE_DISTANCE = 50

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)
  const timerRef = useRef(null)

  const total = slides.length

  const goTo = (nextIndex) => setIndex((nextIndex + total) % total)
  const next = () => goTo(index + 1)
  const previous = () => goTo(index - 1)

  const stopAutoplay = () => clearInterval(timerRef.current)

  useEffect(() => {
    if (total <= 1) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return undefined

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, AUTOPLAY_MS)

    return stopAutoplay
  }, [total])

  const handleTouchStart = (event) => {
    stopAutoplay()
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (distance > SWIPE_DISTANCE) previous()
    if (distance < -SWIPE_DISTANCE) next()
  }

  if (total === 0) return null

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slide.image} className="h-full w-full shrink-0">
            <SafeImage
              src={slide.image}
              alt={slide.alt}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => {
                stopAutoplay()
                goTo(dotIndex)
              }}
              aria-label={`Show slide ${dotIndex + 1} of ${total}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              className={`h-2 rounded-full bg-white transition-all ${
                dotIndex === index ? 'w-6 opacity-100' : 'w-2 opacity-60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}