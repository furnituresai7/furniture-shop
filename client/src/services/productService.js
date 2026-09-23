import { apiClient } from './apiClient'

export function getProducts(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, value]) => value)),
  ).toString()

  return apiClient.get(`/products${query ? `?${query}` : ''}`)
}

export function getProductBySlug(slug) {
  return apiClient.get(`/products/slug/${slug}`)
}

export function getRelatedProducts(slug) {
  return apiClient.get(`/products/slug/${slug}/related`)
}