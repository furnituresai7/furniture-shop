import { connectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { slugify } from '../utils/slugify.js'
import mongoose from 'mongoose'

// Same categories and products as client/src/data/demoData.js,
// so the API returns exactly what the frontend has been showing.
const categories = [
  { name: 'Sofa', image: { url: '/images/categories/sofa.jpg', publicId: '' } },
  { name: 'Beds', image: { url: '/images/categories/beds.jpg', publicId: '' } },
  { name: 'Dining', image: { url: '/images/categories/dining.jpg', publicId: '' } },
  { name: 'Chairs', image: { url: '/images/categories/chairs.jpg', publicId: '' } },
  { name: 'Wardrobes', image: { url: '/images/categories/wardrobes.jpg', publicId: '' } },
  { name: 'Tables', image: { url: '/images/categories/tables.jpg', publicId: '' } },
  { name: 'TV Units', image: { url: '/images/categories/tv-units.jpg', publicId: '' } },
  { name: 'Office Furniture', image: { url: '/images/categories/office-furniture.jpg', publicId: '' } },
]

// categorySlug links each product to a category above at seed time
const products = [
  { name: 'Modern L Shape Sofa', categorySlug: 'sofa', material: 'Sheesham Wood + Fabric', color: 'Grey', dimensions: '96 x 60 x 32 in', capacity: '5 Seater', availability: 'in_stock', warranty: '2 Years', description: 'A stylish L shape sofa with a solid wood frame and high-density foam cushions, designed for comfortable everyday seating.', price: 38999, discountPrice: 32999, images: [{ url: '/images/products/modern-l-shape-sofa.jpg', publicId: '' }], featured: true },
  { name: 'Solid Wood Queen Bed', categorySlug: 'beds', material: 'Sheesham Wood', color: 'Walnut Brown', dimensions: '84 x 64 x 40 in', capacity: 'Queen Size', availability: 'in_stock', warranty: '1 Year', description: 'A sturdy queen size bed with a solid wood frame and a classic headboard, built for long-lasting use.', price: 28999, images: [{ url: '/images/products/solid-wood-queen-bed.jpg', publicId: '' }], featured: true },
  { name: '6 Seater Dining Table Set', categorySlug: 'dining', material: 'Teak Wood', color: 'Natural Teak', dimensions: '72 x 36 x 30 in (table)', capacity: '6 Seater', availability: 'in_stock', warranty: '2 Years', description: 'A spacious dining table with six matching chairs, ideal for family meals and gatherings.', price: 24500, images: [{ url: '/images/products/dining-table-set.jpg', publicId: '' }], featured: true },
  { name: 'Ergonomic Office Chair', categorySlug: 'office-furniture', material: 'Mesh + Steel', color: 'Black', dimensions: '26 x 26 x 44 in', availability: 'in_stock', warranty: '1 Year', description: 'A breathable mesh chair with adjustable height and back support for long working hours.', price: 8999, discountPrice: 7499, images: [{ url: '/images/products/office-chair.jpg', publicId: '' }], featured: true },
  { name: 'Wooden Wardrobe', categorySlug: 'wardrobes', material: 'Mango Wood', color: 'Honey Oak', dimensions: '72 x 21 x 78 in', capacity: '3 Door', availability: 'in_stock', warranty: '1 Year', description: 'A roomy three door wardrobe with hanging space and shelves for well organised storage.', price: 22999, images: [{ url: '/images/products/wooden-wardrobe.jpg', publicId: '' }], featured: false },
  { name: 'Center Table', categorySlug: 'tables', material: 'Sheesham Wood', color: 'Walnut Brown', dimensions: '40 x 24 x 17 in', availability: 'in_stock', description: 'A compact center table with a smooth finish that suits most living rooms.', price: 7999, images: [{ url: '/images/products/center-table.jpg', publicId: '' }], featured: false },
  { name: 'Classic 3 Seater Sofa', categorySlug: 'sofa', material: 'Teak Wood + Fabric', color: 'Beige', dimensions: '78 x 34 x 34 in', capacity: '3 Seater', availability: 'in_stock', warranty: '2 Years', description: 'A timeless three seater sofa with soft cushioning and a strong teak wood frame.', price: 27999, discountPrice: 24999, images: [{ url: '/images/products/classic-3-seater-sofa.jpg', publicId: '' }], featured: false },
  { name: 'King Size Storage Bed', categorySlug: 'beds', material: 'Sheesham Wood', color: 'Walnut Brown', dimensions: '84 x 72 x 40 in', capacity: 'King Size', availability: 'made_to_order', warranty: '1 Year', description: 'A king size bed with a spacious storage box below the mattress for bedding and extras.', price: 34999, images: [{ url: '/images/products/king-size-storage-bed.jpg', publicId: '' }], featured: false },
  { name: 'Cushioned Recliner Chair', categorySlug: 'chairs', material: 'Wood + Leatherette', color: 'Brown', dimensions: '34 x 36 x 40 in', capacity: '1 Seater', availability: 'in_stock', warranty: '1 Year', description: 'A comfortable recliner with soft padding and a smooth reclining action.', price: 15999, images: [{ url: '/images/products/cushioned-recliner-chair.jpg', publicId: '' }], featured: false },
  { name: 'Wooden Study Table', categorySlug: 'tables', material: 'Mango Wood', color: 'Natural', dimensions: '48 x 24 x 30 in', availability: 'in_stock', description: 'A simple and sturdy study table with a wide top and a storage drawer.', price: 9499, images: [{ url: '/images/products/wooden-study-table.jpg', publicId: '' }], featured: false },
  { name: 'Modern TV Unit', categorySlug: 'tv-units', material: 'Engineered Wood', color: 'White + Oak', dimensions: '60 x 16 x 20 in', availability: 'in_stock', warranty: '1 Year', description: 'A clean and modern TV unit with open shelves and closed storage for media devices.', price: 12999, discountPrice: 10999, images: [{ url: '/images/products/modern-tv-unit.jpg', publicId: '' }], featured: false },
  { name: 'Sliding Door Wardrobe', categorySlug: 'wardrobes', material: 'Engineered Wood', color: 'Grey', dimensions: '72 x 24 x 84 in', capacity: '2 Door', availability: 'made_to_order', warranty: '1 Year', description: 'A space saving wardrobe with smooth sliding doors, suited for compact bedrooms.', price: 31999, images: [{ url: '/images/products/sliding-door-wardrobe.jpg', publicId: '' }], featured: false },
  { name: '4 Seater Dining Set', categorySlug: 'dining', material: 'Sheesham Wood', color: 'Walnut Brown', dimensions: '48 x 30 x 30 in (table)', capacity: '4 Seater', availability: 'in_stock', warranty: '1 Year', description: 'A compact four seater dining set that fits neatly into smaller dining areas.', price: 18999, images: [{ url: '/images/products/4-seater-dining-set.jpg', publicId: '' }], featured: false },
  { name: 'Executive Office Desk', categorySlug: 'office-furniture', material: 'Teak Wood', color: 'Teak Brown', dimensions: '60 x 30 x 30 in', availability: 'out_of_stock', warranty: '1 Year', description: 'A large executive desk with drawers and a cable slot, made for a professional workspace.', price: 21999, images: [{ url: '/images/products/executive-office-desk.jpg', publicId: '' }], featured: false },
  { name: 'Upholstered Accent Chair', categorySlug: 'chairs', material: 'Wood + Fabric', color: 'Mustard', dimensions: '28 x 30 x 33 in', capacity: '1 Seater', availability: 'in_stock', description: 'A stylish accent chair that adds a pop of colour to a living room or bedroom corner.', price: 6499, discountPrice: 5499, images: [{ url: '/images/products/upholstered-accent-chair.jpg', publicId: '' }], featured: false },
]

async function seed() {
  await connectDB()

  console.log('Clearing existing products and categories...')
  await Product.deleteMany({})
  await Category.deleteMany({})

  console.log('Inserting categories...')
  const createdCategories = await Category.insertMany(
    categories.map((category, index) => ({
      ...category,
      slug: slugify(category.name),
      order: index,
    })),
  )

  const categoryIdBySlug = Object.fromEntries(
    createdCategories.map((category) => [category.slug, category._id]),
  )

  console.log('Inserting products...')
  await Product.insertMany(
    products.map(({ categorySlug, ...product }) => ({
      ...product,
      slug: slugify(product.name),
      category: categoryIdBySlug[categorySlug],
    })),
  )

  console.log(`Seeded ${createdCategories.length} categories and ${products.length} products.`)
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})