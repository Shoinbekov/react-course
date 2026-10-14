export const PAGE_SIZE = 8

export const STATUSES = [
  { value: 'on-duty', label: 'On duty' },
  { value: 'off-duty', label: 'Off duty' },
  { value: 'on-mission', label: 'On mission' },
]

export const DEPARTMENTS = ['Engineering', 'Flight', 'Logistics', 'Medical', 'Operations', 'Science', 'Security']

export const RANKS = ['Ensign', 'Lieutenant', 'Commander', 'Captain']

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
  { value: 'missions-desc', label: 'Most missions' },
  { value: 'joined-desc', label: 'Newest crew' },
]

export function statusLabel(value) {
  return STATUSES.find((s) => s.value === value)?.label ?? value
}
