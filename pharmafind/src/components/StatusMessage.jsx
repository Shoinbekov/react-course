// One component for the "error" and "empty" states.
// tone: 'error' | 'empty'
export default function StatusMessage({ tone, title, children, actionLabel, onAction }) {
  return (
    <div className={`status status--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <div className="status__icon" aria-hidden="true">
        {tone === 'error' ? '!' : '∅'}
      </div>
      <h2 className="status__title">{title}</h2>
      {children && <p className="status__text">{children}</p>}
      {actionLabel && (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
