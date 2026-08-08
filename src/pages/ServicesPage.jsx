import { useState } from 'react'
import { IconArrowRight, IconCheck, IconTelegram, IconWhatsApp, IconMail } from '../components/Icons'
import './ServicesPage.css'

const SERVICES = [
  {
    iconSvg: 'palette',
    title: 'UX/UI Design',
    desc:  'Research-driven, visually stunning interfaces that convert. From wireframes to pixel-perfect prototypes.',
    items: ['User research & personas', 'Wireframing & prototyping', 'Design systems', 'Usability testing'],
  },
  {
    iconSvg: 'code',
    title: 'Web Development',
    desc:  'Blazing-fast, modern websites built on the best tech — React, Next.js, or the platform that fits your needs.',
    items: ['React / Next.js development', 'CMS integration', 'API & backend', 'Performance optimisation'],
  },
  {
    iconSvg: 'bot',
    title: 'Trading Bots & Automation',
    desc:  'Custom algorithmic trading bots and workflow automation that run 24/7 with configurable risk management.',
    items: ['Crypto & forex bots', 'REST API integration', 'Real-time dashboards', 'Risk & profit tracking'],
  },
  {
    iconSvg: 'tv',
    title: 'Streaming App Development',
    desc:  'Full IPTV and VOD streaming applications with HLS player, EPG guide, and subscription management backend.',
    items: ['HLS / IPTV streaming', 'Multi-device support', 'VOD & live TV', 'Subscription backend'],
  },
  {
    iconSvg: 'network',
    title: 'Network Infrastructure',
    desc:  'Enterprise network design, router & firewall configuration, VLAN setup, and remote monitoring dashboards.',
    items: ['Router & switch config', 'VLAN & firewall setup', 'Remote monitoring', 'Zero-downtime deployment'],
  },
  {
    iconSvg: 'wrench',
    title: 'Maintenance & Support',
    desc:  'We don\'t disappear after launch. Ongoing maintenance keeps your site fast, secure, and up to date.',
    items: ['Security monitoring', 'Updates & patches', 'Uptime monitoring', 'On-demand edits'],
  },
]

const PROCESS = [
  { n: '01', title: 'Discovery',  desc: 'We understand your goals, audience, and technical requirements through a structured kickoff.' },
  { n: '02', title: 'Proposal',   desc: 'You receive a tailored scope of work and pricing — negotiated to fit your project and budget.' },
  { n: '03', title: 'Design',     desc: 'Wireframes → high-fidelity mockups → your approval before a single line of code is written.' },
  { n: '04', title: 'Build',      desc: 'Clean, tested code delivered across all devices and browsers.' },
  { n: '05', title: 'Launch',     desc: 'Deployed with performance audits, SEO setup, and analytics live from day one.' },
  { n: '06', title: 'Support',    desc: 'Ongoing maintenance and improvements so your project keeps growing after launch.' },
]

// Inline SVG icon selector
function SvcIcon({ name, size = 24 }) {
  const icons = {
    palette: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    code:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    bot:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    tv:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
    network: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2"  y="16" width="6" height="6" rx="1"/><rect x="9"  y="2"  width="6" height="6" rx="1"/><path d="M5 16v-4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4"/><line x1="12" y1="8" x2="12" y2="11"/></svg>,
    wrench:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  }
  return icons[name] || null
}

export default function ServicesPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="services">
      {/* ── Hero ──────────────────────────── */}
      <section className="page-hero" aria-label="Web Design Services">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="container page-hero__content">
          <span className="badge badge-purple animate-fade-in-up">Web Design & Development</span>
          <h1 className="section-title animate-fade-in-up delay-100">
            We Build Digital<br />
            <span className="text-gradient">Products That Work</span>
          </h1>
          <div className="divider divider-center" />
          <p className="section-subtitle animate-fade-in-up delay-200">
            Websites, trading bots, streaming apps, network setups — every project is scoped and priced based on your specific needs. Get in touch for a free consultation.
          </p>
          <div className="flex gap-md animate-fade-in-up delay-300" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#quote-form" className="btn btn-primary btn-lg">
              Get a Free Quote <IconArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────── */}
      <section className="services__grid section" aria-labelledby="services-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">What We Do</p>
            <h2 id="services-heading" className="section-title">
              Our <span className="text-gradient">Services</span>
            </h2>
            <div className="divider divider-center" />
          </div>
          <div className="grid-3">
            {SERVICES.map(({ iconSvg, title, desc, items }) => (
              <div key={title} className="services__service-card card-gradient">
                <div className="services__service-icon">
                  <SvcIcon name={iconSvg} size={26} />
                </div>
                <h3 className="services__service-title">{title}</h3>
                <p className="services__service-desc">{desc}</p>
                <ul className="services__service-items">
                  {items.map(item => (
                    <li key={item} className="services__service-item">
                      <IconCheck size={12} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Note ──────────────────── */}
      <section className="services__pricing-note" aria-label="Pricing information">
        <div className="container">
          <div className="services__pricing-note-inner glass-strong">
            <div className="services__pricing-note-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h2 className="services__pricing-note-title">
                Pricing is <span className="text-gradient">Project-Based</span>
              </h2>
              <p className="services__pricing-note-desc">
                Every project is different — complexity, scope, timeline, and features all affect the cost. We don't use fixed price tiers. Instead, tell us what you need and we'll put together a fair, transparent quote tailored to your project. No hidden fees.
              </p>
            </div>
            <div className="services__pricing-note-ctas">
              <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer"
                 className="services__pricing-note-btn services__pricing-note-btn--telegram">
                <IconTelegram size={18} /> Discuss on Telegram
              </a>
              <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer"
                 className="services__pricing-note-btn services__pricing-note-btn--whatsapp">
                <IconWhatsApp size={18} /> WhatsApp
              </a>
              <a href="#quote-form"
                 className="services__pricing-note-btn services__pricing-note-btn--email">
                <IconMail size={18} /> Send a brief
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────── */}
      <section className="services__process section-sm" aria-labelledby="process-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">How We Work</p>
            <h2 id="process-heading" className="section-title">
              Our <span className="text-gradient">Process</span>
            </h2>
          </div>
          <div className="services__process-grid">
            {PROCESS.map(({ n, title, desc }) => (
              <div key={n} className="services__process-step glass">
                <span className="services__process-num">{n}</span>
                <h3 className="services__process-title">{title}</h3>
                <p className="services__process-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form ────────────────────── */}
      <section className="services__quote section" id="quote-form" aria-labelledby="quote-heading">
        <div className="container">
          <div className="services__quote-inner">
            <div className="services__quote-left">
              <p className="section-eyebrow">Start Your Project</p>
              <h2 id="quote-heading" className="section-title">
                Get a <span className="text-gradient">Free Quote</span>
              </h2>
              <p className="section-subtitle">
                Describe your project and we'll respond within one business day with a tailored, transparent proposal.
              </p>
              <div className="services__quote-promises">
                {['No obligation', 'Response within 24h', 'Negotiable pricing', 'Free consultation'].map(p => (
                  <div key={p} className="services__quote-promise">
                    <IconCheck size={14} /><span>{p}</span>
                  </div>
                ))}
              </div>
              <div className="services__quote-contact-note glass" style={{ marginTop: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md) var(--space-lg)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Prefer to chat directly? Message on{' '}
                  <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer" style={{ color: '#29aef5', fontWeight: 600 }}>Telegram</a>{' '}or{' '}
                  <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontWeight: 600 }}>WhatsApp</a>.
                </p>
              </div>
            </div>

            <div className="services__quote-right">
              {submitted ? (
                <div className="services__quote-success glass-strong">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h3>Quote Request Received!</h3>
                  <p>We'll review your project details and respond within one business day with a proposal.</p>
                </div>
              ) : (
                <form
                  className="services__quote-form glass-strong"
                  onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                  aria-label="Project quote request form"
                >
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-name">Your Name</label>
                      <input id="q-name" type="text" className="form-input" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-email">Email</label>
                      <input id="q-email" type="email" className="form-input" placeholder="you@company.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="q-type">Project Type</label>
                    <select id="q-type" className="form-input">
                      <option>Website / Web App</option>
                      <option>Trading Bot / Automation</option>
                      <option>Streaming App</option>
                      <option>Network Infrastructure</option>
                      <option>Branding & Design</option>
                      <option>Maintenance & Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="q-desc">Project Description</label>
                    <textarea
                      id="q-desc"
                      className="form-input form-textarea"
                      placeholder="Tell us about your project, goals, and any details that would help us understand what you need..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>
                    Send My Quote Request <IconArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
