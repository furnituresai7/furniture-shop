import { apiClient } from './apiClient'

export function getGalleryItems(category = '') {
  return apiClient.get(`/gallery${category ? `?category=${category}` : ''}`)
}