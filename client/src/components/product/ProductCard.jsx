import { formatPrice } from '../../utils/formatPrice'
import {
  getCategoryName,
  getPriceInfo,
  getProductCoverImage,
} from '../../utils/productHelpers'
import Button from '../common/Button'
import SafeImage from '../common/SafeImage'

export default function ProductCard({ product }) {
  const { name, slug } = product
  const { currentPrice, originalPrice, hasDiscount, discountPercent } =
    getPriceInfo(product)

  return (
    <article className="overflow-hidden rounded-xl border border-sand-dark bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-sand">
        <SafeImage
          src={getProductCoverImage(product)}
          alt={name}
          className="h-full w-full object-cover"
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-muted">
          {getCategoryName(product)}
        </p>
        <h3 className="mt-1 text-lg font-semibold">{name}</h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-wood">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <Button href={`/products/${slug}`} className="mt-4 w-full">
          View Details
        </Button>
      </div>
    </article>
  )
}