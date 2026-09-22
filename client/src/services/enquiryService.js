// Sends an enquiry to the backend.
// TEMPORARY MOCK: it always succeeds after a short delay.
// In the backend phase this will POST the data to /api/enquiries.
export async function submitEnquiry(enquiry) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return { success: true, data: enquiry }
}