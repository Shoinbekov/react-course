export default function Rating({ value }) {
  if (!value) return <span className="rating rating--empty">No ratings yet</span>
  return (
    <span className="rating" aria-label={`Rating ${value} out of 5`}>
      ★ {value.toFixed(1)}
    </span>
  )
}
