import { useEffect, useState } from 'react'

// Returns `value`, but only after it has stopped changing for `delay` ms.
// Used for the search box: we don't want to call the API on every keystroke.
export function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // Cleanup: if `value` changes again before the timer fires, cancel the old timer.
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
