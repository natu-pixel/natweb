import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import Logo from './Logo'
import useWatchlist from '../hooks/useWatchlist'

const NAV_LINKS = [
  { to: '/discover', label: 'Discover' },
  { to: '/subscriptions', label: 'Subscriptions'  },
  { to: '/reseller',      label: 'Reseller'       },
]

export default function Navbar() {
  const { items } = useWatchlist()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!menuOpen) return
    function close(event) { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content').focus() }}>Skip to content</a>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="NAT Entertainment Home">
          <Logo />
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/watchlist" className="navbar__watchlist" aria-label={`Watchlist, ${items.length} saved titles`}><span aria-hidden="true">＋</span><span className="navbar__watchlist-text">My list</span><span className="navbar__count">{items.length}</span></NavLink>
          <Link to="/subscriptions" className="btn btn-primary btn-sm navbar__cta">
            Browse Plans
          </Link>
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className="navbar__mobile-links">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/subscriptions" className="btn btn-primary w-full" style={{ justifyContent: 'center', marginTop: '8px' }}>
            Browse Plans
          </Link>
        </nav>
      </div>
    </header>
  )
}
