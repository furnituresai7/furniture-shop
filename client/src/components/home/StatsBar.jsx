import { homeContent } from '../../data/homeContent'

// Business highlights (experience, customers, etc.).
// Renders nothing until real numbers are added in homeContent.js.
export default function StatsBar() {
  const { stats } = homeContent

  if (stats.length === 0) return null

  return (
    <section
      aria-label="Business highlights"
      className="border-y border-sand-dark bg-white"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-bold text-wood">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}