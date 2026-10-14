import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import Badge from './Badge'
import Rating from './Rating'
import StockBadge from './StockBadge'

export default function MedicineCard({ medicine }) {
  const { id, name, strength, form, category, manufacturer, price, inStock, prescription, rating } = medicine

  return (
    <article className="card">
      <div className="card__top">
        <Badge tone="info">{category}</Badge>
        {prescription && <Badge tone="warning">Rx</Badge>}
      </div>
      <h3 className="card__title">
        <Link to={`/medicines/${id}`} className="card__link">
          {name}
        </Link>
      </h3>
      <p className="card__meta">
        {form} · {strength}
      </p>
      <p className="card__maker">{manufacturer}</p>
      <div className="card__bottom">
        <span className="price">{formatPrice(price)}</span>
        <Rating value={rating} />
      </div>
      <StockBadge inStock={inStock} />
    </article>
  )
}
