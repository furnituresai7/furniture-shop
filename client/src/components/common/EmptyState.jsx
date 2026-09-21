import Button from './Button'

// Friendly message shown when a list has nothing to display
export default function EmptyState({ title, text, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {text && <p className="mx-auto mt-2 max-w-md text-muted">{text}</p>}

      {actionLabel && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}