import { Route, Routes } from 'react-router-dom'
import PlaceholderPage from '../components/common/PlaceholderPage'
import Layout from '../components/layout/Layout'
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
        <Route path="/categories" element={<PlaceholderPage title="Categories" />} />
        <Route
          path="/categories/:slug"
          element={<PlaceholderPage title="Category" />}
        />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}