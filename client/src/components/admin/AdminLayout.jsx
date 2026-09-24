import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

// Sidebar is always visible from 1024px up; below that it's a slide-out drawer.
export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-sand/40">
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-sand-dark bg-white px-4 py-3 lg:hidden">
        <p className="font-heading text-lg font-bold text-wood">Admin Panel</p>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-wood hover:bg-sand"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar />
          </div>
        </aside>

        {/* Mobile drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative h-full w-64">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 rounded-lg bg-wood-light/40 p-1.5 text-cream"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}