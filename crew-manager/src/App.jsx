import { useEffect, useState } from 'react'
import { createItem, deleteItem, getItem, getItemsList, updateItem } from './api/fakeApi'
import CrewForm from './components/CrewForm'
import CrewList from './components/CrewList'
import DetailsPanel from './components/DetailsPanel'
import ListSkeleton from './components/ListSkeleton'
import Notice from './components/Notice'
import Pagination from './components/Pagination'
import Spinner from './components/Spinner'
import StatusMessage from './components/StatusMessage'
import Toolbar from './components/Toolbar'
import { PAGE_SIZE, statusLabel } from './constants'
import { API_CONFIG } from './api/settings'

const INITIAL_QUERY = { search: '', status: '', sort: 'name', page: 1 }

// Replaces one member in the loaded list page (immutable update).
function patchList(list, updated) {
  if (!list.data) return list
  return {
    ...list,
    data: {
      ...list.data,
      data: list.data.data.map((m) =>
        m.id === updated.id
          ? { ...m, name: updated.name, role: updated.role, department: updated.department, status: updated.status }
          : m,
      ),
    },
  }
}

// Returns a copy of the object without one key.
function without(object, key) {
  const copy = { ...object }
  delete copy[key]
  return copy
}

export default function App() {
  // ---------- list ----------
  const [query, setQuery] = useState(INITIAL_QUERY)
  const [listReload, setListReload] = useState(0) // +1 = load the list again
  // The last list response, saved together with the key of the request it answers.
  const [list, setList] = useState({ key: null, data: null, error: null })

  // ---------- details ----------
  const [selectedId, setSelectedId] = useState(null)
  const [detailsRequest, setDetailsRequest] = useState(0) // +1 = load details again
  const [details, setDetails] = useState({ key: null, member: null, error: null })

  // ---------- actions ----------
  // Which members have a request in progress: { [id]: 'status' | 'save' | 'delete' }
  const [pending, setPending] = useState({})
  // null = closed, { member: null } = create, { member } = edit
  const [form, setForm] = useState(null)
  const [formSaving, setFormSaving] = useState(false)
  const [formError, setFormError] = useState(null)
  const [notice, setNotice] = useState(null)

  // ===== Effect 1: load the list =====
  const { search, status, sort, page } = query
  const listKey = JSON.stringify({ search, status, sort, page, listReload })

  useEffect(() => {
    let ignore = false // becomes true when this request is outdated

    const params = new URLSearchParams({ page, limit: PAGE_SIZE, sort })
    if (search.trim()) params.set('search', search.trim())
    if (status) params.set('status', status)

    getItemsList(`?${params}`)
      .then((result) => {
        if (ignore) return // a newer request was started — drop this answer
        // The page became empty (e.g. after deleting its last member) → go to the last page.
        if (result.data.length === 0 && result.total > 0 && page > 1) {
          setQuery((q) => ({ ...q, page: result.totalPages }))
          return
        }
        setList({ key: listKey, data: result, error: null })
      })
      .catch((error) => {
        if (ignore) return
        setList((prev) => ({ key: listKey, data: prev.data, error }))
      })

    // Cleanup: runs when the query changes again or the component unmounts.
    return () => {
      ignore = true
    }
  }, [listKey, search, status, sort, page])

  // ===== Effect 2: load details of the selected member =====
  const detailsKey = selectedId === null ? null : `${selectedId}#${detailsRequest}`

  useEffect(() => {
    if (selectedId === null) return

    let ignore = false
    getItem(selectedId)
      .then((member) => {
        // If the user already clicked another member, this answer is outdated → ignore it.
        if (!ignore) setDetails({ key: detailsKey, member, error: null })
      })
      .catch((error) => {
        if (!ignore) setDetails({ key: detailsKey, member: null, error })
      })

    return () => {
      ignore = true
    }
  }, [selectedId, detailsKey])

  // ===== Effect 3: hide the notice after 4 seconds =====
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 4000)
    return () => clearTimeout(timer) // a new notice restarts the timer
  }, [notice])

  // ---------- derived state (calculated during render, not stored) ----------
  let listState = 'success'
  if (list.key !== listKey) listState = 'loading'
  else if (list.error) listState = 'error'

  let detailsState = 'idle'
  if (selectedId !== null) {
    if (details.key !== detailsKey) detailsState = 'loading'
    else if (details.error) detailsState = 'error'
    else detailsState = 'success'
  }

  // ---------- event handlers ----------
  function handleQueryChange(changes) {
    setQuery((q) => ({ ...q, ...changes, page: 1 }))
  }

  function handleSelect(id) {
    setSelectedId(id)
    setDetailsRequest((n) => n + 1) // always load fresh details
  }

  function notify(type, text) {
    setNotice({ type, text, id: Date.now() })
  }

  // Action that updates the selected member through the API.
  async function handleStatusChange(member, nextStatus) {
    // Stale closure protection: the id is captured NOW, when the action starts.
    // Even if the user selects another member while the request is running,
    // the response is applied to this id only.
    const id = member.id
    if (pending[id]) return // another action for this member is still running

    setPending((p) => ({ ...p, [id]: 'status' }))
    try {
      const updated = await updateItem(id, { status: nextStatus })
      // Functional updates read the LATEST state, not the old value from this closure.
      setDetails((prev) => (prev.member?.id === id ? { ...prev, member: updated } : prev))
      setList((prev) => patchList(prev, updated))
      notify('success', `${updated.name} is now ${statusLabel(updated.status).toLowerCase()}.`)
    } catch (error) {
      notify('error', `Could not update ${member.name}: ${error.message}`)
    } finally {
      setPending((p) => without(p, id))
    }
  }

  async function handleDelete(member) {
    const id = member.id
    if (pending[id]) return

    setPending((p) => ({ ...p, [id]: 'delete' }))
    try {
      await deleteItem(id)
      setSelectedId((current) => (current === id ? null : current)) // close details only if still open
      setListReload((n) => n + 1)
      notify('success', `${member.name} was removed from the crew.`)
    } catch (error) {
      notify('error', `Could not remove ${member.name}: ${error.message}`)
    } finally {
      setPending((p) => without(p, id))
    }
  }

  function openForm(member) {
    setFormError(null)
    setForm({ member })
  }

  async function handleSave(values) {
    const editing = form.member
    setFormSaving(true)
    setFormError(null)

    if (!editing) {
      try {
        const created = await createItem(values)
        setForm(null)
        setQuery(INITIAL_QUERY) // show the full list so the new member is easy to find
        setListReload((n) => n + 1)
        handleSelect(created.id)
        notify('success', `${created.name} joined the crew.`)
      } catch (error) {
        setFormError(error.message)
      } finally {
        setFormSaving(false)
      }
      return
    }

    const id = editing.id // captured when saving starts
    if (pending[id]) {
      setFormError('Another action for this member is still running. Try again in a moment.')
      setFormSaving(false)
      return
    }
    setPending((p) => ({ ...p, [id]: 'save' }))
    try {
      const updated = await updateItem(id, values)
      setDetails((prev) => (prev.member?.id === id ? { ...prev, member: updated } : prev))
      setList((prev) => patchList(prev, updated))
      setForm(null)
      notify('success', `Changes for ${updated.name} saved.`)
    } catch (error) {
      setFormError(error.message)
    } finally {
      setPending((p) => without(p, id))
      setFormSaving(false)
    }
  }

  // ---------- render ----------
  function renderList() {
    if (listState === 'loading' && !list.data) return <ListSkeleton />

    if (listState === 'error') {
      return (
        <StatusMessage
          tone="error"
          title="Could not load the crew"
          text={list.error.message}
          actionLabel="Try again"
          onAction={() => setListReload((n) => n + 1)}
        />
      )
    }

    const result = list.data
    if (result.total === 0) {
      const filtered = search || status
      return (
        <StatusMessage
          tone="empty"
          title={filtered ? 'Nobody matches your search' : 'The crew list is empty'}
          text={filtered ? 'Try another name or status.' : 'Add the first crew member.'}
          actionLabel={filtered ? 'Clear search' : '+ New member'}
          onAction={filtered ? () => setQuery(INITIAL_QUERY) : () => openForm(null)}
        />
      )
    }

    return (
      <>
        <CrewList
          items={result.data}
          selectedId={selectedId}
          pending={pending}
          onSelect={handleSelect}
          dimmed={listState === 'loading'}
        />
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          onChange={(p) => setQuery((q) => ({ ...q, page: p }))}
        />
      </>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className="logo">
            <span className="logo__mark" aria-hidden="true">✦</span>
            <div>
              <h1 className="logo__title">Orbit Crew</h1>
              <p className="logo__subtitle">Crew management for Orbital Station Alpha</p>
            </div>
          </div>
          <p className="header__net">
            Simulated network: {API_CONFIG.minDelay / 1000}–{API_CONFIG.maxDelay / 1000} s delay,{' '}
            {Math.round(API_CONFIG.errorChance * 100)}% errors
          </p>
        </div>
      </header>

      <main className={`layout${selectedId !== null ? ' layout--details-open' : ''}`}>
        <section className="panel list-panel" aria-label="Crew list">
          <Toolbar
            query={query}
            onChange={handleQueryChange}
            onReload={() => setListReload((n) => n + 1)}
            onCreate={() => openForm(null)}
            isLoading={listState === 'loading'}
          />
          <div className="list-panel__summary">
            {list.data && listState !== 'error' && (
              <span>
                {list.data.total} crew member{list.data.total === 1 ? '' : 's'}
              </span>
            )}
            {listState === 'loading' && list.data && <Spinner small label="Loading…" />}
          </div>
          {renderList()}
        </section>

        <section className="panel details-panel" aria-label="Details">
          <DetailsPanel
            key={selectedId ?? 'none'}
            state={detailsState}
            error={details.error}
            member={details.member}
            pendingAction={selectedId !== null ? pending[selectedId] : undefined}
            onRetry={() => setDetailsRequest((n) => n + 1)}
            onStatusChange={handleStatusChange}
            onEdit={openForm}
            onDelete={handleDelete}
            onBack={() => setSelectedId(null)}
          />
        </section>
      </main>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      {form && (
        <CrewForm
          key={form.member?.id ?? 'new'}
          member={form.member}
          saving={formSaving}
          error={formError}
          onSubmit={handleSave}
          onCancel={() => setForm(null)}
        />
      )}
    </div>
  )
}
