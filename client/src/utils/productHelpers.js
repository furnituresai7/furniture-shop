export const AVAILABILITY = {
  in_stock: { label: 'In Stock', className: 'bg-green-100 text-green-800' },
  made_to_order: { label: 'Made to Order', className: 'bg-amber-100 text-amber-900' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-800' },
}

// Works out which price to show and the discount percentage
export function getPriceInfo(product) {
  const hasDiscount = Boolean(
    product.discountPrice && product.discountPrice < product.price,
  )

  return {
    hasDiscount,
    currentPrice: hasDiscount ? product.discountPrice : product.price,
    originalPrice: product.price,
    discountPercent: hasDiscount
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0,
  }
}

// Gallery images, falling back to the single cover image
export function getProductImages(product) {
  if (product.images?.length) return product.images
  return product.image ? [product.image] : []
}

// Same-category products first, then others to fill the list
export function getRelatedProducts(product, allProducts, limit = 4) {
  const others = allProducts.filter((item) => item.slug !== product.slug)
  const sameCategory = others.filter(
    (item) => item.categorySlug === product.categorySlug,
  )
  const different = others.filter(
    (item) => item.categorySlug !== product.categorySlug,
  )

  return [...sameCategory, ...different].slice(0, limit)
}