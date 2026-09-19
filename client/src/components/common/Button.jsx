const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-wood text-cream hover:bg-wood-dark',
  outline: 'border border-wood text-wood hover:bg-wood hover:text-cream',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
  ghost: 'text-wood hover:bg-sand',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

// href diya to <a> banega, warna <button>
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}