import { apiClient } from './apiClient'

export function createCategory(data) {
  return apiClient.post('/categories', data)
}

export function updateCategory(id, data) {
  return apiClient.put(`/categories/${id}`, data)
}

export function deleteCategory(id) {
  return apiClient.delete(`/categories/${id}`)
}