import siteConfig from '../config/siteConfig'
import { isPlaceholder } from './placeholders'

const hasRealAddress = () =>
  Boolean(siteConfig.address) && !isPlaceholder(siteConfig.address)

// Prefers the client's official embed URL, otherwise searches by address
export function getMapEmbedUrl() {
  if (siteConfig.mapEmbedUrl) return siteConfig.mapEmbedUrl

  if (hasRealAddress()) {
    return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`
  }

  return ''
}

// Prefers the client's Google Maps link, otherwise builds one from the address
export function getDirectionsUrl() {
  if (siteConfig.mapsUrl && !isPlaceholder(siteConfig.mapsUrl)) {
    return siteConfig.mapsUrl
  }

  if (hasRealAddress()) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`
  }

  return ''
}