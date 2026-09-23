const API_URL = import.meta.env.VITE_API_URL

// Sends an enquiry to the backend.
export async function submitEnquiry(enquiry) {
  const response = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send enquiry')
  }

  return result
}