import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// Simple modal built on the native <dialog> element (handles focus + Escape)
export default function Modal({ title, onClose, children, maxWidth = 'max-w-lg' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/50"
    >
      <div
        onClick={handleBackdropClick}
        className="flex h-full w-full items-center justify-center p-4"
      >
        <div className={`w-full ${maxWidth} rounded-xl bg-white shadow-lg`}>
          <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-muted hover:bg-sand hover:text-wood"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="max-h-[75vh] overflow-y-auto px-5 py-5">{children}</div>
        </div>
      </div>
    </dialog>
  )
}