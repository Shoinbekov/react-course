import { SORT_OPTIONS, STATUSES } from '../constants'

export default function Toolbar({ query, onChange, onReload, onCreate, isLoading }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="input toolbar__search"
        placeholder="Search by name, role or bio…"
        value={query.search}
        onChange={(e) => onChange({ search: e.target.value })}
        aria-label="Search crew"
      />
      <select
        className="input"
        value={query.status}
        onChange={(e) => onChange({ status: e.target.value })}
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <select
        className="input"
        value={query.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        aria-label="Sort"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="toolbar__buttons">
        <button type="button" className="btn btn--ghost" onClick={onReload} disabled={isLoading}>
          ↻ Reload
        </button>
        <button type="button" className="btn" onClick={onCreate}>
          + New member
        </button>
      </div>
    </div>
  )
}
