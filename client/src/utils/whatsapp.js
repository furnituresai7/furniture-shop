import siteConfig from '../config/siteConfig'

// Ready-made enquiry messages
export const WHATSAPP_MESSAGES = {
  general: 'Hello, I would like to know more about your furniture collection.',
  custom:
    'Hello, I am interested in customized furniture. I would like to discuss my requirements.',
  product: (productName) =>
    `Hello, I am interested in ${productName}. Please provide more details.`,
}

// Builds a wa.me link with a pre-filled message
export function getWhatsAppLink(message = WHATSAPP_MESSAGES.general) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '')
  const text = encodeURIComponent(message)

  return number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`
}