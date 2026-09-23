const API_URL = import.meta.env.VITE_API_URL

// Thin wrapper around fetch for the backend API.
// Throws an Error with a readable message on any non-2xx response.
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // sends the auth cookie when logged in
    ...options,
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`)
  }

  return result
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}