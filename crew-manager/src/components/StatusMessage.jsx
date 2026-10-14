// Shared block for the "error" and "empty" states.
export default function StatusMessage({ tone, title, text, actionLabel, onAction }) {
  return (
    <div className={`message message--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <div className="message__icon" aria-hidden="true">
        {tone === 'error' ? '!' : '○'}
      </div>
      <p className="message__title">{title}</p>
      {text && <p className="message__text">{text}</p>}
      {actionLabel && (
        <button type="button" className="btn btn--small" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
