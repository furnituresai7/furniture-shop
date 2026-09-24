import { Handshake, IndianRupee, Ruler, ShieldCheck } from 'lucide-react'

// Home page text. Replace with client-approved content before launch.
export const homeContent = {
  hero: {
    title: 'Furniture That Makes Your House Feel Like Home',
    subtitle:
      'Stylish, comfortable and durable furniture for every room of your home.',
    slides: [
      { image: '/images/hero.jpg', alt: 'Living room furnished with a sofa and wooden furniture' },
      { image: '/images/hero-2.jpg', alt: 'Bedroom with a solid wood bed' },
      { image: '/images/hero-3.jpg', alt: 'Dining area with a wooden table set' },
    ],
  },

  // Hidden while empty. Add real numbers supplied by the client, for example:
  // { value: '10+', label: 'Years of Experience' }
  stats: [],

  // Placeholder copy. Only keep points the client can genuinely stand behind.
  whyChooseUs: [
    {
      icon: ShieldCheck,
      title: 'Quality Materials',
      text: 'Carefully selected materials for furniture that lasts.',
    },
    {
      icon: Ruler,
      title: 'Custom Designs',
      text: 'Furniture made to suit your space and your taste.',
    },
    {
      icon: IndianRupee,
      title: 'Affordable Pricing',
      text: 'Honest prices with good value for your money.',
    },
    {
      icon: Handshake,
      title: 'Trusted Service',
      text: 'Friendly and reliable support before and after purchase.',
    },
  ],

  cta: {
    title: 'Looking for furniture for your home?',
    text: 'Tell us what you need and we will help you find the right pieces.',
  },
}