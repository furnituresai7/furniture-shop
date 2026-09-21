// Number of products in a category
export function getProductCount(products, categorySlug) {
  return products.filter((product) => product.categorySlug === categorySlug).length
}

// 1 -> "1 product", 8 -> "8 products"
export function formatProductCount(count) {
  return `${count} ${count === 1 ? 'product' : 'products'}`
}