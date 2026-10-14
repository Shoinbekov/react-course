import { useEffect, useState } from 'react'
import { getMedicines } from '../api/medicinesApi'
import { useDebouncedValue } from './useDebouncedValue'

const PAGE_SIZE = 12

// Loads one page of medicines for the current search / filters / sort / page.
// Returns { status: 'loading' | 'error' | 'success', data, error, retry, isTyping }.
export function useMedicines(query) {
  const search = useDebouncedValue(query.search, 400)
  const { category, form, availability, maxPrice, sort, page } = query

  // Changing this number re-runs the effect — that is how "Try again" works.
  const [attempt, setAttempt] = useState(0)

  // A string that identifies the request we NEED right now.
  const requestKey = JSON.stringify({ search, category, form, availability, maxPrice, sort, page, attempt })

  // The last response we RECEIVED, remembered together with the key of its request.
  const [result, setResult] = useState({ key: null, data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    getMedicines(
      { search, category, form, availability, maxPrice, sort, page, pageSize: PAGE_SIZE },
      { signal: controller.signal },
    )
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((error) => {
        // An aborted request is not an error: a newer request replaced it.
        if (error.name === 'AbortError') return
        // Keep the previous data, just remember the error.
        setResult((prev) => ({ key: requestKey, data: prev.data, error }))
      })

    // Cleanup runs before the next request and when the component unmounts.
    // Aborting stops a slow old response from overwriting a newer one (race condition).
    return () => controller.abort()
  }, [requestKey, search, category, form, availability, maxPrice, sort, page])

  // Status is DERIVED, not stored: if the received answer belongs to an older
  // request, the current one is still loading.
  let status = 'success'
  if (result.key !== requestKey) status = 'loading'
  else if (result.error) status = 'error'

  return {
    status,
    data: result.data, // old data stays visible while the next page loads
    error: result.error,
    retry: () => setAttempt((n) => n + 1),
    isTyping: search !== query.search, // the debounced value has not caught up yet
    pageSize: PAGE_SIZE,
  }
}
