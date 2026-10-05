import { useContext } from 'react'
import WatchlistContext from '../lib/WatchlistContext'

export default function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) throw new Error('Watchlist controls must be inside WatchlistProvider.')
  return context
}
