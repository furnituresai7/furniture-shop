import { Link, useParams } from 'react-router-dom'
import { ChevronRight, MessageCircle, Phone } from 'lucide-react'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'
import SectionHeading from '../components/common/SectionHeading'
import Spinner from '../components/common/Spinner'
import AvailabilityBadge from '../components/product/AvailabilityBadge'
import ProductCard from '../components/product/ProductCard'
import ProductGallery from '../components/product/ProductGallery'
import ProductSpecs from '../components/product/ProductSpecs'
import siteConfig from '../config/siteConfig'
import { useFetch } from '../hooks/useFetch'
import { getProductBySlug, getRelatedProducts } from '../services/productService'
import { getPhoneLink } from '../utils/contactLinks'
import { formatPrice } from '../utils/formatPrice'
import {
  getCategoryName,
  getCategorySlug,
  getPriceInfo,
  getProductImages,
} from '../utils/productHelpers'
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp'

export default function ProductDetails() {
  const { slug } = useParams()

  const productFetch = useFetch(() => getProductBySlug(slug), [slug])
  const relatedFetch = useFetch(
    () => (productFetch.data ? getRelatedProducts(slug) : Promise.resolve({ data: [] })),
    [slug, productFetch.data],
  )

  if (productFetch.isLoading) return <Spinner label="Loading product" />

  if (productFetch.error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20">
        <ErrorMessage message={productFetch.error} />
      </main>
    )
  }

  const product = productFetch.data

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl">Product not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          This product may have been removed or the link may be incorrect.
        </p>
        <Button href="/products" size="lg" className="mt-8">
          Browse all products
        </Button>
      </main>
    )
  }

  const { name, description } = product
  const category = getCategoryName(product)
  const categorySlug = getCategorySlug(product)
  const { currentPrice, originalPrice, hasDiscount, discountPercent } =
    getPriceInfo(product)
  const relatedProducts = relatedFetch.data || []
  const whatsappLink = getWhatsAppLink(WHATSAPP_MESSAGES.product(name))

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-wood">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li>
            <Link to="/products" className="hover:text-wood">Products</Link>
          </li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li>
            <Link to={`/products?category=${categorySlug}`} className="hover:text-wood">
              {category}
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li aria-current="page" className="text-ink">{name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery key={product.slug} images={getProductImages(product)} name={name} />

        <div>
          <p className="text-sm uppercase tracking-wide text-muted">{category}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{name}</h1>

          <div className="mt-3">
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-wood">{formatPrice(currentPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink} variant="whatsapp" size="lg" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Enquire on WhatsApp
            </Button>
            <Button href={getPhoneLink(siteConfig.phone)} variant="outline" size="lg">
              <Phone size={18} aria-hidden="true" />
              Call Now
            </Button>
          </div>

          {description && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
            </section>
          )}

          <section className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">Specifications</h2>
            <ProductSpecs product={product} />
          </section>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14 border-t border-sand-dark pt-10">
          <SectionHeading title="Related Products" linkTo="/products" linkLabel="View all products" />
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}