import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Section title with an optional subtitle and "view all" link
export default function SectionHeading({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-muted">{subtitle}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 text-sm font-medium text-wood hover:text-wood-light"
        >
          {linkLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}