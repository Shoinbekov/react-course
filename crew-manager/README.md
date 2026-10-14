# Orbit Crew — Task 4: Effects & API

A React app for managing the crew of an orbital station. It works with the provided
[fake API](https://github.com/leravanna/fake-api) (Promises, random delays 0.5–3 s, random errors, `localStorage`)
as if it were a real backend.

**Live demo:** https://orbit-crew-lemon.vercel.app

## What you can do

- Browse the crew list (search by name / role / bio, filter by status, sort, paginate).
- Select a member — their full details are loaded asynchronously (13 fields).
- Change a member's status (**On duty / Off duty / On mission**) through the API.
- Create, edit and remove members.
- Reload the list with the **Reload** button.

## Requirements → implementation

| Requirement | Where |
|---|---|
| At least 7 detail fields shown in the UI | `DetailsPanel.jsx`: name, role, rank, bio, department, email, home planet, joined, missions, clearance level, skills, status |
| List loaded with `useEffect` | `App.jsx`, Effect 1 |
| Create, Edit, Remove | `handleSave`, `handleDelete` in `App.jsx`, `CrewForm.jsx` |
| Select item → load details asynchronously | `App.jsx`, Effect 2 (`getItem(id)`); the list returns only a short summary |
| Action that updates the selected item | `handleStatusChange` → `updateItem(id, { status })` |
| Loading / error / empty / success | list: skeleton, error + Try again, empty message, list; details: spinner, error + Try again, placeholder, data |
| Reload button | `Toolbar.jsx` → `setListReload(n => n + 1)` |
| Correct dependencies and cleanup | every effect lists all values it uses; cleanup sets `ignore = true` / clears the timer |
| No race conditions | an outdated response is ignored (`ignore` flag); each response is stored with the key of its request |
| Stale closures | the item id is captured when an action starts, functional `setState` updates, `pending` map blocks conflicting actions |

Only `useState` and `useEffect` are used. No custom hooks, no debouncing, no fetching libraries,
and components never touch `localStorage` — only the API does.

## How the tricky parts work

**Race conditions.** Clicking members A → B → C quickly starts three `getItem` requests.
Because delays are random, A's answer may arrive last. Each effect run has its own `ignore` variable;
the cleanup of the previous run sets it to `true`, so only C's answer is saved.
In addition, the stored response remembers which request it belongs to (`details.key`), and the panel shows
"loading" until the answer for the *current* request arrives.

**Stale closures.** `handleStatusChange(member, status)` saves `const id = member.id` before `await`.
When the response comes back (maybe after the user selected someone else), it updates the list row and the
details for *that id only* using functional updates (`setDetails(prev => prev.member?.id === id ? … : prev)`),
which read the latest state instead of the old value captured by the closure.
While a request for a member is running, `pending[id]` disables the status buttons, Edit and Remove for that member,
so two conflicting requests can't be sent.

**Derived loading state.** Loading is not stored in a separate variable. If the saved response key differs
from the key of the request we need now, we are loading.

## Changes to the starter API

The starter files are in `src/api/`. Following the "add other filter fields here" hint, the API was extended:

- `initial-data-sample.js` — 24 crew members with 13 fields each;
- `getItemsList` — filter by `status`, sorting by missions / join date, returns a short summary of each item
  (full data comes from `getItem`, so selecting an item really loads more data);
- `createItem` — saves all fields of the new item (the starter kept only `name` and `description`);
- `settings.js` — a new `DATA_KEY`. Delays (0.5–3 s) and the 5% error chance are unchanged.

To see errors more often set `errorChance: 0.3` in `src/api/settings.js`.
To reset the data delete the `crew-manager-data-v1` key in DevTools → Application → Local Storage.

## Project structure

```
src/
├── api/                fake API (fakeApi.js, settings.js, initial-data-sample.js)
├── components/
│   ├── Toolbar.jsx       search, status filter, sort, Reload, New member
│   ├── CrewList.jsx      list rows
│   ├── ListSkeleton.jsx  loading placeholders
│   ├── Pagination.jsx
│   ├── DetailsPanel.jsx  details, status action, Edit / Remove
│   ├── CrewForm.jsx      controlled create / edit form (modal)
│   ├── StatusBadge.jsx, StatusMessage.jsx, Spinner.jsx, Notice.jsx
├── constants.js
├── App.jsx             state, effects and API calls
└── main.jsx
```

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run lint
npm run build
```

Deploy (Vercel): import the repository, set **Root Directory** to this folder, preset **Vite**, Deploy.
