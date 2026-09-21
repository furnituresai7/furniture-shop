import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MessageCircle, Menu, Search, X } from 'lucide-react'
import siteConfig from '../../config/siteConfig'
import { getWhatsAppLink } from '../../utils/whatsapp'
import Button from '../common/Button'

const desktopLinkClass = ({ isActive }) =>
  `border-b-2 py-1 text-sm font-medium transition-colors ${
    isActive
      ? 'border-accent text-wood'
      : 'border-transparent text-muted hover:text-wood'
  }`

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-3 text-base font-medium ${
    isActive ? 'bg-sand text-wood' : 'text-ink hover:bg-sand'
  }`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-sand-dark bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="max-w-[55%] truncate font-heading text-xl font-bold text-wood sm:max-w-none sm:text-2xl"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop navigation (1024px and above) */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={desktopLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/products"
            aria-label="Search products"
            className="rounded-lg p-2 text-wood hover:bg-sand"
          >
            <Search size={20} aria-hidden="true" />
          </Link>

          {/* The wrapper is hidden below 1024px (the mobile menu has its own WhatsApp button) */}
          <div className="hidden lg:block">
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp Us
            </Button>
          </div>

          {/* Hamburger button (below 1024px) */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-wood hover:bg-sand lg:hidden"
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-sand-dark bg-cream px-4 pb-4 pt-2 shadow-lg lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Button
            href={getWhatsAppLink()}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp Us
          </Button>
        </div>
      )}
    </header>
  )
}