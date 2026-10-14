import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AddMedicinePage from './pages/AddMedicinePage'
import CatalogPage from './pages/CatalogPage'
import MedicineDetailsPage from './pages/MedicineDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

const INITIAL_QUERY = {
  search: '',
  category: '',
  form: '',
  availability: 'all',
  maxPrice: '',
  sort: 'name-asc',
  page: 1,
}

export default function App() {
  // The catalog query is the only state in App. It is here (not in CatalogPage)
  // because CatalogPage unmounts when you open a medicine; keeping the query in App
  // means your search, filters and page are still there when you come back.
  const [query, setQuery] = useState(INITIAL_QUERY)

  // Any change of search / filter / sort starts again from page 1.
  function handleQueryChange(changes) {
    setQuery((prev) => ({ ...prev, ...changes, page: 1 }))
  }

  function handlePageChange(page) {
    setQuery((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setQuery(INITIAL_QUERY)
  }

  const hasActiveFilters = Object.keys(INITIAL_QUERY).some(
    (key) => key !== 'page' && query[key] !== INITIAL_QUERY[key],
  )

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <CatalogPage
              query={query}
              onQueryChange={handleQueryChange}
              onPageChange={handlePageChange}
              onReset={handleReset}
              hasActiveFilters={hasActiveFilters}
            />
          }
        />
        <Route path="medicines/:id" element={<MedicineDetailsPage />} />
        <Route path="add" element={<AddMedicinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
