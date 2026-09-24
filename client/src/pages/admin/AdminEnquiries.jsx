import { useState } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import ErrorMessage from '../../components/common/ErrorMessage'
import Spinner from '../../components/common/Spinner'
import { useFetch } from '../../hooks/useFetch'
import { getEnquiries, updateEnquiryStatus } from '../../services/enquiryAdminService'
import { getPhoneLink, getEmailLink } from '../../utils/contactLinks'
import { getWhatsAppLink } from '../../utils/whatsapp'

const STATUS_OPTIONS = ['new', 'contacted', 'closed']

const statusStyles = {
  new: 'bg-amber-100 text-amber-900',
  contacted: 'bg-blue-100 text-blue-800',
  closed: 'bg-green-100 text-green-800',
}

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Closed', value: 'closed' },
]

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminEnquiries() {
  const [statusFilter, setStatusFilter] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [updatingId, setUpdatingId] = useState(null)

  const enquiriesFetch = useFetch(() => getEnquiries(statusFilter), [statusFilter, refreshKey])
  const enquiries = enquiriesFetch.data || []

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await updateEnquiryStatus(id, status)
      setRefreshKey((key) => key + 1)
    } catch {
      // Silently ignore; the dropdown will just revert on refetch
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Enquiries</h1>
      <p className="mt-1 text-muted">Customer enquiries from the contact form</p>

      <div className="mt-4 flex gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              statusFilter === filter.value
                ? 'border-wood bg-wood text-cream'
                : 'border-sand-dark bg-white text-ink hover:border-wood-light'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {enquiriesFetch.isLoading && <Spinner label="Loading enquiries" />}
        {!enquiriesFetch.isLoading && enquiriesFetch.error && (
          <ErrorMessage message={enquiriesFetch.error} />
        )}

        {!enquiriesFetch.isLoading && !enquiriesFetch.error && (
          enquiries.length > 0 ? (
            <div className="space-y-3">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="rounded-xl border border-sand-dark bg-white p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">{enquiry.name}</p>
                      <p className="text-sm text-muted">
                        {enquiry.product?.name || 'General enquiry'} · {formatDate(enquiry.createdAt)}
                      </p>
                    </div>

                    <select
                      value={enquiry.status}
                      disabled={updatingId === enquiry._id}
                      onChange={(event) => handleStatusChange(enquiry._id, event.target.value)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium ${statusStyles[enquiry.status]}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="mt-3 text-sm text-ink">{enquiry.message}</p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    <a href={getPhoneLink(enquiry.phone)} className="inline-flex items-center gap-1.5 text-wood hover:underline">
                      <Phone size={14} aria-hidden="true" />
                      {enquiry.phone}
                    </a>
                    <a href={getWhatsAppLink(`Hello ${enquiry.name}, thank you for your enquiry.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-wood hover:underline"
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      WhatsApp
                    </a>
                    {enquiry.email && (
                      <a href={getEmailLink(enquiry.email)} className="inline-flex items-center gap-1.5 text-wood hover:underline">
                        <Mail size={14} aria-hidden="true" />
                        {enquiry.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center text-muted">
              No enquiries yet.
            </p>
          )
        )}
      </div>
    </div>
  )
}