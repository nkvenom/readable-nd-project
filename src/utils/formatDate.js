/**
 *
 * @param {Date} date
 */
export function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  if (!date) return ''

  return date.toISOString().split('T')[0]
}
