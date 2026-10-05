import { imageUrl, mediaKey } from '../lib/tmdb'
import './HeroPosterGrid.css'

export default function HeroPosterGrid({ items = [] }) {
  return <div className="hero-grid" aria-hidden="true">{items.filter(item => item.poster_path).slice(0, 3).map((item, index) => <div key={mediaKey(item)} className={`hero-grid__poster hero-grid__poster--${index}`}><img src={imageUrl(item.poster_path)} alt="" loading="lazy" width="342" height="513" onError={event => { event.currentTarget.style.display = 'none' }} /></div>)}</div>
}
