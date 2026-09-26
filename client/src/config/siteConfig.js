// Single source of truth for all business information.
const siteConfig = {
  name: 'SAI Furniture',
  description:
    'SAI Furniture is a furniture and interior design business based in Booty More, Ranchi, specializing in quality wooden furniture and customized furniture solutions for homes and spaces.',
  phone: '+91 9123163379',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  email: 'saifurnitures911@gmail.com',
  address: 'Booty More, Bariyatu Road, Opp. Kushwaha Complex, Ranchi, Jharkhand - 834012',
  businessHours: 'Every Day: 9:30 AM - 10:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/PcmLwPv79JVW1PLP8',

  // Left empty on purpose: LocationMap.jsx automatically builds a working
  // map from the address above when this is blank. Add a real embed src
  // here only if the client later shares one from Google Maps > Share > Embed a map.
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

  // Temporary list for the footer; real categories will show once the client
  // adds them through the admin panel.
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