import { useEffect, useState } from 'react'
import { mediaKey, titleOf } from '../lib/tmdb'
import { parseWatchlist, STORAGE_KEY } from '../lib/watchlist'
import WatchlistContext from '../lib/WatchlistContext'

export function WatchlistProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      return { items: parseWatchlist(localStorage.getItem(STORAGE_KEY)), error: '' }
    } catch (error) {
      return { items: [], error: `Saved list unavailable: ${error.message}` }
    }
  })

  useEffect(() => {
    function sync(event) {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      try {
        setState({ items: parseWatchlist(localStorage.getItem(STORAGE_KEY)), error: '' })
      } catch (error) {
        setState(previous => ({ ...previous, error: `Saved list could not sync: ${error.message}` }))
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  function update(items) {
    let error = ''
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items }))
    } catch {
      error = 'Your list changed for this visit, but could not be saved on this device. Check your browser storage settings.'
    }
    setState({ items, error })
  }

  function toggle(item) {
    const exists = state.items.some(saved => mediaKey(saved) === mediaKey(item))
    update(exists ? state.items.filter(saved => mediaKey(saved) !== mediaKey(item)) : [
      ...state.items,
      {
        id: item.id, media_type: item.media_type, title: titleOf(item),
        poster_path: item.poster_path || null, release_date: item.release_date || item.first_air_date || '',
        vote_average: item.vote_average || 0,
      },
    ])
  }

  return <WatchlistContext.Provider value={{ ...state, toggle, clear: () => update([]), has: item => state.items.some(saved => mediaKey(saved) === mediaKey(item)) }}>{children}</WatchlistContext.Provider>
}
