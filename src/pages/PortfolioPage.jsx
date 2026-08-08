import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from '../components/Icons'
import './PortfolioPage.css'

const PROJECTS = [
  {
    id:       'trading-bot',
    category: 'Automation',
    title:    'Algorithmic Trading Bot',
    desc:     'A fully automated trading bot built with Python that executes trades based on custom strategies. Integrates with major crypto and forex APIs, with real-time profit/loss tracking and configurable risk management.',
    tags:     ['Python', 'REST API', 'Algorithmic Trading', 'Crypto'],
    img:      '/portfolio_tradingbot.jpg',
    result:   'Automated execution, 24/7',
  },
  {
    id:       'streaming-app',
    category: 'Media',
    title:    'NAT Streaming Application',
    desc:     'A cross-platform IPTV streaming app supporting live TV, VOD, and catch-up TV. Built with a custom HLS player, EPG guide, multi-device login, and subscription management backend.',
    tags:     ['React', 'HLS.js', 'Node.js', 'IPTV'],
    img:      '/portfolio_streamapp.jpg',
    result:   '150+ active subscribers',
  },
  {
    id:       'restaurant-site',
    category: 'Web Design',
    title:    'Fine Dining Restaurant Website',
    desc:     'A premium restaurant website with online reservation system, interactive menu, dark luxury aesthetic, and a custom admin panel for managing bookings and menu items.',
    tags:     ['React', 'Node.js', 'MySQL', 'UI/UX'],
    img:      '/portfolio_restaurant.jpg',
    result:   'Bookings up 60% post-launch',
  },
  {
    id:       'network-infra',
    category: 'Networking',
    title:    'Network Infrastructure Setup',
    desc:     'Enterprise network design and implementation including router configuration, VLAN segmentation, firewall setup, and remote monitoring dashboard for a growing business.',
    tags:     ['Cisco', 'Network Design', 'Firewall', 'Monitoring'],
    img:      '/portfolio_networking.jpg',
    result:   'Zero downtime deployment',
  },
]

const CATEGORIES = ['All', 'Automation', 'Media', 'Web Design', 'Networking']

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeProject, setActiveProject]   = useState(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeProject])

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <div className="portfolio">
      {/* ── Hero ──────────────────────────── */}
      <section className="page-hero" aria-label="Portfolio">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="container page-hero__content">
          <span className="badge badge-purple animate-fade-in-up">Our Work</span>
          <h1 className="section-title animate-fade-in-up delay-100">
            Real Projects,<br /><span className="text-gradient">Real Results</span>
          </h1>
          <div className="divider divider-center" />
          <p className="section-subtitle animate-fade-in-up delay-200">
            Trading bots, streaming platforms, restaurant websites, network infrastructure — built by a Computer Science engineer who understands the full stack.
          </p>
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────── */}
      <section className="portfolio__grid-section section" aria-label="Project gallery">
        <div className="container">
          {/* Filter tabs */}
          <div className="portfolio__filters" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`portfolio__filter-btn ${activeCategory === cat ? 'portfolio__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="portfolio__grid">
            {filtered.map(project => (
              <article
                key={project.id}
                className="portfolio__card"
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveProject(project)}
                aria-label={`View ${project.title} case study`}
              >
                <div className="portfolio__card-img-wrap">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="portfolio__card-img"
                    loading="lazy"
                  />
                  <div className="portfolio__card-overlay">
                    <span className="portfolio__card-view">
                      View Case Study <IconArrowRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="portfolio__card-body">
                  <span className="badge badge-purple">{project.category}</span>
                  <h2 className="portfolio__card-title">{project.title}</h2>
                  <p className="portfolio__card-desc">{project.desc}</p>
                  <div className="portfolio__card-tags">
                    {project.tags.map(t => (
                      <span key={t} className="portfolio__card-tag">{t}</span>
                    ))}
                  </div>
                  <div className="portfolio__card-result">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    <span>{project.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────── */}
      <section className="portfolio__cta section-sm" aria-label="Hire us">
        <div className="container text-center">
          <div className="portfolio__cta-inner glass-strong">
            <p className="section-eyebrow">Have a Project in Mind?</p>
            <h2 className="section-title">
              Let's Build Something <span className="text-gradient">Exceptional</span>
            </h2>
            <p className="section-subtitle">
              Tell us about your project and we'll put together a proposal — no obligation.
            </p>
            <Link to="/services" className="btn btn-primary btn-lg mt-lg">
              Get a Free Quote <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Case Study Modal ──────────────── */}
      {activeProject && (
        <div
          className="portfolio__modal-overlay"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} case study`}
        >
          <div
            className="portfolio__modal glass-strong"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="portfolio__modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close case study"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <img
              src={activeProject.img}
              alt={activeProject.title}
              className="portfolio__modal-img"
            />
            <div className="portfolio__modal-body">
              <span className="badge badge-purple">{activeProject.category}</span>
              <h2 className="portfolio__modal-title">{activeProject.title}</h2>
              <p className="portfolio__modal-desc">{activeProject.desc}</p>

              <div className="portfolio__modal-tags">
                {activeProject.tags.map(t => (
                  <span key={t} className="portfolio__card-tag">{t}</span>
                ))}
              </div>

              <div className="portfolio__modal-result glass">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <span>Key Result:</span>
                <strong className="text-gradient">{activeProject.result}</strong>
              </div>

              <Link to="/services" className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => setActiveProject(null)}>
                Start Your Project <IconArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
