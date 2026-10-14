import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMedicine } from '../api/medicinesApi'
import MedicineForm from '../components/MedicineForm'

export default function AddMedicinePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleCreate(data) {
    setSubmitting(true)
    setError(null)
    try {
      const created = await createMedicine(data)
      // Go to the new medicine's page and show a success message there.
      navigate(`/medicines/${created.id}`, { state: { created: true } })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="add-page">
      <h1>Add a medicine</h1>
      <p className="muted">Fields marked with * are required. The new item is saved and appears in the catalog.</p>
      {error && <div className="notice notice--error">{error}</div>}
      <div className="panel">
        <MedicineForm onSubmit={handleCreate} submitting={submitting} />
      </div>
    </section>
  )
}
