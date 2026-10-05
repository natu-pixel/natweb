import { useState } from 'react'
import { Link } from 'react-router-dom'
import useTMDB from '../hooks/useTMDB'
import { imageUrl, titleOf } from '../lib/tmdb'
import Dialog from './Dialog'
import DataState from './DataState'
import useWatchlist from '../hooks/useWatchlist'

export default function MovieDetails({ item, onClose, onSelect }) {
  const { data, loading, error, retry } = useTMDB(`/${item.media_type}/${item.id}`, { append_to_response: 'videos,credits,recommendations' })
  const { has, toggle } = useWatchlist()
  const [playTrailer, setPlayTrailer] = useState(false)
  const title = titleOf(data || item)
  const trailer = data?.videos?.results?.find(video => video.site === 'YouTube' && video.type === 'Trailer' && video.official && /^[\w-]{11}$/.test(video.key))
  const related = (data?.recommendations?.results || []).slice(0, 5)

  return (
    <Dialog title={title} onClose={onClose} className="title-dialog">
      <div className="title-dialog__backdrop">
        {data?.backdrop_path ? <img src={imageUrl(data.backdrop_path, 'w1280')} alt="" onError={event => { event.currentTarget.style.display = 'none' }} /> : null}
        <span className="eyebrow">{item.media_type === 'movie' ? 'THE FILM FILE' : 'THE SERIES FILE'}</span>
      </div>
      <div className="title-dialog__body">
        <h2>{title}</h2>
        <DataState loading={loading} error={error} retry={retry} compact />
        {data && <>
          <p className="title-dialog__meta">{(data.release_date || data.first_air_date || '').slice(0, 4) || 'Date TBA'} · {data.vote_average > 0 ? `${data.vote_average.toFixed(1)} / 10` : 'Unrated'}{data.runtime ? ` · ${data.runtime} min` : ''}{data.number_of_seasons ? ` · ${data.number_of_seasons} seasons` : ''}</p>
          <div className="genre-pills">{data.genres?.map(genre => <span key={genre.id}>{genre.name}</span>)}</div>
          <p className="title-dialog__overview">{data.overview || 'A synopsis is not available for this title yet.'}</p>
          <div className="title-dialog__actions">
            <button className="btn btn-primary" onClick={() => setPlayTrailer(true)} disabled={!trailer}>{trailer ? 'Play official trailer' : 'No official trailer available'}</button>
            <button className="btn btn-outline" aria-pressed={has(item)} onClick={() => toggle(item)}>{has(item) ? 'Remove from watchlist' : '+ Add to watchlist'}</button>
          </div>
          {playTrailer && trailer && <div className="trailer-player"><iframe src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=0`} title={`${title} official trailer`} allow="encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /><a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer">Trailer not loading? Open on YouTube ↗</a></div>}
          <div className="title-dialog__cast"><span className="eyebrow">Starring</span><p>{data.credits?.cast?.slice(0, 6).map(person => person.name).join(' · ') || 'Cast information is not available.'}</p></div>
          {related.length > 0 && <div className="title-dialog__related"><span className="eyebrow">More to explore</span><div>{related.map(movie => <button key={movie.id} onClick={() => onSelect({ ...movie, media_type: item.media_type })}>{titleOf(movie)} ↗</button>)}</div></div>}
        </>}
        <p className="catalog-note">Metadata by TMDB. This discovery listing does not confirm availability on NAT. <Link to="/subscriptions" onClick={onClose}>Explore our plans</Link> or contact support to check a title.</p>
      </div>
    </Dialog>
  )
}
