import { apiClient } from './apiClient'

export function getEnquiries(status = '') {
  return apiClient.get(`/enquiries${status ? `?status=${status}` : ''}`)
}

export function updateEnquiryStatus(id, status) {
  return apiClient.patch(`/enquiries/${id}`, { status })
}