import { useState } from 'react'
import { STATUSES } from '../constants'
import Spinner from './Spinner'
import StatusBadge from './StatusBadge'
import StatusMessage from './StatusMessage'

const ACTION_TEXT = {
  status: 'Updating status…',
  save: 'Saving changes…',
  delete: 'Deleting…',
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Shows the selected crew member. It does not load data itself: App loads the
// details and passes them here together with the loading/error state.
// App renders it with key={selectedId}, so the "Delete?" confirmation resets
// when another member is selected.
export default function DetailsPanel({ state, error, member, pendingAction, onRetry, onStatusChange, onEdit, onDelete, onBack }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (state === 'idle') {
    return (
      <div className="details details--empty">
        <StatusMessage tone="empty" title="No crew member selected" text="Choose someone from the list to see the details." />
      </div>
    )
  }

  const backButton = (
    <button type="button" className="back-btn" onClick={onBack}>
      ← Back to list
    </button>
  )

  if (state === 'loading') {
    return (
      <div className="details">
        {backButton}
        <div className="details__loading">
          <Spinner label="Loading details…" />
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="details">
        {backButton}
        <StatusMessage tone="error" title="Could not load details" text={error.message} actionLabel="Try again" onAction={onRetry} />
      </div>
    )
  }

  const busy = Boolean(pendingAction)
  const m = member

  return (
    <div className="details">
      {backButton}

      <header className="details__header">
        <span className="avatar avatar--big" aria-hidden="true">
          {m.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
        <div>
          <h2 className="details__name">{m.name}</h2>
          <p className="details__role">
            {m.rank} · {m.role}
          </p>
        </div>
        <StatusBadge status={m.status} />
      </header>

      {busy && (
        <div className="details__busy">
          <Spinner small label={ACTION_TEXT[pendingAction]} />
        </div>
      )}

      <p className="details__bio">{m.description}</p>

      <dl className="fields">
        <div>
          <dt>Department</dt>
          <dd>{m.department}</dd>
        </div>
        <div>
          <dt>Rank</dt>
          <dd>{m.rank}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${m.email}`}>{m.email}</a>
          </dd>
        </div>
        <div>
          <dt>Home planet</dt>
          <dd>{m.homePlanet}</dd>
        </div>
        <div>
          <dt>Joined</dt>
          <dd>{formatDate(m.joinedAt)}</dd>
        </div>
        <div>
          <dt>Missions completed</dt>
          <dd>{m.missionsCompleted}</dd>
        </div>
        <div>
          <dt>Clearance level</dt>
          <dd>
            <span className="clearance" aria-label={`Level ${m.clearanceLevel} of 5`}>
              {[1, 2, 3, 4, 5].map((level) => (
                <span key={level} className={level <= m.clearanceLevel ? 'clearance__dot clearance__dot--on' : 'clearance__dot'} />
              ))}
            </span>
            {m.clearanceLevel} / 5
          </dd>
        </div>
        <div className="fields__wide">
          <dt>Skills</dt>
          <dd className="skills">
            {m.skills.length === 0 && <span className="muted">No skills listed</span>}
            {m.skills.map((skill) => (
              <span key={skill} className="skill">
                {skill}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <section className="details__section">
        <h3 className="details__subtitle">Change status</h3>
        <div className="segmented" role="group" aria-label="Change status">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`segmented__btn${m.status === s.value ? ' segmented__btn--active' : ''}`}
              disabled={busy || m.status === s.value}
              onClick={() => onStatusChange(m, s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <footer className="details__actions">
        <button type="button" className="btn btn--ghost" disabled={busy} onClick={() => onEdit(m)}>
          Edit
        </button>
        {confirmDelete ? (
          <span className="confirm">
            Delete {m.name}?
            <button
              type="button"
              className="btn btn--danger btn--small"
              disabled={busy}
              onClick={() => {
                setConfirmDelete(false)
                onDelete(m)
              }}
            >
              Yes, delete
            </button>
            <button type="button" className="btn btn--ghost btn--small" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
          </span>
        ) : (
          <button type="button" className="btn btn--danger-ghost" disabled={busy} onClick={() => setConfirmDelete(true)}>
            Remove
          </button>
        )}
      </footer>
    </div>
  )
}
