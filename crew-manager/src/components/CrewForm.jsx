import { useState } from 'react'
import { DEPARTMENTS, RANKS, STATUSES } from '../constants'

const EMPTY = {
  name: '',
  role: '',
  department: '',
  rank: 'Ensign',
  status: 'on-duty',
  email: '',
  homePlanet: 'Earth',
  joinedAt: new Date().toISOString().slice(0, 10),
  missionsCompleted: '0',
  clearanceLevel: '1',
  skills: '',
  description: '',
}

// Turns an API item into form values (all strings, skills as "a, b, c").
function toValues(member) {
  if (!member) return EMPTY
  return {
    ...member,
    missionsCompleted: String(member.missionsCompleted),
    clearanceLevel: String(member.clearanceLevel),
    skills: member.skills.join(', '),
  }
}

function validate(v) {
  const errors = {}
  if (v.name.trim().length < 2) errors.name = 'At least 2 characters.'
  if (!v.role.trim()) errors.role = 'Role is required.'
  if (!v.department) errors.department = 'Choose a department.'
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) errors.email = 'Enter a valid email.'
  if (!v.homePlanet.trim()) errors.homePlanet = 'Home planet is required.'
  if (!v.joinedAt) errors.joinedAt = 'Choose a date.'
  const missions = Number(v.missionsCompleted)
  if (v.missionsCompleted === '' || !Number.isInteger(missions) || missions < 0)
    errors.missionsCompleted = 'Whole number, 0 or more.'
  if (v.description.trim().length < 5) errors.description = 'Write a short bio (5+ characters).'
  return errors
}

// Controlled form for creating and editing. App renders it with a key,
// so opening the form for another member always starts with fresh values.
export default function CrewForm({ member, saving, error, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toValues(member))
  const [submitted, setSubmitted] = useState(false)
  const errors = validate(values)
  const isEdit = Boolean(member)

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    onSubmit({
      name: values.name.trim(),
      role: values.role.trim(),
      department: values.department,
      rank: values.rank,
      status: values.status,
      email: values.email.trim(),
      homePlanet: values.homePlanet.trim(),
      joinedAt: values.joinedAt,
      missionsCompleted: Number(values.missionsCompleted),
      clearanceLevel: Number(values.clearanceLevel),
      skills: values.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      description: values.description.trim(),
    })
  }

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    className: `input${submitted && errors[name] ? ' input--invalid' : ''}`,
  })
  const errorText = (name) => submitted && errors[name] && <span className="form__error">{errors[name]}</span>

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <form className="modal__box form" onSubmit={handleSubmit} noValidate>
        <h2 id="form-title">{isEdit ? `Edit ${member.name}` : 'New crew member'}</h2>

        {error && <p className="form__server-error">{error}</p>}

        <div className="form__grid">
          <label className="form__field">
            <span>Name *</span>
            <input {...field('name')} />
            {errorText('name')}
          </label>
          <label className="form__field">
            <span>Role *</span>
            <input {...field('role')} placeholder="e.g. Engineer" />
            {errorText('role')}
          </label>
          <label className="form__field">
            <span>Department *</span>
            <select {...field('department')}>
              <option value="">Choose…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            {errorText('department')}
          </label>
          <label className="form__field">
            <span>Rank</span>
            <select {...field('rank')}>
              {RANKS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="form__field">
            <span>Status</span>
            <select {...field('status')}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="form__field">
            <span>Email *</span>
            <input {...field('email')} type="email" placeholder="name@orbit-station.space" />
            {errorText('email')}
          </label>
          <label className="form__field">
            <span>Home planet *</span>
            <input {...field('homePlanet')} />
            {errorText('homePlanet')}
          </label>
          <label className="form__field">
            <span>Joined *</span>
            <input {...field('joinedAt')} type="date" />
            {errorText('joinedAt')}
          </label>
          <label className="form__field">
            <span>Missions completed *</span>
            <input {...field('missionsCompleted')} type="number" min="0" />
            {errorText('missionsCompleted')}
          </label>
          <label className="form__field">
            <span>Clearance level</span>
            <select {...field('clearanceLevel')}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={String(n)}>
                  Level {n}
                </option>
              ))}
            </select>
          </label>
          <label className="form__field form__field--wide">
            <span>Skills (comma separated)</span>
            <input {...field('skills')} placeholder="Piloting, Robotics" />
          </label>
          <label className="form__field form__field--wide">
            <span>Bio *</span>
            <textarea {...field('description')} rows={3} />
            {errorText('description')}
          </label>
        </div>

        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
