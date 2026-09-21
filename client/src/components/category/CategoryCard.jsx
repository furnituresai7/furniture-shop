import { Link } from 'react-router-dom'
import { formatProductCount } from '../../utils/categoryHelpers'
import SafeImage from '../common/SafeImage'

export default function CategoryCard({ category, productCount }) {
  const { name, slug, image } = category

  return (
    <Link
      to={`/categories/${slug}`}
      className="group block overflow-hidden rounded-xl border border-sand-dark bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <SafeImage
        src={image}
        alt={name}
        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-3 text-center">
        <h3 className="text-base font-semibold">{name}</h3>
        {typeof productCount === 'number' && (
          <p className="mt-0.5 text-sm text-muted">
            {formatProductCount(productCount)}
          </p>
        )}
      </div>
    </Link>
  )
}