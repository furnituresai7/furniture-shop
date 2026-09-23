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

// Gallery image URLs, from the API's { url, publicId } objects
export function getProductImages(product) {
  return (product.images || []).map((image) => image.url).filter(Boolean)
}

// Cover image for cards: first gallery image
export function getProductCoverImage(product) {
  return product.images?.[0]?.url || ''
}

// The API populates "category" as { _id, name, slug }; this reads it safely
export function getCategoryName(product) {
  return product.category?.name || ''
}

export function getCategorySlug(product) {
  return product.category?.slug || ''
}