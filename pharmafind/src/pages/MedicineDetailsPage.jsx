import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getMedicineById } from '../api/medicinesApi'
import AlternativesList from '../components/AlternativesList'
import Badge from '../components/Badge'
import QuantityPicker from '../components/QuantityPicker'
import Rating from '../components/Rating'
import Spinner from '../components/Spinner'
import StatusMessage from '../components/StatusMessage'
import StockBadge from '../components/StockBadge'
import { formatDate, formatPrice } from '../utils/format'

export default function MedicineDetailsPage() {
  const { id } = useParams()
  const location = useLocation()
  const justCreated = location.state?.created === true

  const [attempt, setAttempt] = useState(0)
  const requestKey = `${id}#${attempt}`
  const [result, setResult] = useState({ key: null, medicine: null, error: null })

  useEffect(() => {
    const controller = new AbortController()
    getMedicineById(id, { signal: controller.signal })
      .then((medicine) => setResult({ key: requestKey, medicine, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ key: requestKey, medicine: null, error })
      })
    // If the user clicks another medicine before this one loads, cancel the old request.
    return () => controller.abort()
  }, [id, requestKey])

  if (result.key !== requestKey) return <Spinner label="Loading medicine…" />

  if (result.error) {
    const notFound = result.error.name === 'NotFoundError'
    return (
      <StatusMessage
        tone="error"
        title={notFound ? 'Medicine not found' : 'Could not load this medicine'}
        actionLabel={notFound ? undefined : 'Try again'}
        onAction={() => setAttempt((n) => n + 1)}
      >
        {result.error.message} <Link to="/">Back to the catalog</Link>
      </StatusMessage>
    )
  }

  const m = result.medicine

  return (
    <article className="details">
      <Link to="/" className="back-link">
        ← Back to catalog
      </Link>

      {justCreated && <div className="notice notice--success">Medicine added to the catalog.</div>}

      <div className="details__layout">
        <section className="panel details__main">
          <div className="card__top">
            <Badge tone="info">{m.category}</Badge>
            {m.prescription ? <Badge tone="warning">Prescription required</Badge> : <Badge>No prescription</Badge>}
          </div>
          <h1 className="details__title">{m.name}</h1>
          <p className="details__subtitle">
            {m.form} · {m.strength}
          </p>
          <p>{m.description}</p>

          <dl className="specs">
            <dt>Active ingredient</dt>
            <dd>{m.activeIngredient}</dd>
            <dt>Manufacturer</dt>
            <dd>
              {m.manufacturer}, {m.country}
            </dd>
            <dt>Rating</dt>
            <dd>
              <Rating value={m.rating} />
            </dd>
            <dt>Added</dt>
            <dd>{formatDate(m.addedAt)}</dd>
          </dl>
        </section>

        <aside className="panel details__buy">
          <span className="price price--big">{formatPrice(m.price)}</span>
          <StockBadge inStock={m.inStock} />
          {/* key: a new medicine → a fresh QuantityPicker with quantity = 1 */}
          <QuantityPicker key={m.id} price={m.price} max={m.inStock} />
        </aside>
      </div>

      <AlternativesList medicineId={m.id} activeIngredient={m.activeIngredient} currentPrice={m.price} />
    </article>
  )
}
