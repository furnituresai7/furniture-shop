const API_URL = import.meta.env.VITE_API_URL

// Uses raw fetch (not apiClient) because file uploads need FormData,
// not the JSON body apiClient always sends.
export async function uploadImage(file, folder) {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('folder', folder)

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.message || 'Upload failed')
  return result.data // { url, publicId }
}

export async function deleteImage(publicId) {
  const response = await fetch(`${API_URL}/upload`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId }),
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.message || 'Delete failed')
  return result
}