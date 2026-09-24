import { apiClient } from './apiClient'

export function createGalleryItem(data) {
  return apiClient.post('/gallery', data)
}

export function deleteGalleryItem(id) {
  return apiClient.delete(`/gallery/${id}`)
}