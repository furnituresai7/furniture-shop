import { Link } from 'react-router-dom'
import { Images, ListTree, MessageSquare, Package } from 'lucide-react'
import ErrorMessage from '../../components/common/ErrorMessage'
import Spinner from '../../components/common/Spinner'
import StatCard from '../../components/admin/StatCard'
import { useFetch } from '../../hooks/useFetch'
import { getCategories } from '../../services/categoryService'
import { getEnquiries } from '../../services/enquiryAdminService'
import { getProducts } from '../../services/productService'

const statusStyles = {
  new: 'bg-amber-100 text-amber-900',
  contacted: 'bg-blue-100 text-blue-800',
  closed: 'bg-green-100 text-green-800',
}

export default function AdminDashboard() {
  const productsFetch = useFetch(() => getProducts({ page: 1 }), [])
  const categoriesFetch = useFetch(() => getCategories(), [])
  const enquiriesFetch = useFetch(() => getEnquiries(), [])

  const isLoading =
    productsFetch.isLoading || categoriesFetch.isLoading || enquiriesFetch.isLoading
  const error = productsFetch.error || categoriesFetch.error || enquiriesFetch.error

  if (isLoading) return <Spinner label="Loading dashboard" />
  if (error) return <ErrorMessage message={error} />

  const totalProducts = productsFetch.meta?.total ?? 0
  const totalCategories = (categoriesFetch.data || []).length
  const enquiries = enquiriesFetch.data || []
  const recentEnquiries = enquiries.slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-muted">Overview of your store</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Total Products" value={totalProducts} />
        <StatCard icon={ListTree} label="Categories" value={totalCategories} />
        <StatCard icon={MessageSquare} label="Total Enquiries" value={enquiries.length} />
        <StatCard icon={Images} label="Gallery Images" value="-" />
      </div>

      <div className="mt-8 rounded-xl border border-sand-dark bg-white">
        <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
          <h2 className="text-lg font-semibold">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm font-medium text-wood hover:underline">
            View all
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">No enquiries yet.</p>
        ) : (
          <ul className="divide-y divide-sand-dark">
            {recentEnquiries.map((enquiry) => (
              <li key={enquiry._id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{enquiry.name}</p>
                  <p className="truncate text-sm text-muted">
                    {enquiry.product?.name || 'General enquiry'} · {enquiry.phone}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[enquiry.status]}`}
                >
                  {enquiry.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}