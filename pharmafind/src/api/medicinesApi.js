// Simulated REST API.
// It behaves like a real server: every call is asynchronous (returns a Promise),
// takes some time (random delay), works with JSON and keeps data in localStorage,
// so medicines you add are still there after a page reload.
import seedData from '../data/medicines.json'

const STORAGE_KEY = 'pharmafind.medicines.v1'
const MIN_DELAY = 300
const MAX_DELAY = 900

// Probability (0..1) that a request fails with a "network error".
// Keep 0 for normal use. Set it to e.g. 0.3 to see the error state in the UI.
const FAIL_RATE = 0

export const CATEGORIES = [...new Set(seedData.map((m) => m.category))].sort()
export const FORMS = [...new Set(seedData.map((m) => m.form))].sort()

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
  { value: 'rating-desc', label: 'Rating: best first' },
  { value: 'newest', label: 'Newest first' },
]

// ---------- "database" (localStorage) ----------

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Broken JSON or storage blocked — fall back to the seed data below.
  }
  writeAll(seedData)
  return seedData
}

function writeAll(medicines) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines))
  } catch {
    // Storage can be unavailable (private mode). The app still works for this session.
  }
}

// ---------- helpers that imitate the network ----------

function abortError() {
  return new DOMException('The request was aborted', 'AbortError')
}

// Waits a random time, then resolves with the result of `work()`.
// Supports AbortController: if the signal is aborted, the Promise rejects with AbortError.
function respond(work, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError())
      return
    }

    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY)
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      if (Math.random() < FAIL_RATE) {
        reject(new Error('Network error: the server did not respond. Please try again.'))
        return
      }
      try {
        // JSON round-trip = the caller gets a fresh copy, like data from a real server.
        resolve(JSON.parse(JSON.stringify(work())))
      } catch (error) {
        reject(error)
      }
    }, delay)

    function onAbort() {
      clearTimeout(timer)
      reject(abortError())
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

// ---------- query logic (what a server would do) ----------

function compare(sort) {
  switch (sort) {
    case 'name-desc':
      return (a, b) => b.name.localeCompare(a.name)
    case 'price-asc':
      return (a, b) => a.price - b.price
    case 'price-desc':
      return (a, b) => b.price - a.price
    case 'rating-desc':
      return (a, b) => b.rating - a.rating
    case 'newest':
      return (a, b) => b.addedAt.localeCompare(a.addedAt) || b.id - a.id
    case 'name-asc':
    default:
      return (a, b) => a.name.localeCompare(b.name)
  }
}

function matches(medicine, { search, category, form, availability, maxPrice }) {
  const text = search.trim().toLowerCase()
  if (text) {
    const haystack = `${medicine.name} ${medicine.activeIngredient} ${medicine.manufacturer}`.toLowerCase()
    if (!haystack.includes(text)) return false
  }
  if (category && medicine.category !== category) return false
  if (form && medicine.form !== form) return false
  if (availability === 'otc' && medicine.prescription) return false
  if (availability === 'rx' && !medicine.prescription) return false
  if (availability === 'in-stock' && medicine.inStock === 0) return false
  if (maxPrice && medicine.price > Number(maxPrice)) return false
  return true
}

// ---------- public API ----------

/**
 * GET /medicines?search=&category=&form=&availability=&maxPrice=&sort=&page=&pageSize=
 * Returns { items, total, page, totalPages }.
 */
export function getMedicines(query, { signal } = {}) {
  return respond(() => {
    const {
      search = '',
      category = '',
      form = '',
      availability = 'all',
      maxPrice = '',
      sort = 'name-asc',
      page = 1,
      pageSize = 12,
    } = query

    const filtered = readAll()
      .filter((m) => matches(m, { search, category, form, availability, maxPrice }))
      .sort(compare(sort))

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * pageSize

    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page: safePage,
      totalPages,
    }
  }, signal)
}

/** GET /medicines/:id */
export function getMedicineById(id, { signal } = {}) {
  return respond(() => {
    const medicine = readAll().find((m) => m.id === Number(id))
    if (!medicine) throw new NotFoundError(`Medicine #${id} was not found.`)
    return medicine
  }, signal)
}

/** GET /medicines?ingredient=… — other offers with the same active ingredient. */
export function getAlternatives(id, activeIngredient, { signal } = {}) {
  return respond(
    () =>
      readAll()
        .filter((m) => m.id !== Number(id) && m.activeIngredient === activeIngredient)
        .sort((a, b) => a.price - b.price)
        .slice(0, 4),
    signal,
  )
}

/** POST /medicines */
export function createMedicine(data) {
  return respond(() => {
    const name = data.name?.trim()
    if (!name) throw new ValidationError('Name is required.')
    if (!(Number(data.price) > 0)) throw new ValidationError('Price must be greater than 0.')

    const all = readAll()
    const medicine = {
      ...data,
      id: Math.max(0, ...all.map((m) => m.id)) + 1,
      name,
      price: Number(data.price),
      inStock: Number(data.inStock),
      rating: 0,
      addedAt: new Date().toISOString().slice(0, 10),
    }
    writeAll([...all, medicine])
    return medicine
  })
}

/** Restores the original 120 records (removes everything the user added). */
export function resetDatabase() {
  return respond(() => {
    writeAll(seedData)
    return { total: seedData.length }
  })
}
