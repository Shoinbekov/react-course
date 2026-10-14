export default function SearchBar({ value, onChange, isSearching }) {
  return (
    <div className="search">
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        className="search__input"
        placeholder="Search by name, active ingredient or manufacturer…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search medicines"
      />
      {isSearching && <span className="search__hint">searching…</span>}
    </div>
  )
}
