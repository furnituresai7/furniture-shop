// Labelled input or textarea with an accessible error message
export default function TextField({
  id,
  label,
  error,
  required = false,
  multiline = false,
  className = '',
  ...props
}) {
  const errorId = `${id}-error`
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {/* text-base (16px) stops iPhones from zooming in when a field is focused */}
      <Control
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-base text-ink placeholder:text-muted ${
          error ? 'border-danger' : 'border-sand-dark'
        }`}
        {...props}
      />

      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}