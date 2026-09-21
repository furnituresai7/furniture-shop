import { useState } from 'react'
import { Search, X } from 'lucide-react'
import Button from '../common/Button'

export default function SearchBar({ initialValue = '', onSearch, className = '' }) {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(value.trim())
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        {/* text-base (16px) stops iPhones from zooming in when the field is focused */}
        <input
          id="product-search"
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search furniture"
          className="w-full rounded-lg border border-sand-dark bg-white py-3 pl-10 pr-10 text-base text-ink placeholder:text-muted"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted hover:text-wood"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <Button type="submit">Search</Button>
    </form>
  )
}