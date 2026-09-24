import { apiClient } from './apiClient'

export function login(email, password) {
  return apiClient.post('/auth/login', { email, password })
}

export function logout() {
  return apiClient.post('/auth/logout')
}

export function getMe() {
  return apiClient.get('/auth/me')
}