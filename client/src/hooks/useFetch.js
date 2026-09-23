import { useEffect, useState } from 'react'

// Runs an async fetcher function and tracks its loading/error/data state.
// deps controls when it re-runs (e.g. when a URL search param changes).
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setIsLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (cancelled) return
        setData(result.data)
        setMeta(result.meta ?? null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Something went wrong')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    // Prevents a stale response from overwriting newer state
    // if the component unmounts or deps change before it resolves
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, meta, isLoading, error }
}