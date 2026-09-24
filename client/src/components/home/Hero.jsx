import { MessageCircle } from 'lucide-react'
import { homeContent } from '../../data/homeContent'
import { getWhatsAppLink } from '../../utils/whatsapp'
import Button from '../common/Button'
import HeroCarousel from './HeroCarousel'

export default function Hero() {
  const { title, subtitle, slides } = homeContent.hero

  return (
    <section className="bg-sand/60">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-lg text-lg text-muted">{subtitle}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" size="lg">
              Explore Products
            </Button>
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        <HeroCarousel slides={slides} />
      </div>
    </section>
  )
}