import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAlternatives } from '../api/medicinesApi'
import { formatPrice } from '../utils/format'
import Spinner from './Spinner'

// "Same active ingredient — other manufacturers". Loads its own data.
export default function AlternativesList({ medicineId, activeIngredient, currentPrice }) {
  const [result, setResult] = useState({ forId: null, items: [], failed: false })

  useEffect(() => {
    const controller = new AbortController()
    getAlternatives(medicineId, activeIngredient, { signal: controller.signal })
      .then((items) => setResult({ forId: medicineId, items, failed: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ forId: medicineId, items: [], failed: true })
      })
    return () => controller.abort()
  }, [medicineId, activeIngredient])

  const loading = result.forId !== medicineId

  return (
    <section className="panel">
      <h2 className="panel__title">Same ingredient, other manufacturers</h2>
      {loading && <Spinner label="Looking for alternatives…" />}
      {!loading && result.failed && <p className="muted">Could not load alternatives.</p>}
      {!loading && !result.failed && result.items.length === 0 && (
        <p className="muted">No other offers with {activeIngredient}.</p>
      )}
      {!loading && result.items.length > 0 && (
        <ul className="alternatives">
          {result.items.map((item) => (
            <li key={item.id} className="alternatives__item">
              <Link to={`/medicines/${item.id}`}>{item.name}</Link>
              <span className="muted">{item.manufacturer}</span>
              <span className={item.price < currentPrice ? 'price price--cheaper' : 'price'}>
                {formatPrice(item.price)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
