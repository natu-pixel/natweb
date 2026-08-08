import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconMail, IconTelegram, IconWhatsApp, IconZap, IconGlobe, IconShield, IconUsers, IconArrowRight } from '../components/Icons'
import './AboutPage.css'

const OFFERINGS = [
  {
    Icon:  IconTelegram,
    color: 'telegram',
    title: 'IPTV Streaming',
    desc:  '20,000+ live channels, movies, and TV shows in 4K Ultra HD. Ad-free. Multi-device. Instant activation via Telegram or WhatsApp.',
    cta:   'Browse Plans',
    to:    '/subscriptions',
  },
  {
    Icon:  IconHandshake,
    color: 'gold',
    title: 'Reseller Program',
    desc:  'Buy IPTV credit packages wholesale and sell subscriptions to your own customers. Start from 30 credits / $100.',
    cta:   'Become a Reseller',
    to:    '/reseller',
  },
  {
    Icon:  IconCode,
    color: 'blue',
    title: 'Web & Dev Services',
    desc:  'Custom websites, trading bots, streaming apps, network setups — built by a Computer Science graduate who takes quality seriously.',
    cta:   'View Services',
    to:    '/services',
  },
]

const VALUES = [
  { Icon: IconZap,    title: 'Speed',       desc: 'Orders activated within minutes. No waiting, no queues.' },
  { Icon: IconShield, title: 'Reliability', desc: '99.9% uptime SLA with Cloudflare-backed infrastructure.' },
  { Icon: IconUsers,  title: 'Support',     desc: 'Real support via Telegram, WhatsApp, and email — 24/7.' },
  { Icon: IconGlobe,  title: 'Global',      desc: 'Serving customers and resellers across multiple countries.' },
]

const MILESTONES = [
  { year: '2021', text: 'NAT Entertainment founded — streaming service launched'         },
  { year: '2022', text: 'Expanded to 100+ subscribers and improved infrastructure'        },
  { year: '2023', text: 'Web Design & Development services launched alongside streaming'  },
  { year: '2024', text: 'IPTV Reseller Program introduced — 20+ partners onboarded'      },
  { year: '2025', text: '150+ active subscribers across multiple countries'               },
]

// Local icon helpers
function IconHandshake({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
}
function IconCode({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}

export default function AboutPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className="about">
      {/* ── Hero ──────────────────────────── */}
      <section className="page-hero" aria-label="About NAT Entertainment">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="container page-hero__content">
          <span className="badge badge-gold animate-fade-in-up">About Us</span>
          <h1 className="section-title animate-fade-in-up delay-100">
            What is<br />
            <span className="text-gradient-gold">NAT Entertainment?</span>
          </h1>
          <div className="divider divider-center animate-fade-in-up delay-200" />
          <p className="section-subtitle animate-fade-in-up delay-300">
            A technology-driven platform delivering premium IPTV streaming, a profitable reseller network, and professional web development — all under one roof.
          </p>
        </div>
      </section>

      {/* ── Brand Story ───────────────────── */}
      <section className="about__story section" aria-labelledby="story-heading">
        <div className="container">
          <div className="about__story-grid">
            <div className="about__story-text">
              <p className="section-eyebrow">Founded by</p>
              <h2 id="founder-heading" className="section-title">
                Natnael
              </h2>
              <div className="divider" />
              <p className="about__story-para">
                I built NAT Entertainment from the ground up — starting with the idea that premium streaming should be accessible and affordable. What began as a small streaming service has grown into a multi-service platform covering subscriptions, reselling, and custom web development.
              </p>
              <p className="about__story-para">
                With a strong technical background in software development and networking, I bring both the depth and the problem-solving mindset to every project I take on — whether it's a trading bot, a streaming app, a restaurant website, or a full network infrastructure setup.
              </p>
              <p className="about__story-para">
                I work directly with every client. No middlemen, no outsourcing — just focused, quality work delivered fast.
              </p>
            </div>

            <div className="about__story-timeline-wrap">
              <div className="about__story-timeline glass-strong">
                <h3 className="about__timeline-heading">Our Journey</h3>
                <div className="about__timeline-list">
                  {MILESTONES.map(({ year, text }) => (
                    <div key={year} className="about__timeline-row">
                      <span className="about__timeline-year text-gradient-gold">{year}</span>
                      <span className="about__timeline-dot" />
                      <span className="about__timeline-text">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about__brand-logo-card glass">
                <img src="/nat_logo.png" alt="NAT Entertainment logo" className="about__brand-logo" />
                <div className="about__founder-creds">
                  <div className="about__cred glass">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                    <span>Networking & Infrastructure</span>
                  </div>
                  <div className="about__cred glass">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    <span>Software Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ─────────────────── */}
      <section className="about__offerings section-sm" aria-labelledby="offerings-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Three Pillars</p>
            <h2 id="offerings-heading" className="section-title">
              What NAT Entertainment <span className="text-gradient">Offers</span>
            </h2>
          </div>
          <div className="about__offerings-grid">
            {OFFERINGS.map(({ Icon, color, title, desc, cta, to }) => (
              <div key={title} className={`about__offering-card about__offering-card--${color} card`}>
                <div className={`about__offering-icon about__offering-icon--${color}`}>
                  <Icon size={26} />
                </div>
                <h3 className="about__offering-title">{title}</h3>
                <p className="about__offering-desc">{desc}</p>
                <Link to={to} className="btn btn-outline about__offering-cta">
                  {cta} <IconArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────── */}
      <section className="about__values section-sm" aria-labelledby="values-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Our Principles</p>
            <h2 id="values-heading" className="section-title">
              Why Customers Choose <span className="text-gradient">Us</span>
            </h2>
          </div>
          <div className="grid-4">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="about__value-card card-gradient">
                <span className="about__value-icon"><Icon size={24} /></span>
                <h3 className="about__value-title">{title}</h3>
                <p className="about__value-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────── */}
      <section className="about__contact section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="about__contact-inner">
            {/* Left: info */}
            <div className="about__contact-info">
              <p className="section-eyebrow">Reach Out</p>
              <h2 id="contact-heading" className="section-title">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="section-subtitle">
                For subscriptions, reseller enquiries, or a web project — contact us on any channel below.
              </p>

              <div className="about__contact-channels">
                <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer"
                   className="about__contact-channel about__contact-channel--telegram">
                  <IconTelegram size={22} />
                  <div>
                    <strong>Telegram</strong>
                    <span>@NATENTERTAINMENTSUPPORT</span>
                  </div>
                </a>
                <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer"
                   className="about__contact-channel about__contact-channel--whatsapp">
                  <IconWhatsApp size={22} />
                  <div>
                    <strong>WhatsApp</strong>
                    <span>+251 94 565 3317</span>
                  </div>
                </a>
                <a href="mailto:info@natentertainment.org"
                   className="about__contact-channel about__contact-channel--email">
                  <IconMail size={22} />
                  <div>
                    <strong>Email</strong>
                    <span>info@natentertainment.org</span>
                  </div>
                </a>
              </div>

              <div className="about__qr-wrap">
                <p className="about__qr-label">Scan to open Telegram</p>
                <img src="/telegram_qr.png" alt="Telegram QR — @NATENTERTAINMENTSUPPORT" className="about__qr-img" />
              </div>
            </div>

            {/* Right: contact form */}
            <div className="about__contact-form-wrap">
              {formSubmitted ? (
                <div className="about__contact-success glass-strong">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <h3>Message Sent!</h3>
                  <p>We'll reply within one business day. For faster response, message on Telegram or WhatsApp.</p>
                </div>
              ) : (
                <form
                  className="about__contact-form glass-strong"
                  onSubmit={e => { e.preventDefault(); setFormSubmitted(true) }}
                  aria-label="Contact form"
                >
                  <h3 className="about__contact-form-title">Send a Message</h3>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-name">Your Name</label>
                    <input id="c-name" type="text" className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" className="form-input" placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-subject">Subject</label>
                    <select id="c-subject" className="form-input">
                      <option>IPTV Subscription</option>
                      <option>Reseller Program</option>
                      <option>Web Design / Development</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-message">Message</label>
                    <textarea id="c-message" className="form-input form-textarea" placeholder="How can we help?" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                    Send Message <IconArrowRight size={16} />
                  </button>
                  <p className="about__contact-form-note">
                    For instant response, use Telegram or WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
