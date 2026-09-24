import { useScrollReveal } from '../../hooks/useScrollReveal'

// Wraps a section: fades and slides up into place the first time it scrolls into view
export default function Reveal({ children, className = '' }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}