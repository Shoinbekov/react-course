// Grey placeholder cards shown on the very first load.
export default function LoadingGrid({ count = 12 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading medicines">
      {Array.from({ length: count }, (_, i) => (
        // The placeholders never change order and have no state, so the index is a fine key here.
        <div key={i} className="card card--skeleton">
          <div className="skeleton skeleton--short" />
          <div className="skeleton skeleton--title" />
          <div className="skeleton" />
          <div className="skeleton skeleton--short" />
        </div>
      ))}
    </div>
  )
}
