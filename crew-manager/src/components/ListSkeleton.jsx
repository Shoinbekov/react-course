export default function ListSkeleton({ rows = 6 }) {
  return (
    <ul className="crew-list" aria-busy="true" aria-label="Loading crew">
      {Array.from({ length: rows }, (_, i) => (
        // Static placeholders without state: the index is a safe key here.
        <li key={i} className="crew-row crew-row--skeleton">
          <span className="avatar skeleton" />
          <span className="crew-row__text">
            <span className="skeleton skeleton--line" />
            <span className="skeleton skeleton--line skeleton--short" />
          </span>
        </li>
      ))}
    </ul>
  )
}
