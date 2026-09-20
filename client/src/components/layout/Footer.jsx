import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '../../config/siteConfig'
import { getWhatsAppLink } from '../../utils/whatsapp'
import { getEmailLink, getPhoneLink } from '../../utils/contactLinks'

const footerLinkClass = 'text-sand transition-colors hover:text-white'

// Reusable footer anchor. External links open in a new tab.
function FooterAnchor({ href, external = false, className = '', children }) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a href={href} className={`${footerLinkClass} ${className}`} {...externalProps}>
      {children}
    </a>
  )
}

export default function Footer() {
  // Only show social links that have a URL in siteConfig
  const socialLinks = [
    { label: 'Instagram', href: siteConfig.social.instagram },
    { label: 'Facebook', href: siteConfig.social.facebook },
  ].filter((item) => item.href)

  return (
    <footer className="bg-wood text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-heading text-2xl font-bold text-cream">
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{siteConfig.description}</p>

          {socialLinks.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <FooterAnchor href={item.href} external>
                    {item.label}
                  </FooterAnchor>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <div>
          <h2 className="text-lg text-cream">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg text-cream">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.footerCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/categories/${category.slug}`}
                  className={footerLinkClass}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg text-cream">Contact Us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>

            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <FooterAnchor href={getPhoneLink(siteConfig.phone)}>
                {siteConfig.phone}
              </FooterAnchor>
            </li>

            <li className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <FooterAnchor href={getWhatsAppLink()} external>
                Chat on WhatsApp
              </FooterAnchor>
            </li>

            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <FooterAnchor href={getEmailLink(siteConfig.email)} className="break-all">
                {siteConfig.email}
              </FooterAnchor>
            </li>

            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{siteConfig.businessHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-wood-light/40 px-4 py-4 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  )
}