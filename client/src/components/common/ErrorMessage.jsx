import { RotateCcw } from 'lucide-react'
import Button from './Button'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mx-auto mt-2 max-w-md text-muted">
        {message || 'Please check your connection and try again.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-6">
          <RotateCcw size={16} aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  )
}