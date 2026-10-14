import { useState } from 'react'
import { formatPrice } from '../utils/format'

// Local state: how many packages the user wants. Shows the total price.
// The parent renders it with key={medicine.id}, so the counter starts from 1 again
// when the user opens a different medicine.
export default function QuantityPicker({ price, max }) {
  const [quantity, setQuantity] = useState(1)

  if (max === 0) return <p className="muted">Not available right now.</p>

  return (
    <div className="quantity">
      <span className="field__label">Packages</span>
      <div className="quantity__row">
        <button
          type="button"
          className="quantity__btn"
          onClick={() => setQuantity((q) => q - 1)}
          disabled={quantity <= 1}
          aria-label="Less"
        >
          −
        </button>
        <span className="quantity__value">{quantity}</span>
        <button
          type="button"
          className="quantity__btn"
          onClick={() => setQuantity((q) => q + 1)}
          disabled={quantity >= max}
          aria-label="More"
        >
          +
        </button>
        <span className="quantity__total">
          Total: <strong>{formatPrice(price * quantity)}</strong>
        </span>
      </div>
    </div>
  )
}
