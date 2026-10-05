export const STORAGE_KEY = 'nat-watchlist-v1'

export function parseWatchlist(raw) {
  if (raw === null) return []
  const value = JSON.parse(raw)
  if (!value || value.version !== 1 || !Array.isArray(value.items)) throw new Error('Your saved list could not be read. Clear it to start again.')
  const seen = new Set()
  return value.items.map(item => {
    if (!item || !Number.isInteger(item.id) || item.id <= 0 || !['movie', 'tv'].includes(item.media_type) || typeof item.title !== 'string') {
      throw new Error('Your saved list contains invalid data. Clear it to start again.')
    }
    const key = `${item.media_type}:${item.id}`
    if (seen.has(key)) return null
    seen.add(key)
    return {
      id: item.id, media_type: item.media_type, title: item.title,
      poster_path: typeof item.poster_path === 'string' ? item.poster_path : null,
      release_date: typeof item.release_date === 'string' ? item.release_date : '',
      vote_average: typeof item.vote_average === 'number' && Number.isFinite(item.vote_average) ? item.vote_average : 0,
    }
  }).filter(Boolean)
}
