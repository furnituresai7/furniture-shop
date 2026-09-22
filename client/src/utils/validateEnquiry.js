const PHONE_PATTERN = /^[6-9]\d{9}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// "+91 98765-43210" -> "9876543210"
export function normalizePhone(value) {
  let digits = value.replace(/\D/g, '')

  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)

  return digits
}

// Returns an object of error messages keyed by field name. Empty object = valid.
export function validateEnquiry({ name, phone, email, message }) {
  const errors = {}

  const trimmedName = name.trim()
  if (!trimmedName) {
    errors.name = 'Please enter your name.'
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (trimmedName.length > 60) {
    errors.name = 'Name must be 60 characters or fewer.'
  }

  if (!phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!PHONE_PATTERN.test(normalizePhone(phone))) {
    errors.phone = 'Please enter a valid 10-digit mobile number.'
  }

  // Email is optional, but must be valid when provided
  if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  const trimmedMessage = message.trim()
  if (!trimmedMessage) {
    errors.message = 'Please tell us how we can help.'
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please write at least 10 characters.'
  } else if (trimmedMessage.length > 1000) {
    errors.message = 'Message must be 1000 characters or fewer.'
  }

  return errors
}