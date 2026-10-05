const API = 'https://api.themoviedb.org/3'
const cache = new Map()
const pending = new Map()

export const mediaKey = item => `${item.media_type}:${item.id}`
export const titleOf = item => item.title || item.name || 'Untitled'
export const imageUrl = (path, size = 'w342') => path ? `https://image.tmdb.org/t/p/${size}${path}` : null

export async function getTMDB(endpoint, params = {}, signal) {
  if (signal?.aborted) throw new DOMException('Request cancelled', 'AbortError')
  const key = import.meta.env.VITE_TMDB_API_KEY
  if (!key) throw new Error('Movie discovery is not configured yet. Add VITE_TMDB_API_KEY to your local environment. Our plans and contact channels are still available.')
  const query = new URLSearchParams({ api_key: key, language: 'en-US', ...params })
  const url = `${API}${endpoint}?${query}`
  const saved = cache.get(url)
  if (saved && Date.now() - saved.time < 300000) return saved.data
  let entry = pending.get(url)
  if (!entry) {
    const controller = new AbortController()
    entry = { controller, clients: new Set(), settled: false }
    const current = entry
    let timedOut = false
    const timer = setTimeout(() => { timedOut = true; controller.abort() }, 15000)
    current.promise = fetch(url, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(response.status === 401 ? 'Movie discovery could not authenticate. Please check the TMDB configuration.' : 'Movie discovery is temporarily unavailable. Please try again.')
        const data = await response.json()
        const valid = endpoint.includes('/genre/') ? Array.isArray(data?.genres)
          : /^\/(movie|tv)\/\d+$/.test(endpoint) ? Number.isInteger(data?.id)
          : Array.isArray(data?.results)
        if (!valid || data.success === false) throw new Error('Movie discovery returned an invalid response. Please try again.')
        cache.set(url, { data, time: Date.now() })
        if (cache.size > 100) cache.delete(cache.keys().next().value)
        return data
      })
      .catch(error => {
        if (timedOut) throw new Error('Movie discovery took too long to respond. Please try again.')
        if (error instanceof TypeError) throw new Error('Could not connect to movie discovery. Check your connection and try again.')
        throw error
      })
      .finally(() => {
        clearTimeout(timer)
        current.settled = true
        if (pending.get(url) === current) pending.delete(url)
      })
    pending.set(url, current)
  }
  const client = Symbol()
  entry.clients.add(client)
  return new Promise((resolve, reject) => {
    const release = () => {
      signal?.removeEventListener('abort', abort)
      entry.clients.delete(client)
      if (!entry.clients.size && !entry.settled) {
        if (pending.get(url) === entry) pending.delete(url)
        entry.controller.abort()
      }
    }
    const abort = () => { release(); reject(new DOMException('Request cancelled', 'AbortError')) }
    signal?.addEventListener('abort', abort, { once: true })
    entry.promise.then(value => { release(); resolve(value) }, error => { release(); reject(error) })
  })
}

export function normalizeResults(data, type) {
  if (!Array.isArray(data.results)) throw new Error('Movie discovery returned an invalid title list. Please try again.')
  return data.results
    .map(item => ({ ...item, media_type: type || item.media_type }))
    .filter(item => ['movie', 'tv'].includes(item.media_type) && Number.isInteger(item.id))
}
