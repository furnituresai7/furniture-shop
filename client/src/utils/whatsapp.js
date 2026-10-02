import siteConfig from '../config/siteConfig'

// Ready-made enquiry messages
export const WHATSAPP_MESSAGES = {
  general: 'Hello, I would like to know more about your furniture collection.',
  custom:
    'Hello, I am interested in customized furniture. I would like to discuss my requirements.',
  product: (productName) =>
    `Hello, I am interested in ${productName}. Please provide more details.`,
}

// Builds a wa.me link to the shop's own WhatsApp number (customer-facing buttons)
export function getWhatsAppLink(message = WHATSAPP_MESSAGES.general) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '')
  const text = encodeURIComponent(message)

  return number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`
}

// Builds a wa.me link to ANY phone number (e.g. a customer's number from an
// enquiry). Used by the admin panel to reply to a specific customer.
export function getWhatsAppLinkTo(phoneNumber, message = '') {
  const digits = (phoneNumber || '').replace(/\D/g, '')
  const text = encodeURIComponent(message)

  return digits
    ? `https://wa.me/${digits}?text=${text}`
    : `https://wa.me/?text=${text}`
}