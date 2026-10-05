import { useState } from 'react'
import { Link } from 'react-router-dom'
import useWatchlist from '../hooks/useWatchlist'
import MovieCard from '../components/MovieCard'
import MovieDetails from '../components/MovieDetails'
import Dialog from '../components/Dialog'
import { mediaKey } from '../lib/tmdb'

export default function WatchlistPage() {
  const { items, clear, error } = useWatchlist()
  const [selected, setSelected] = useState(null)
  const [confirm, setConfirm] = useState(false)
  return <section className="discover-page"><div className="container">
    <header className="discover-page__heading watchlist-heading"><div><span className="eyebrow">YOUR PERSONAL COLLECTION</span><h1>For another<br /><em>movie night.</em></h1><p>{items.length} saved {items.length === 1 ? 'title' : 'titles'}. Stored on this device only, no account needed.</p></div>{(items.length > 0 || error) && <button className="btn btn-outline btn-sm" onClick={() => setConfirm(true)}>Clear watchlist</button>}</header>
    {error && <p role="alert" className="inline-notice">{error}</p>}
    {items.length ? <div className="movie-grid">{items.map((item, index) => <MovieCard key={mediaKey(item)} item={item} index={index} onSelect={setSelected} />)}</div> : <div className="watchlist-empty"><h2>A great story starts here.</h2><p>Save a film or series with the + button. Come back when it's time to choose.</p><Link to="/discover" className="btn btn-primary">Find something to watch →</Link></div>}
    {selected && <MovieDetails key={mediaKey(selected)} item={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}
    {confirm && <Dialog title="Clear your watchlist" onClose={() => setConfirm(false)} className="confirm-dialog"><h2>Start a fresh list?</h2><p>This removes all saved titles from this device. It cannot be undone.</p><div className="confirm-dialog__actions"><button className="btn btn-primary" onClick={() => { clear(); setConfirm(false) }}>Clear all titles</button><button className="btn btn-outline" onClick={() => setConfirm(false)}>Keep my list</button></div></Dialog>}
  </div></section>
}
