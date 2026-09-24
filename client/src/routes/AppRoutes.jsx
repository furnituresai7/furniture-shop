import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedRoute from '../components/admin/ProtectedRoute'
import Layout from '../components/layout/Layout'
import About from '../pages/About'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminPlaceholder from '../pages/admin/AdminPlaceholder'
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
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminPlaceholder title="Products" />} />
          <Route path="/admin/categories" element={<AdminPlaceholder title="Categories" />} />
          <Route path="/admin/gallery" element={<AdminPlaceholder title="Gallery" />} />
          <Route path="/admin/enquiries" element={<AdminPlaceholder title="Enquiries" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}