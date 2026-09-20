import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../../utils/whatsapp'

// Always-visible WhatsApp button, especially useful on phones
export default function FloatingWhatsApp() {
  return (
    <a href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-colors hover:bg-whatsapp-dark sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  )
}