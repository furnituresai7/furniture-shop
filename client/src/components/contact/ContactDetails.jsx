import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '../../config/siteConfig'
import { getEmailLink, getPhoneLink } from '../../utils/contactLinks'
import { getWhatsAppLink } from '../../utils/whatsapp'
import Button from '../common/Button'

const linkClass = 'hover:text-wood hover:underline'

function DetailItem({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-wood">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="mt-0.5 whitespace-pre-line break-words text-ink">
          {children}
        </div>
      </div>
    </li>
  )
}

export default function ContactDetails() {
  return (
    <section aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading" className="mb-4 text-2xl font-bold">
        Contact Information
      </h2>

      <ul className="space-y-5 rounded-xl border border-sand-dark bg-white p-6">
        <DetailItem icon={MapPin} label="Visit our store">
          {siteConfig.address}
        </DetailItem>

        <DetailItem icon={Phone} label="Call us">
          <a href={getPhoneLink(siteConfig.phone)} className={linkClass}>
            {siteConfig.phone}
          </a>
        </DetailItem>

        <DetailItem icon={MessageCircle} label="WhatsApp">
          <a href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Chat with us on WhatsApp
          </a>
        </DetailItem>

        <DetailItem icon={Mail} label="Email us">
          <a href={getEmailLink(siteConfig.email)} className={linkClass}>
            {siteConfig.email}
          </a>
        </DetailItem>

        <DetailItem icon={Clock} label="Business hours">
          {siteConfig.businessHours}
        </DetailItem>
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href={getPhoneLink(siteConfig.phone)} className="sm:flex-1">
          <Phone size={18} aria-hidden="true" />
          Call
        </Button>
        <Button
          href={getWhatsAppLink()}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:flex-1"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </Button>
        <Button
          href={getEmailLink(siteConfig.email)}
          variant="outline"
          className="sm:flex-1"
        >
          <Mail size={18} aria-hidden="true" />
          Email
        </Button>
      </div>
    </section>
  )
}