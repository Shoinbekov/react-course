import { CATEGORIES, FORMS, SORT_OPTIONS } from '../api/medicinesApi'
import Select from './Select'

const toOptions = (list) => list.map((item) => ({ value: item, label: item }))

const AVAILABILITY_OPTIONS = [
  { value: 'all', label: 'All medicines' },
  { value: 'in-stock', label: 'In stock only' },
  { value: 'otc', label: 'Without prescription' },
  { value: 'rx', label: 'Prescription only' },
]

export default function FilterPanel({ query, onChange, onReset, hasActiveFilters }) {
  return (
    <section className="filters" aria-label="Filters">
      <Select
        label="Category"
        value={query.category}
        onChange={(category) => onChange({ category })}
        options={toOptions(CATEGORIES)}
        placeholder="All categories"
      />
      <Select
        label="Form"
        value={query.form}
        onChange={(form) => onChange({ form })}
        options={toOptions(FORMS)}
        placeholder="All forms"
      />
      <Select
        label="Availability"
        value={query.availability}
        onChange={(availability) => onChange({ availability })}
        options={AVAILABILITY_OPTIONS}
      />
      <label className="field">
        <span className="field__label">Max price, ₸</span>
        <input
          type="number"
          className="field__control"
          min="0"
          step="100"
          placeholder="Any"
          value={query.maxPrice}
          onChange={(e) => onChange({ maxPrice: e.target.value })}
        />
      </label>
      <Select
        label="Sort by"
        value={query.sort}
        onChange={(sort) => onChange({ sort })}
        options={SORT_OPTIONS}
      />
      <button type="button" className="btn btn--ghost filters__reset" onClick={onReset} disabled={!hasActiveFilters}>
        Clear filters
      </button>
    </section>
  )
}
