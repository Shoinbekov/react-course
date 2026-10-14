// Wrapper for one form field: label + control + error message.
export default function FormField({ label, error, children, hint }) {
  return (
    <label className={`field${error ? ' field--invalid' : ''}`}>
      <span className="field__label">{label}</span>
      {children}
      {error ? <span className="field__error">{error}</span> : hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}
