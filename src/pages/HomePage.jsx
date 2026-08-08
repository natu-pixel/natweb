import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconTv, IconHandshake, IconPalette, IconCheck, IconArrowRight, IconZap, IconGlobe, IconShield, IconUsers, IconStar } from '../components/Icons'
import PosterMarquee from '../components/PosterMarquee'
import HeroPosterGrid from '../components/HeroPosterGrid'
import './HomePage.css'

const STATS = [
  { value: '150+',  label: 'Active Subscribers' },
  { value: '20+',   label: 'Reseller Partners'  },
  { value: '99.9%', label: 'Uptime Guarantee'   },
  { value: '4K',    label: 'Ultra HD Quality'   },
]

const PATH_CARDS = [
  {
    id:      'subscriptions',
    Icon:    IconTv,
    badge:   '4K Streaming',
    title:   'IPTV Subscriptions',
    desc:    'Thousands of live channels, movies, and TV shows in 4K Ultra HD — no ads, multi-device, instant activation.',
    features: ['4K Ultra HD & HDR', 'Multi-device access', 'Ad-free experience', 'Instant activation'],
    cta:     'Browse Plans',
    to:      '/subscriptions',
    accent:  'purple',
  },
  {
    id:      'reseller',
    Icon:    IconHandshake,
    badge:   'IPTV Reseller',
    title:   'Reseller Program',
    desc:    'Buy IPTV credit packages wholesale and sell subscriptions to your own customers at your own price. Start from $100.',
    features: ['30–100 credits per package', 'Credits never expire', 'Reseller dashboard', 'High profit margins'],
    cta:     'Start Reselling',
    to:      '/reseller',
    accent:  'gold',
  },
  {
    id:      'services',
    Icon:    IconPalette,
    badge:   'Web & Dev',
    title:   'Web Design Services',
    desc:    'From trading bots to restaurant websites — professional software built by a Computer Science graduate.',
    features: ['Custom web applications', 'Trading bots & automation', 'Network infrastructure', 'Ongoing support'],
    cta:     'See Services',
    to:      '/services',
    accent:  'blue',
  },
]

const TESTIMONIALS = [
  {
    name:  'Marcus T.',
    role:  'Reseller Partner',
    quote: 'NAT Entertainment\'s reseller program is straightforward and profitable. Credits are activated instantly and the support is always there.',
    init:  'M',
  },
  {
    name:  'Amelia R.',
    role:  'Subscriber',
    quote: 'Truly buffer-free 4K on all my devices. I\'ve tried others — NAT Entertainment is in a completely different league.',
    init:  'A',
  },
  {
    name:  'David K.',
    role:  'Web Design Client',
    quote: 'The team built exactly what I needed, on time, and the code quality is excellent. Clear communication throughout.',
    init:  'D',
  },
]

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Inline icon helpers
function IconTelegram({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.607c-.15.666-.543.832-1.1.517l-3.03-2.233-1.463 1.41c-.162.163-.298.298-.61.298l.217-3.083 5.607-5.066c.244-.217-.053-.337-.376-.12L7.12 14.41l-2.99-.934c-.65-.204-.664-.65.135-.962l11.67-4.5c.541-.196 1.014.132.627 2.234z"/></svg>
}
function IconWhatsApp({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
}
function IconMail({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
function IconCode({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}

export default function HomePage() {
  useScrollReveal()

  return (
    <div className="home">
      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="home__hero" aria-label="Welcome to NAT Entertainment">
        <div className="home__hero-glow" aria-hidden="true" />

        {/* Floating particles */}
        <div className="home__particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`home__particle home__particle--${i + 1}`} />
          ))}
        </div>

        <div className="container home__hero-inner">
          {/* Left: text */}
          <div className="home__hero-content">
            <div className="animate-fade-in-up">
              <span className="badge badge-gold">Premium IPTV · Reseller · Web Services</span>
            </div>

            <h1 className="home__hero-title animate-fade-in-up delay-100">
              Watch Everything.<br />
              <span className="text-gradient-gold">Anywhere. Anytime.</span>
            </h1>

            <p className="home__hero-subtitle animate-fade-in-up delay-200">
              NAT Entertainment delivers 20,000+ live channels, movies, and series in stunning 4K — plus a profitable IPTV reseller program and professional web development services.
            </p>

            <div className="home__hero-ctas animate-fade-in-up delay-300">
              <Link to="/subscriptions" className="btn btn-gold btn-lg">
                Browse Plans <IconArrowRight size={18} />
              </Link>
              <Link to="/reseller" className="btn btn-outline btn-lg">
                Become a Reseller
              </Link>
            </div>

            <div className="home__hero-contact animate-fade-in-up delay-400">
              <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer" className="home__hero-contact-link">
                <IconTelegram /> @NATENTERTAINMENTSUPPORT
              </a>
              <span className="home__hero-contact-divider">·</span>
              <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer" className="home__hero-contact-link">
                <IconWhatsApp /> +251 94 565 3317
              </a>
            </div>
          </div>

          {/* Right: live TMDB poster grid */}
          <HeroPosterGrid />
        </div>

        {/* Scroll indicator */}
        <div className="home__hero-scroll animate-fade-in delay-600" aria-hidden="true">
          <div className="home__hero-scroll-mouse">
            <div className="home__hero-scroll-dot" />
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══════════════════════════════ */}
      <section className="home__stats" aria-label="Key statistics">
        <div className="container">
          <div className="home__stats-grid">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="home__stat reveal" style={{ '--delay': `${i * 80}ms` }}>
                <span className="home__stat-value text-gradient-gold">{value}</span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POSTER MARQUEE ═════════════════════════ */}
      <section className="home__showcase marquee-section section-sm" aria-label="Content library preview">
        <div className="container home__showcase-header reveal">
          <p className="section-eyebrow">Massive Content Library</p>
          <h2 className="section-title">
            Thousands of Titles,<br />
            <span className="text-gradient">One Subscription</span>
          </h2>
          <p className="section-subtitle">
            Browse movies, binge TV series, and watch live sports — all in one place. No buffering. No ads. Just content.
          </p>
        </div>
        <PosterMarquee />
        <div className="container home__showcase-cta">
          <Link to="/subscriptions" className="btn btn-primary btn-lg">
            See All Plans <IconArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ══ PATH CARDS ═════════════════════════════ */}
      <section className="home__paths section" aria-labelledby="paths-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">What We Offer</p>
            <h2 id="paths-heading" className="section-title reveal">
              Three Powerful <span className="text-gradient">Services</span>
            </h2>
            <div className="divider divider-center" />
          </div>

          <div className="home__paths-grid">
            {PATH_CARDS.map(({ id, Icon, badge, title, desc, features, cta, to, accent }, i) => (
              <article
                key={id}
                className={`home__path-card home__path-card--${accent} reveal`}
                style={{ '--delay': `${i * 120}ms` }}
              >
                <div className="home__path-card-header">
                  <div className={`home__path-card-icon home__path-card-icon--${accent}`}>
                    <Icon size={28} />
                  </div>
                  <span className={`badge ${accent === 'purple' ? 'badge-purple' : accent === 'gold' ? 'badge-gold' : 'badge-success'}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="home__path-card-title">{title}</h3>
                <p className="home__path-card-desc">{desc}</p>
                <ul className="home__path-card-features">
                  {features.map(f => (
                    <li key={f} className="home__path-card-feature">
                      <span className="home__path-card-check"><IconCheck size={11} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={to} className={`btn ${accent === 'gold' ? 'btn-gold' : 'btn-primary'} home__path-card-btn`}>
                  {cta} <IconArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY NAT ════════════════════════════════ */}
      <section className="home__why section-sm" aria-labelledby="why-heading">
        <div className="container">
          <div className="home__why-inner glass-strong reveal">
            <div className="home__why-text">
              <p className="section-eyebrow">Why NAT Entertainment?</p>
              <h2 id="why-heading" className="section-title">
                Built by an Engineer,<br />
                <span className="text-gradient">For Results</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: '12px' }}>
                Founded and run by a Computer Science graduate with a certification in computer maintenance and networking — real technical expertise behind every service we offer.
              </p>
              <div className="home__why-points">
                {[
                  { Icon: IconZap,    title: 'Instant Activation', desc: 'Start streaming within minutes of ordering via Telegram or WhatsApp.' },
                  { Icon: IconGlobe,  title: 'Global CDN',          desc: 'Powered by Cloudflare for ultra-low latency worldwide.' },
                  { Icon: IconShield, title: 'Secure & Reliable',   desc: 'SSL encryption, 99.9% uptime SLA, and monitored infrastructure.' },
                  { Icon: IconUsers,  title: '24/7 Support',        desc: 'Reach us anytime on Telegram, WhatsApp, or email.' },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="home__why-point">
                    <span className="home__why-point-icon"><Icon size={22} /></span>
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary mt-lg">
                About NAT Entertainment <IconArrowRight size={16} />
              </Link>
            </div>
            <div className="home__why-visual" aria-hidden="true">
              <div className="home__why-orb home__why-orb--1" />
              <div className="home__why-orb home__why-orb--2" />
              <div className="home__why-card glass">
                <div className="home__why-card-row">
                  <IconTv size={20} style={{ color: 'var(--color-purple-light)' }} />
                  <span>Streaming Active</span>
                  <span className="badge badge-success">LIVE</span>
                </div>
                <div className="home__why-card-row">
                  <IconHandshake size={20} style={{ color: 'var(--color-gold-light)' }} />
                  <span>Reseller Partners</span>
                  <span className="badge badge-gold">20+</span>
                </div>
                <div className="home__why-card-row">
                  <IconCode size={20} style={{ color: 'var(--color-blue-light)' }} />
                  <span>Projects Delivered</span>
                  <span className="badge badge-purple">15+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════ */}
      <section className="home__testimonials section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">What People Say</p>
            <h2 id="testimonials-heading" className="section-title reveal">Trusted by Clients</h2>
            <div className="divider divider-center" />
          </div>
          <div className="home__testimonials-grid">
            {TESTIMONIALS.map(({ name, role, quote, init }, i) => (
              <blockquote key={name} className="home__testimonial card reveal" style={{ '--delay': `${i * 120}ms` }}>
                <div className="home__testimonial-stars" aria-label="5 stars">
                  {[...Array(5)].map((_, j) => <IconStar key={j} size={14} />)}
                </div>
                <p className="home__testimonial-quote">"{quote}"</p>
                <footer className="home__testimonial-author">
                  <div className="home__testimonial-avatar">{init}</div>
                  <div>
                    <strong className="home__testimonial-name">{name}</strong>
                    <span className="home__testimonial-role">{role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════ */}
      <section className="home__cta-banner section-sm" aria-label="Get started">
        <div className="container">
          <div className="home__cta-inner reveal">
            <div className="home__cta-glow" aria-hidden="true" />
            <h2 className="home__cta-title">
              Ready to start streaming with<br />
              <span className="text-gradient-gold">NAT Entertainment?</span>
            </h2>
            <p className="home__cta-sub">
              Order via Telegram, WhatsApp, or email — we respond fast, 24/7.
            </p>
            <div className="home__cta-btns">
              <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <IconTelegram size={18} /> Order on Telegram
              </a>
              <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
                <IconWhatsApp size={18} /> WhatsApp Us
              </a>
              <a href="mailto:info@natentertainment.org" className="btn btn-outline btn-lg">
                <IconMail size={18} /> Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
