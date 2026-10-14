const priceFormatter = new Intl.NumberFormat('ru-RU')

export function formatPrice(value) {
  return `${priceFormatter.format(value)} ₸`
}

export function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
