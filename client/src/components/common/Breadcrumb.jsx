import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// items: [{ label, to }]. The last item is the current page and has no link.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className="hover:text-wood">
                    {item.label}
                  </Link>
                  <ChevronRight size={14} aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}