import Badge from './Badge'

export default function StockBadge({ inStock }) {
  if (inStock === 0) return <Badge tone="danger">Out of stock</Badge>
  if (inStock < 10) return <Badge tone="warning">Only {inStock} left</Badge>
  return <Badge tone="success">In stock</Badge>
}
