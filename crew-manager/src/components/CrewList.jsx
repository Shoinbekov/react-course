import Spinner from './Spinner'
import StatusBadge from './StatusBadge'

export default function CrewList({ items, selectedId, pending, onSelect, dimmed }) {
  return (
    <ul className={`crew-list${dimmed ? ' crew-list--dimmed' : ''}`}>
      {items.map((member) => (
        // Stable key: the id from the API.
        <li key={member.id}>
          <button
            type="button"
            className={`crew-row${member.id === selectedId ? ' crew-row--selected' : ''}`}
            onClick={() => onSelect(member.id)}
            aria-current={member.id === selectedId ? 'true' : undefined}
          >
            <span className="avatar" aria-hidden="true">
              {member.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </span>
            <span className="crew-row__text">
              <span className="crew-row__name">{member.name}</span>
              <span className="crew-row__meta">
                {member.role} · {member.department}
              </span>
            </span>
            {pending[member.id] ? <Spinner small /> : <StatusBadge status={member.status} />}
          </button>
        </li>
      ))}
    </ul>
  )
}
