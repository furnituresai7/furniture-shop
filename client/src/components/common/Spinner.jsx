export default function Spinner({ label = 'Loading' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-sand-dark border-t-wood" />
      <p className="text-sm text-muted">{label}...</p>
    </div>
  )
}