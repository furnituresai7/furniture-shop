import { AVAILABILITY } from '../../utils/productHelpers'

// Specification table. Rows without a value are skipped.
export default function ProductSpecs({ product }) {
  const rows = [
    { label: 'Material', value: product.material },
    { label: 'Colour', value: product.color },
    { label: 'Dimensions (W x D x H)', value: product.dimensions },
    { label: 'Capacity', value: product.capacity },
    { label: 'Warranty', value: product.warranty },
    { label: 'Availability', value: AVAILABILITY[product.availability]?.label },
  ].filter((row) => row.value)

  if (rows.length === 0) return null

  return (
    <dl className="divide-y divide-sand-dark overflow-hidden rounded-xl border border-sand-dark bg-white">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm sm:grid-cols-3">
          <dt className="font-medium text-muted">{row.label}</dt>
          <dd className="text-ink sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}