import { imageUrl, titleOf } from '../lib/tmdb'
import useWatchlist from '../hooks/useWatchlist'

export default function MovieCard({ item, onSelect, index = 0 }) {
  const { has, toggle } = useWatchlist()
  const saved = has(item)
  const title = titleOf(item)
  return (
    <article className="movie-card" style={{ '--card-delay': `${Math.min(index, 7) * 45}ms` }}>
      <div className="movie-card__art">
        <button className="movie-card__open" onClick={() => onSelect(item)} aria-label={`View ${title}`}>
          {item.poster_path ? <img src={imageUrl(item.poster_path)} alt="" loading="lazy" width="342" height="513" onError={event => { event.currentTarget.style.display = 'none' }} /> : null}
          <span className="movie-card__fallback">{title}</span>
          <span className="movie-card__shade" />
          <span className="movie-card__view">Explore title <span aria-hidden="true">↗</span></span>
        </button>
        <span className="movie-card__rating">{item.vote_average > 0 ? `${item.vote_average.toFixed(1)} / 10` : 'Unrated'}</span>
        <button className={`movie-card__save ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Save'} ${title}${saved ? ' from' : ' to'} your watchlist`} aria-pressed={saved} onClick={() => toggle(item)}>{saved ? '✓' : '+'}</button>
      </div>
      <button className="movie-card__title" onClick={() => onSelect(item)}>{title}</button>
      <p className="movie-card__meta">{(item.release_date || item.first_air_date || '').slice(0, 4) || 'Date TBA'}<span />{item.media_type === 'tv' ? 'Series' : 'Film'}</p>
    </article>
  )
}
