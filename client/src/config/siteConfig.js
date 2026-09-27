// Single source of truth for all business information.
const siteConfig = {
  name: 'SAI Furniture',
  description:
    'SAI Furniture is a furniture and interior design business based in Booty More, Ranchi, specializing in quality wooden furniture and customized furniture solutions for homes and spaces.',

  // First number is used for the WhatsApp button (wa.me only supports one number).
  // All three show up as separate Call links wherever contact details are displayed.
  phones: ['+91 9123163379', '+91 9835334165', '+91 9334590525'],
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',

  email: 'saifurnitures911@gmail.com',
  address: 'Booty More, Bariyatu Road, Opp. Kushwaha Complex, Ranchi, Jharkhand - 834012',
  businessHours: 'Every Day: 9:30 AM - 10:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/PcmLwPv79JVW1PLP8',
  mapEmbedUrl: '',

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