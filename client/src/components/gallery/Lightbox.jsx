import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import SafeImage from '../common/SafeImage'

const SWIPE_DISTANCE = 50

// Full-screen image viewer built on the native <dialog> element
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const touchStartX = useRef(null)

  const item = items[index]
  const hasMultiple = items.length > 1

  const showPrevious = () => onNavigate((index - 1 + items.length) % items.length)
  const showNext = () => onNavigate((index + 1) % items.length)

  // Open as a modal (the browser handles focus trapping and the Escape key)
  // and stop the page behind from scrolling
  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement

    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  if (!item) return null

  const handleKeyDown = (event) => {
    if (!hasMultiple) return
    if (event.key === 'ArrowLeft') showPrevious()
    if (event.key === 'ArrowRight') showNext()
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || !hasMultiple) return

    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (distance > SWIPE_DISTANCE) showPrevious()
    if (distance < -SWIPE_DISTANCE) showNext()
  }

  // Clicking the dark area around the image closes the viewer
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  const arrowButtonClass =
    'absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-wood shadow hover:bg-white'

  return (
    <dialog
      ref={dialogRef}
      aria-label={item.caption || 'Gallery image'}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-black/90"
    >
      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4"
        onClick={handleBackdropClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-wood shadow hover:bg-white"
        >
          <X size={22} aria-hidden="true" />
        </button>

        <SafeImage
          src={item.src}
          alt={item.caption}
          loading="eager"
          className="aspect-[4/3] max-h-[70vh] w-full max-w-3xl rounded-lg object-contain"
        />

        <p className="text-center text-sm">
          {item.caption && <span className="block font-medium">{item.caption}</span>}
          <span className="text-white/70">
            {index + 1} / {items.length}
          </span>
        </p>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className={`${arrowButtonClass} left-2`}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className={`${arrowButtonClass} right-2`}
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}