import { ChevronLeft, ChevronRight } from 'lucide-react'

// Example: page 5 of 10 -> [1, '...', 4, 5, 6, '...', 10]
function getPageNumbers(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const visible = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)

  const result = []
  visible.forEach((page, index) => {
    if (index > 0 && page - visible[index - 1] > 1) {
      result.push('...')
    }
    result.push(page)
  })

  return result
}

const buttonBase =
  'inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors'

const buttonIdle = 'border-sand-dark bg-white text-wood hover:bg-sand'

const buttonDisabled = 'disabled:cursor-not-allowed disabled:opacity-50'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${buttonBase} ${buttonIdle} ${buttonDisabled}`}
      >
        <ChevronLeft size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Phones: compact text. Larger screens: numbered buttons. */}
      <span className="px-2 text-sm text-muted sm:hidden">
        Page {page} of {totalPages}
      </span>

      <ul className="hidden items-center gap-2 sm:flex">
        {pages.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === '...' ? (
              <span className="px-1 text-muted">...</span>
            ) : (
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                className={`${buttonBase} ${
                  item === page
                    ? 'border-wood bg-wood text-cream'
                    : buttonIdle
                }`}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${buttonBase} ${buttonIdle} ${buttonDisabled}`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  )
}