// "+91 98765 43210" -> "tel:+919876543210"
export function getPhoneLink(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function getEmailLink(email) {
  return `mailto:${email}`
}