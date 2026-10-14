export default function Spinner({ label, small = false }) {
  return (
    <span className={`spinner${small ? ' spinner--small' : ''}`} role="status">
      <span className="spinner__circle" aria-hidden="true" />
      {label && <span>{label}</span>}
    </span>
  )
}
