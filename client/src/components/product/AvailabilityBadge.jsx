import { AVAILABILITY } from '../../utils/productHelpers'

export default function AvailabilityBadge({ availability }) {
  const info = AVAILABILITY[availability]

  if (!info) return null

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${info.className}`}
    >
      {info.label}
    </span>
  )
}