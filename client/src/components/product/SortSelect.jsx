import { SORT_OPTIONS } from '../../utils/productFilters'

// Native <select>: works well with phone keyboards and screen readers
export default function SortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="product-sort"
        className="whitespace-nowrap text-sm font-medium text-muted"
      >
        Sort by
      </label>
      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-sand-dark bg-white px-3 py-3 text-base text-ink md:w-auto"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}