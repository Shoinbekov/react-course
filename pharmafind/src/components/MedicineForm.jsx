import { useState } from 'react'
import { CATEGORIES, FORMS } from '../api/medicinesApi'
import FormField from './FormField'

const EMPTY_FORM = {
  name: '',
  activeIngredient: '',
  category: '',
  form: '',
  strength: '',
  manufacturer: '',
  country: 'Kazakhstan',
  price: '',
  inStock: '10',
  prescription: false,
  description: '',
}

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter at least 2 characters.'
  if (!values.activeIngredient.trim()) errors.activeIngredient = 'Active ingredient is required.'
  if (!values.category) errors.category = 'Choose a category.'
  if (!values.form) errors.form = 'Choose a form.'
  if (!values.strength.trim()) errors.strength = 'Strength is required, e.g. 500 mg.'
  if (!values.manufacturer.trim()) errors.manufacturer = 'Manufacturer is required.'
  if (!(Number(values.price) > 0)) errors.price = 'Price must be greater than 0.'
  if (values.inStock === '' || Number(values.inStock) < 0 || !Number.isInteger(Number(values.inStock)))
    errors.inStock = 'Enter a whole number, 0 or more.'
  if (values.description.length > 300) errors.description = 'Maximum 300 characters.'
  return errors
}

// Controlled form: every input's value comes from state, every change goes through setValues.
export default function MedicineForm({ onSubmit, submitting }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Errors are derived from values on every render — no need to store them in state.
  const errors = validate(values)
  const showError = (field) => (touched[field] || submitted ? errors[field] : undefined)

  // One handler for all inputs: uses the input's `name` attribute.
  function handleChange(e) {
    const { name, type, value, checked } = e.target
    // Immutable update: copy the old object and replace one field.
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault() // stop the browser from reloading the page
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    onSubmit({
      ...values,
      name: values.name.trim(),
      activeIngredient: values.activeIngredient.trim(),
      strength: values.strength.trim(),
      manufacturer: values.manufacturer.trim(),
      country: values.country.trim(),
      description: values.description.trim() || 'No description provided.',
    })
  }

  function handleReset() {
    setValues(EMPTY_FORM)
    setTouched({})
    setSubmitted(false)
  }

  const inputProps = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: 'field__control',
  })

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__grid">
        <FormField label="Name *" error={showError('name')}>
          <input {...inputProps('name')} placeholder="e.g. Paracetamol" />
        </FormField>

        <FormField label="Active ingredient *" error={showError('activeIngredient')}>
          <input {...inputProps('activeIngredient')} placeholder="e.g. Paracetamol" />
        </FormField>

        <FormField label="Category *" error={showError('category')}>
          <select {...inputProps('category')}>
            <option value="">Choose…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Form *" error={showError('form')}>
          <select {...inputProps('form')}>
            <option value="">Choose…</option>
            {FORMS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Strength *" error={showError('strength')}>
          <input {...inputProps('strength')} placeholder="e.g. 500 mg" />
        </FormField>

        <FormField label="Manufacturer *" error={showError('manufacturer')}>
          <input {...inputProps('manufacturer')} placeholder="e.g. Chimpharm" />
        </FormField>

        <FormField label="Country">
          <input {...inputProps('country')} />
        </FormField>

        <FormField label="Price, ₸ *" error={showError('price')}>
          <input {...inputProps('price')} type="number" min="1" step="10" placeholder="e.g. 1200" />
        </FormField>

        <FormField label="Packages in stock *" error={showError('inStock')}>
          <input {...inputProps('inStock')} type="number" min="0" step="1" />
        </FormField>
      </div>

      <label className="checkbox">
        <input type="checkbox" name="prescription" checked={values.prescription} onChange={handleChange} />
        Prescription required
      </label>

      <FormField
        label="Description"
        error={showError('description')}
        hint={`${values.description.length}/300 characters`}
      >
        <textarea {...inputProps('description')} rows={3} placeholder="What is this medicine used for?" />
      </FormField>

      <div className="form__actions">
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Saving…' : 'Add medicine'}
        </button>
        <button type="button" className="btn btn--ghost" onClick={handleReset} disabled={submitting}>
          Clear form
        </button>
      </div>
    </form>
  )
}
