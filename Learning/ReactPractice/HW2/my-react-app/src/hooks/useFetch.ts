import { useEffect, useState } from 'react'

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!url) return
    setLoading(true)
    fetch(url)
      .then((response) => response.json() as Promise<T>)
      .then(setData)
      .catch((fetchError) => setError(fetchError instanceof Error ? fetchError : new Error('Fetch failed')))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
