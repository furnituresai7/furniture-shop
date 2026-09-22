import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import About from '../pages/About'
import CategoryDetails from '../pages/CategoryDetails'
import Categories from '../pages/Categories'
import Contact from '../pages/Contact'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProductDetails from '../pages/ProductDetails'
import Products from '../pages/Products'
import StyleGuide from '../pages/StyleGuide'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}