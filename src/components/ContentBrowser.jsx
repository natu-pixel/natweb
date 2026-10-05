import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useTMDB from '../hooks/useTMDB'
import { mediaKey, normalizeResults } from '../lib/tmdb'
import MovieCard from './MovieCard'
import MovieDetails from './MovieDetails'
import DataState from './DataState'
import useWatchlist from '../hooks/useWatchlist'
import './ContentBrowser.css'

export default function ContentBrowser({ preview = false }) {
  const [type, setType] = useState('movie')
  const [mode, setMode] = useState('trending')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [sort, setSort] = useState('popularity.desc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const { items: saved, error: storageError } = useWatchlist()
  const genres = useTMDB(`/genre/${type}/list`)

  useEffect(() => {
    const timer = setTimeout(() => { setQuery(search.trim()); setPage(1) }, 350)
    return () => clearTimeout(timer)
  }, [search])

  const isDiscover = !query && (genre || mode === 'explore')
  const endpoint = query ? `/search/${type}` : isDiscover ? `/discover/${type}` : mode === 'top' ? `/${type}/top_rated` : `/trending/${type}/week`
  const params = {
    page,
    include_adult: 'false',
    ...(query ? { query } : {}),
    ...(isDiscover ? { sort_by: sort, ...(genre ? { with_genres: genre } : {}), ...(sort === 'vote_average.desc' ? { 'vote_count.gte': 200 } : {}) } : {}),
  }
  const { data, loading, error, retry } = useTMDB(endpoint, params)
  let items = []
  let resultError = error
  if (data) {
    try { items = normalizeResults(data, type) } catch (failure) { resultError = failure.message }
  }
  if (preview) items = items.slice(0, 6)
  const totalPages = Math.min(data?.total_pages || 0, 500)

  function reset(setter, value) {
    setter(value)
    setPage(1)
  }

  function changeType(nextType) {
    setType(nextType)
    setGenre('')
    setSort('popularity.desc')
    setPage(1)
  }

  return (
    <div className="cbrowser">
      <div className="cbrowser__toolbar">
        <div className="segmented" role="group" aria-label="Title type">
          <button aria-pressed={type === 'movie'} onClick={() => changeType('movie')}>Movies</button>
          <button aria-pressed={type === 'tv'} onClick={() => changeType('tv')}>TV series</button>
        </div>
        <Link className="saved-link" to="/watchlist">My watchlist <span>{saved.length}</span></Link>
      </div>
      {!preview && <div className="cbrowser__filters">
        <label className="search-field"><span>Search titles</span><input aria-label="Search titles" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="What are you in the mood for?" /></label>
        <label><span>Collection</span><select aria-label="Collection" value={mode} disabled={Boolean(query)} onChange={event => reset(setMode, event.target.value)}><option value="trending">Trending this week</option><option value="top">Top rated</option><option value="explore">Explore all</option></select></label>
        <label><span>Genre</span><select aria-label="Genre" value={genre} disabled={Boolean(query) || Boolean(genres.error) || genres.loading} onChange={event => reset(setGenre, event.target.value)}><option value="">All genres</option>{genres.data?.genres?.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <label><span>Sort</span><select aria-label="Sort" value={sort} disabled={Boolean(query) || !isDiscover} onChange={event => reset(setSort, event.target.value)}><option value="popularity.desc">Most popular</option><option value="vote_average.desc">Highest rated</option><option value={type === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc'}>Newest first</option></select></label>
      </div>}
      {genres.error && !preview && <div className="inline-notice" role="alert">Genre filters are unavailable. <button onClick={genres.retry}>Retry genres</button></div>}
      {storageError && <p role="alert" className="inline-notice">{storageError}</p>}
      {!preview && <div className="cbrowser__status"><span>{query ? `Results for "${query}" · ordered by relevance` : genre ? 'Exploring your selected genre' : mode === 'top' ? 'Audience favourites' : mode === 'explore' ? 'Discover something new' : 'In the conversation this week'}</span><span>Page {page}</span></div>}
      {query && !preview && <p className="catalog-note">Title search uses TMDB relevance. Clear your search to use genre filters and discovery sorting.</p>}
      <DataState loading={loading || search.trim() !== query} error={resultError} retry={retry} empty={!items.length && !loading && !resultError} />
      {!loading && !resultError && search.trim() === query && <div className="movie-grid">{items.map((item, index) => <MovieCard key={mediaKey(item)} item={item} index={index} onSelect={setSelected} />)}</div>}
      {!preview && !loading && !resultError && totalPages > 1 && <nav className="pagination" aria-label="Result pages"><button className="btn btn-outline btn-sm" disabled={page === 1} onClick={() => setPage(value => value - 1)}>Previous</button><span aria-live="polite">{page} / {totalPages}</span><button className="btn btn-outline btn-sm" disabled={page >= totalPages} onClick={() => setPage(value => value + 1)}>Next page →</button></nav>}
      <p className="catalog-note">Powered by TMDB. NAT is not endorsed or certified by TMDB. Titles are for discovery; contact us to confirm availability.</p>
      {selected && <MovieDetails key={mediaKey(selected)} item={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}
    </div>
  )
}
