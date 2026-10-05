import { useEffect, useRef, useState } from 'react'
import useTMDB from '../hooks/useTMDB'
import { imageUrl } from '../lib/tmdb'
import DataState from './DataState'
import './PosterMarquee.css'

export default function PosterMarquee() {
  const { data, loading, error, retry } = useTMDB('/trending/all/week')
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const items = (data?.results || []).filter(item => item.poster_path && ['movie', 'tv'].includes(item.media_type)).slice(0, 12)

  useEffect(() => {
    let visible = false
    const update = () => setActive(visible && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(ref.current)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  return <div className="marquee" ref={ref}>
    <DataState loading={loading} error={error} retry={retry} empty={!loading && !error && !items.length} />
    {items.length > 0 && <>
      <div className={`marquee__wrapper ${paused || !active ? 'marquee--paused' : ''}`}>
        <div className="marquee__track" aria-hidden="true">{[...items, ...items, ...items].map((item, index) => <div className="marquee__poster" key={`${item.media_type}-${item.id}-${index}`}><img src={imageUrl(item.poster_path)} alt="" loading="lazy" width="342" height="513" onError={event => { event.currentTarget.style.visibility = 'hidden' }} /></div>)}</div>
      </div>
      <button className="marquee__control" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Resume poster motion' : 'Pause poster motion'}</button>
    </>}
  </div>
}
