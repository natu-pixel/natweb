import { useState, useEffect } from 'react'
import './HeroPosterGrid.css'

const TMDB_KEY = '37586a948665ac34688279aea2a69dc2'
const BACKDROP = 'https://image.tmdb.org/t/p/w780'
const POSTER   = 'https://image.tmdb.org/t/p/w342'
const API      = 'https://api.themoviedb.org/3'

export default function HeroPosterGrid() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Fetch trending to get rich items with backdrops AND posters
    Promise.all([
      fetch(`${API}/trending/movie/week?api_key=${TMDB_KEY}&language=en-US`).then(r => r.json()),
      fetch(`${API}/trending/tv/week?api_key=${TMDB_KEY}&language=en-US`).then(r => r.json()),
    ]).then(([mov, tv]) => {
      const combined = [
        ...(mov.results || []),
        ...(tv.results || []),
      ].filter(i => i.poster_path)
      // shuffle
      combined.sort(() => Math.random() - 0.5)
      setItems(combined.slice(0, 9))
    }).catch(() => {})
  }, [])

  if (!items.length) {
    return (
      <div className="hero-grid hero-grid--loading" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="hero-grid__skeleton" />
        ))}
      </div>
    )
  }

  return (
    <div className="hero-grid" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`hero-grid__poster hero-grid__poster--${i}`}
          style={{ '--i': i }}
        >
          <img
            src={`${POSTER}${item.poster_path}`}
            alt=""
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
          {/* subtle top-rated badge on a few */}
          {item.vote_average > 7.5 && i < 5 && (
            <span className="hero-grid__rating">★ {item.vote_average.toFixed(1)}</span>
          )}
        </div>
      ))}
      {/* Gradient fade left so text is readable */}
      <div className="hero-grid__fade" />
    </div>
  )
}
