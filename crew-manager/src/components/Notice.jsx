export default function Notice({ notice, onClose }) {
  if (!notice) return null
  return (
    <div className={`notice notice--${notice.type}`} role="status">
      <span>{notice.text}</span>
      <button type="button" className="notice__close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  )
}
