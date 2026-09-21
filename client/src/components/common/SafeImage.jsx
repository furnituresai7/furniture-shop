import { useState } from 'react'

// Image with a graceful fallback when the file is missing or fails to load
export default function SafeImage({ src, alt, className = '', ...props }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-sand text-sm text-muted ${className}`}
      >
        Image coming soon
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={className}
      {...props}
    />
  )
}