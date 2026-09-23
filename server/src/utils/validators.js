const PHONE_PATTERN = /^[6-9]\d{9}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// "+91 98765-43210" -> "9876543210"
export function normalizePhone(value = '') {
  let digits = String(value).replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export function validateEnquiryInput({ name, phone, email, message }) {
  const errors = []

  const trimmedName = (name || '').trim()
  if (!trimmedName) errors.push('Name is required')
  else if (trimmedName.length < 2 || trimmedName.length > 60)
    errors.push('Name must be 2-60 characters')

  const normalizedPhone = normalizePhone(phone)
  if (!PHONE_PATTERN.test(normalizedPhone)) {
    errors.push('A valid 10-digit mobile number is required')
  }

  const trimmedEmail = (email || '').trim()
  if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
    errors.push('Email format is invalid')
  }

  const trimmedMessage = (message || '').trim()
  if (!trimmedMessage) errors.push('Message is required')
  else if (trimmedMessage.length < 10 || trimmedMessage.length > 1000)
    errors.push('Message must be 10-1000 characters')

  return {
    isValid: errors.length === 0,
    errors,
    normalized: { name: trimmedName, phone: normalizedPhone, email: trimmedEmail, message: trimmedMessage },
  }
}