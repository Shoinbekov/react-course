import FilterPanel from '../components/FilterPanel'
import LoadingGrid from '../components/LoadingGrid'
import MedicineGrid from '../components/MedicineGrid'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
import StatusMessage from '../components/StatusMessage'
import { useMedicines } from '../hooks/useMedicines'

// `query` lives in App (so it survives going to a details page and back);
// this page only reads it and asks App to change it.
export default function CatalogPage({ query, onQueryChange, onPageChange, onReset, hasActiveFilters }) {
  const { status, data, error, retry, isTyping, pageSize } = useMedicines(query)

  const isFirstLoad = status === 'loading' && !data
  const isRefreshing = (status === 'loading' && data) || isTyping

  function renderContent() {
    if (isFirstLoad) return <LoadingGrid />

    if (status === 'error') {
      return (
        <StatusMessage tone="error" title="Could not load medicines" actionLabel="Try again" onAction={retry}>
          {error.message}
        </StatusMessage>
      )
    }

    if (data.total === 0) {
      return (
        <StatusMessage
          tone="empty"
          title="No medicines found"
          actionLabel={hasActiveFilters ? 'Clear filters' : undefined}
          onAction={onReset}
        >
          Try another name or remove some filters.
        </StatusMessage>
      )
    }

    const from = (data.page - 1) * pageSize + 1
    const to = from + data.items.length - 1

    return (
      <>
        <div className="results-bar">
          <span>
            Showing <strong>{from}–{to}</strong> of <strong>{data.total}</strong> medicines
          </span>
          {isRefreshing && <Spinner label="Updating…" />}
        </div>
        <MedicineGrid medicines={data.items} dimmed={isRefreshing} />
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={onPageChange} />
      </>
    )
  }

  return (
    <>
      <section className="hero">
        <h1>Find the right medicine</h1>
        <p>Compare prices, forms and manufacturers of medicines in Almaty pharmacies.</p>
        <SearchBar value={query.search} onChange={(search) => onQueryChange({ search })} isSearching={isTyping} />
      </section>

      <FilterPanel query={query} onChange={onQueryChange} onReset={onReset} hasActiveFilters={hasActiveFilters} />

      {renderContent()}
    </>
  )
}
