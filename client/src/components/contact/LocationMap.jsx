import { Navigation } from 'lucide-react'
import { getDirectionsUrl, getMapEmbedUrl } from '../../utils/mapLinks'
import Button from '../common/Button'

export default function LocationMap() {
  const embedUrl = getMapEmbedUrl()
  const directionsUrl = getDirectionsUrl()

  return (
    <section aria-labelledby="location-heading" className="mt-12">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="location-heading" className="text-2xl font-bold">
          Our Location
        </h2>

        {directionsUrl && (
          <Button
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={18} aria-hidden="true" />
            Get Directions
          </Button>
        )}
      </div>

      {embedUrl ? (
        <div className="overflow-hidden rounded-xl border border-sand-dark">
          <iframe
            src={embedUrl}
            title="Shop location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 sm:h-96"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-sand-dark bg-white px-4 text-center text-sm text-muted">
          The map will appear here once the shop address is added.
        </div>
      )}
    </section>
  )
}