import { Outlet } from 'react-router-dom'
import FloatingWhatsApp from '../common/FloatingWhatsApp'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

// Shared frame for every page: Navbar on top, Footer at the bottom.
// Each page renders its own <main> inside <Outlet />.
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}