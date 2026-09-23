import { apiClient } from './apiClient'

export function getCategories() {
  return apiClient.get('/categories')
}

export function getCategoryBySlug(slug) {
  return apiClient.get(`/categories/${slug}`)
}