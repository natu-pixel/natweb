import { useState, useEffect } from 'react'
import './ContentBrowser.css'

const TMDB_KEY = '37586a948665ac34688279aea2a69dc2'
const POSTER   = 'https://image.tmdb.org/t/p/w342'
const API      = 'https://api.themoviedb.org/3'

const TABS = [
  { id: 'trending-movies', label: 'Trending Movies', endpoint: '/trending/movie/week', type: 'movie' },
  { id: 'trending-tv',     label: 'Trending TV',     endpoint: '/trending/tv/week',    type: 'tv'    },
  { id: 'top-movies',      label: 'Top Rated Films', endpoint: '/movie/top_rated',     type: 'movie' },
  { id: 'top-tv',          label: 'Top TV Shows',    endpoint: '/tv/top_rated',        type: 'tv'    },
]

export default function ContentBrowser() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const [cache, setCache]         = useState({})
  const [loading, setLoading]     = useState(false)

  const tab = TABS.find(t => t.id === activeTab)

  useEffect(() => {
    if (cache[activeTab]) return
    setLoading(true)
    fetch(`${API}${tab.endpoint}?api_key=${TMDB_KEY}&language=en-US&page=1`)
      .then(r => r.json())
      .then(d => {
        const results = (d.results || []).filter(i => i.poster_path)
        setCache(prev => ({ ...prev, [activeTab]: results }))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [activeTab])

  const items = cache[activeTab] || []

  return (
    <div className="cbrowser" aria-label="Content browser">
      {/* Tabs */}
      <div className="cbrowser__tabs" role="tablist" aria-label="Content categories">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`cbrowser__tab ${activeTab === t.id ? 'cbrowser__tab--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            id={`content-tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className={`cbrowser__grid ${loading ? 'cbrowser__grid--loading' : ''}`}
        role="tabpanel"
        aria-labelledby={`content-tab-${activeTab}`}
      >
        {loading
          ? [...Array(18)].map((_, i) => (
              <div key={i} className="cbrowser__skeleton" />
            ))
          : items.slice(0, 18).map(item => (
              <div key={item.id} className="cbrowser__card" aria-label={item.title || item.name}>
                <div className="cbrowser__card-img-wrap">
                  <img
                    src={`${POSTER}${item.poster_path}`}
                    alt={item.title || item.name}
                    loading="lazy"
                    decoding="async"
                    className="cbrowser__card-img"
                  />
                  <div className="cbrowser__card-overlay">
                    <div className="cbrowser__card-meta-top">
                      <span className="cbrowser__card-rating">
                        ★ {item.vote_average?.toFixed(1)}
                      </span>
                      <span className="cbrowser__card-res">4K UHD</span>
                    </div>
                    <span className={`cbrowser__card-type cbrowser__card-type--${tab.type}`}>
                      {tab.type === 'movie' ? 'Movie' : 'Series'}
                    </span>
                  </div>
                </div>
                <p className="cbrowser__card-title">{item.title || item.name}</p>
                <p className="cbrowser__card-year">
                  {(item.release_date || item.first_air_date || '').slice(0, 4)}
                </p>
              </div>
            ))
        }
      </div>

      <p className="cbrowser__note">
        Powered by TMDB · Content availability may vary by region · All titles shown are available on NAT Entertainment
      </p>
    </div>
  )
}
