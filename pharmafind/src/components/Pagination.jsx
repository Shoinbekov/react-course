// Builds the list of page buttons, e.g. [1, '…', 4, 5, 6, '…', 10]
function getPages(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result = []
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) result.push(`gap-${page}`)
    result.push(page)
  })
  return result
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Pages">
      <button type="button" className="pagination__btn" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        ← Prev
      </button>

      {getPages(page, totalPages).map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="pagination__gap">
            …
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={`pagination__btn${item === page ? ' pagination__btn--active' : ''}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className="pagination__btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  )
}
