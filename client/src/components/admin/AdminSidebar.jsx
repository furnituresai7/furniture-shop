import { NavLink } from 'react-router-dom'
import {
  Images,
  LayoutDashboard,
  ListTree,
  LogOut,
  MessageSquare,
  Package,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: ListTree },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-wood text-cream' : 'text-sand hover:bg-wood-light/40'
  }`

export default function AdminSidebar({ onNavigate }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full flex-col bg-wood-dark px-3 py-5 text-sand">
      <div className="px-2 pb-5">
        <p className="font-heading text-lg font-bold text-cream">Admin Panel</p>
        {user && <p className="mt-0.5 truncate text-xs text-sand/80">{user.email}</p>}
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onNavigate}
            className={linkClass}
          >
            <link.icon size={18} aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sand hover:bg-wood-light/40"
      >
        <LogOut size={18} aria-hidden="true" />
        Logout
      </button>
    </div>
  )
}