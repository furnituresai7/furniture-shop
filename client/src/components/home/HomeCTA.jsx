import { MessageCircle } from 'lucide-react'
import { homeContent } from '../../data/homeContent'
import { getWhatsAppLink } from '../../utils/whatsapp'
import Button from '../common/Button'

export default function HomeCTA() {
  const { title, text } = homeContent.cta

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
      <div className="rounded-2xl bg-sand px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{text}</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
          <Button
            href={getWhatsAppLink()}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp Us
          </Button>
        </div>
      </div>
    </section>
  )
}