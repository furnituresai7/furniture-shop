// Demo data for development only.
// It will be replaced by real data from the API (MongoDB) in the backend phase.

export const demoCategories = [
  { name: 'Sofa', slug: 'sofa', image: '/images/categories/sofa.jpg' },
  { name: 'Beds', slug: 'beds', image: '/images/categories/beds.jpg' },
  { name: 'Dining', slug: 'dining', image: '/images/categories/dining.jpg' },
  { name: 'Chairs', slug: 'chairs', image: '/images/categories/chairs.jpg' },
  { name: 'Wardrobes', slug: 'wardrobes', image: '/images/categories/wardrobes.jpg' },
  { name: 'Tables', slug: 'tables', image: '/images/categories/tables.jpg' },
  { name: 'TV Units', slug: 'tv-units', image: '/images/categories/tv-units.jpg' },
  {
    name: 'Office Furniture',
    slug: 'office-furniture',
    image: '/images/categories/office-furniture.jpg',
  },
]

export const demoProducts = [
  {
    name: 'Modern L Shape Sofa',
    slug: 'modern-l-shape-sofa',
    category: 'Sofa',
    material: 'Sheesham Wood + Fabric',
    price: 38999,
    discountPrice: 32999,
    image: '/images/products/modern-l-shape-sofa.jpg',
    featured: true,
  },
  {
    name: 'Solid Wood Queen Bed',
    slug: 'solid-wood-queen-bed',
    category: 'Beds',
    material: 'Sheesham Wood',
    price: 28999,
    image: '/images/products/solid-wood-queen-bed.jpg',
    featured: true,
  },
  {
    name: '6 Seater Dining Table Set',
    slug: '6-seater-dining-table-set',
    category: 'Dining',
    material: 'Teak Wood',
    price: 24500,
    image: '/images/products/dining-table-set.jpg',
    featured: true,
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    category: 'Office Furniture',
    material: 'Mesh + Steel',
    price: 8999,
    discountPrice: 7499,
    image: '/images/products/office-chair.jpg',
    featured: true,
  },
  {
    name: 'Wooden Wardrobe',
    slug: 'wooden-wardrobe',
    category: 'Wardrobes',
    material: 'Mango Wood',
    price: 22999,
    image: '/images/products/wooden-wardrobe.jpg',
    featured: false,
  },
  {
    name: 'Center Table',
    slug: 'center-table',
    category: 'Tables',
    material: 'Sheesham Wood',
    price: 7999,
    image: '/images/products/center-table.jpg',
    featured: false,
  },
]