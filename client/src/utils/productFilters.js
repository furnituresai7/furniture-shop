export const DEFAULT_SORT = 'newest'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

// Discounted price when a valid discount exists, otherwise the normal price
function getEffectivePrice(product) {
  return product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price
}

// Filters by search text and category, then sorts.
// Later this logic moves to the backend (GET /api/products) with the same parameters.
export function filterAndSortProducts(
  products,
  { search = '', category = '', sort = DEFAULT_SORT },
) {
  const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean)

  const filtered = products.filter((product) => {
    const matchesCategory = !category || product.categorySlug === category

    // Every search word must match the name, category or material
    const haystack = [product.name, product.category, product.material]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    const matchesSearch = terms.every((term) => haystack.includes(term))

    return matchesCategory && matchesSearch
  })

  const sorted = [...filtered]

  switch (sort) {
    case 'price-asc':
      sorted.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
      break
    case 'price-desc':
      sorted.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a))
      break
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return sorted
}