import { apiClient } from './apiClient'

export function createProduct(data) {
  return apiClient.post('/products', data)
}

export function updateProduct(id, data) {
  return apiClient.put(`/products/${id}`, data)
}

export function deleteProduct(id) {
  return apiClient.delete(`/products/${id}`)
}