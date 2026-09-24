import { useEffect, useRef, useState } from 'react'

// Returns a ref to attach to an element and whether it has scrolled into view.
// Triggers once, then stays visible (no re-hiding on scroll away).
export function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return undefined
    }

    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}