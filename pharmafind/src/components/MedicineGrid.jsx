import MedicineCard from './MedicineCard'

export default function MedicineGrid({ medicines, dimmed }) {
  return (
    <div className={`grid${dimmed ? ' grid--dimmed' : ''}`}>
      {medicines.map((medicine) => (
        // Stable key: the medicine id, never the array index.
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  )
}
