import { useState, useEffect } from 'react'
import './PosterMarquee.css'

const TMDB_KEY = '37586a948665ac34688279aea2a69dc2'
const IMG_BASE = 'https://image.tmdb.org/t/p/w342'
const API      = 'https://api.themoviedb.org/3'

function useTMDB(endpoint) {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`${API}${endpoint}?api_key=${TMDB_KEY}&language=en-US&page=1`)
      .then(r => r.json())
      .then(d => setData((d.results || []).filter(i => i.poster_path)))
      .catch(() => {})
  }, [endpoint])
  return data
}

function PosterRow({ items, direction = 'left', speed = 50 }) {
  if (!items.length) return null
  // triple for perfectly seamless loop at any screen width
  const tripled = [...items, ...items, ...items]
  return (
    <div className="marquee__wrapper">
      <div
        className={`marquee__track marquee__track--${direction}`}
        style={{ '--speed': `${speed}s` }}
        aria-hidden="true"
      >
        {tripled.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="marquee__poster">
            <img
              src={`${IMG_BASE}${item.poster_path}`}
              alt=""
              loading="lazy"
              draggable="false"
              decoding="async"
            />
            <div className="marquee__poster-hover">
              <span className="marquee__poster-rating">★ {item.vote_average?.toFixed(1)}</span>
              <span className="marquee__poster-title">{item.title || item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PosterMarquee() {
  const movies  = useTMDB('/movie/popular')
  const tv      = useTMDB('/tv/popular')
  const topMov  = useTMDB('/movie/top_rated')

  const loading = !movies.length && !tv.length

  return (
    <div className="marquee" aria-hidden="true">
      {loading ? (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      ) : (
        <>
          <PosterRow items={movies} direction="left"  speed={60} />
          <PosterRow items={tv}     direction="right" speed={52} />
          <PosterRow items={topMov} direction="left"  speed={70} />
        </>
      )}
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="marquee__wrapper">
      <div className="marquee__skeleton-row">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="marquee__skeleton-card" />
        ))}
      </div>
    </div>
  )
}
