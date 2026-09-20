// Single source of truth for all business information.
// Replace the placeholder values with the client's real details.
const siteConfig = {
  name: '[SHOP_NAME]',
  description: '[SHORT_BUSINESS_DESCRIPTION]',
  phone: '[PHONE]',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  email: '[EMAIL]',
  address: '[SHOP_ADDRESS]',
  businessHours: '[BUSINESS_HOURS]',
  mapsUrl: '[GOOGLE_MAPS_URL]',

  // Leave empty to hide the link in the footer
  social: {
    instagram: '',
    facebook: '',
  },

  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Categories', to: '/categories' },
    { label: 'About', to: '/about' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],

  // Temporary list for the footer; categories will come from the database later
  footerCategories: [
    { label: 'Sofa', slug: 'sofa' },
    { label: 'Beds', slug: 'beds' },
    { label: 'Dining', slug: 'dining' },
    { label: 'Chairs', slug: 'chairs' },
    { label: 'Wardrobes', slug: 'wardrobes' },
    { label: 'Tables', slug: 'tables' },
    { label: 'TV Units', slug: 'tv-units' },
    { label: 'Office Furniture', slug: 'office-furniture' },
  ],
}

export default siteConfig