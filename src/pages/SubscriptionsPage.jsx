import { useState } from 'react'
import { IconCheck, IconTelegram, IconWhatsApp, IconMail, IconTv, IconArrowRight } from '../components/Icons'
import ContentBrowser from '../components/ContentBrowser'
import Dialog from '../components/Dialog'
import PlanComparison from '../components/PlanComparison'
import DataState from '../components/DataState'
import useTMDB from '../hooks/useTMDB'
import { imageUrl } from '../lib/tmdb'
import { PLANS } from '../lib/plans'
import './SubscriptionsPage.css'

const FEATURES = [
  { Icon: IconTv,      title: '4K Ultra HD',      desc: 'Stunning clarity on any screen, from phones to 85" TVs.' },
  { icon: 'ban',       title: 'Ad-Free',           desc: 'Zero interruptions. Watch what you want, when you want.' },
  { icon: 'globe',     title: '20K+ Channels',     desc: 'Global content from 150+ countries in 30+ languages.' },
  { icon: 'zap',       title: 'Zero Buffering',    desc: 'Powered by Cloudflare CDN for smooth, instant streams.' },
  { icon: 'phone',     title: 'All Devices',       desc: 'Smart TV, phone, tablet, PC, Fire Stick, MAG box.' },
  { icon: 'film',      title: 'VOD Library',       desc: '50,000+ movies and series available on demand.' },
]

const FAQS = [
  { q: 'How do I order?',
    a: 'Simply contact us on Telegram (@NATENTERTAINMENTSUPPORT), WhatsApp (+251 94 565 3317), or email (info@natentertainment.org) and tell us your chosen plan. We will activate your subscription within minutes.' },
  { q: 'What devices can I watch on?',
    a: 'NAT Entertainment works on Smart TVs, Android/iOS phones and tablets, Fire Stick, Apple TV, MAG boxes, PC, and more.' },
  { q: 'Can I cancel at any time?',
    a: 'Yes — contact us on Telegram or WhatsApp to cancel at any time. No hidden fees.' },
  { q: 'Is there a free trial?',
    a: 'We offer a 24-hour trial for new customers. Contact us on Telegram or WhatsApp to get started.' },
  { q: 'What payment methods do you accept?',
    a: 'We accept bank transfers, mobile money, and various payment methods. Contact us and we will arrange a convenient payment option for you.' },
]

// Small inline icon components
function FeatureIcon({ name }) {
  const icons = {
    ban:   <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
    globe: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    zap:   <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    phone: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    film:  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  }
  return icons[name] || null
}

function OrderModal({ plan, billing, onClose }) {
  const price = billing === 'annual' ? plan.annual : plan.monthly
  const period = billing === 'annual' ? '/year' : '/month'
  const msg = encodeURIComponent(`Hi! I'd like to order the ${plan.name} plan ($${price}${period}) for NAT Entertainment streaming. Please activate my subscription.`)

  return (
    <Dialog title={`Order ${plan.name}`} onClose={onClose} className="order-dialog">
      <div className="subs__modal glass-strong" onClick={e => e.stopPropagation()}>

        <div className="subs__modal-header">
          <h2 className="subs__modal-title">
            Order — <span className="text-gradient">{plan.name}</span>
          </h2>
          <p className="subs__modal-price">
            ${price}<span>{period}</span>
            {billing === 'annual' && <span className="subs__modal-save"> · Save {plan.annualSave}</span>}
          </p>
        </div>

        <p className="subs__modal-desc">
          Contact us on any of the channels below to place your order. We activate subscriptions within minutes.
        </p>

        <div className="subs__modal-channels">
          <a
            href={`https://t.me/NATENTERTAINMENTSUPPORT?text=${msg}`}
            target="_blank" rel="noopener noreferrer"
            className="subs__modal-channel subs__modal-channel--telegram"
          >
            <IconTelegram size={22} />
            <div>
              <strong>Order on Telegram</strong>
              <span>@NATENTERTAINMENTSUPPORT</span>
            </div>
            <IconArrowRight size={16} />
          </a>
          <a
            href={`https://wa.me/251945653317?text=${msg}`}
            target="_blank" rel="noopener noreferrer"
            className="subs__modal-channel subs__modal-channel--whatsapp"
          >
            <IconWhatsApp size={22} />
            <div>
              <strong>Order on WhatsApp</strong>
              <span>+251 94 565 3317</span>
            </div>
            <IconArrowRight size={16} />
          </a>
          <a
            href={`mailto:info@natentertainment.org?subject=${encodeURIComponent(`Subscription Order - ${plan.name} Plan`)}&body=${msg}`}
            className="subs__modal-channel subs__modal-channel--email"
          >
            <IconMail size={22} />
            <div>
              <strong>Order by Email</strong>
              <span>info@natentertainment.org</span>
            </div>
            <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </Dialog>
  )
}

export default function SubscriptionsPage() {
  const [billing, setBilling]     = useState('monthly')
  const [openFaq, setOpenFaq]     = useState(null)
  const [orderPlan, setOrderPlan] = useState(null)
  const hero = useTMDB('/trending/all/week')
  const heroPosters = (hero.data?.results || []).filter(item => ['movie', 'tv'].includes(item.media_type) && item.poster_path).slice(0, 6)
  const heroBg = imageUrl(heroPosters.find(item => item.backdrop_path)?.backdrop_path, 'w1280')

  return (
    <div className="subs">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="subs__hero" aria-label="Subscriptions">
        {/* Cinematic backdrop */}
        {heroBg && (
          <div className="subs__hero-bg" aria-hidden="true">
            <img src={heroBg} alt="" className="subs__hero-bg-img" />
            <div className="subs__hero-bg-overlay" />
          </div>
        )}
        {!heroBg && <div className="subs__hero-bg-fallback" aria-hidden="true" />}

        <div className="container subs__hero-content">
          <span className="badge badge-purple animate-fade-in-up">Premium Streaming</span>
          <h1 className="subs__hero-title animate-fade-in-up delay-100">
            Watch More.<br />
            <span className="text-gradient">Pay Less.</span>
          </h1>
          <div className="divider divider-center animate-fade-in-up delay-150" />
          <p className="subs__hero-subtitle animate-fade-in-up delay-200">
            20,000+ live channels, movies, and series in stunning 4K. No ads. No contracts. Activate in minutes via Telegram or WhatsApp.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="subs__toggle animate-fade-in-up delay-300" role="group" aria-label="Billing period">
            <button
              className={`subs__toggle-btn ${billing === 'monthly' ? 'subs__toggle-btn--active' : ''}`}
              onClick={() => setBilling('monthly')}
            >Monthly</button>
            <button
              className={`subs__toggle-btn ${billing === 'annual' ? 'subs__toggle-btn--active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual <span className="subs__toggle-save">Save ~20%</span>
            </button>
          </div>

          {/* Live poster strip */}
          {heroPosters.length > 0 && (
            <div className="subs__hero-posters animate-fade-in-up delay-400" aria-hidden="true">
              {heroPosters.map(item => (
                <div key={`${item.media_type}-${item.id}`} className="subs__hero-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={event => { event.currentTarget.style.visibility = 'hidden' }}
                  />
                  <div className="subs__hero-poster-overlay">
                    <span>★ {item.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {hero.error && <DataState error={hero.error} retry={hero.retry} compact />}
        </div>
      </section>

      {/* ── Plans Grid ────────────────────────────── */}
      <section className="subs__plans section-sm" aria-label="Subscription plans">
        <div className="container">
          <div className="subs__plans-grid">
            {PLANS.map((plan, i) => (
              <article
                key={plan.id}
                className={`subs__plan-card ${plan.highlighted ? 'subs__plan-card--highlighted' : ''} animate-fade-in-up delay-${(i+1)*100}`}
                aria-label={`${plan.name} plan`}
              >
                {plan.badge && (
                  <div className="subs__plan-badge">
                    <span className={`badge ${plan.badge === 'Best Value' ? 'badge-gold' : 'badge-purple'}`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="subs__plan-header">
                  <h2 className="subs__plan-name">{plan.name}</h2>
                </div>

                <div className="subs__plan-price">
                  <span className="subs__plan-amount">
                    ${billing === 'annual' ? plan.annual : plan.monthly}
                  </span>
                  <span className="subs__plan-per">
                    {billing === 'annual' ? '/year' : '/month'}
                  </span>
                  {billing === 'annual' && (
                    <div className="subs__plan-equivalent">
                      ≈ ${Math.round(plan.annual / 12)}/month · Save {plan.annualSave}
                    </div>
                  )}
                </div>

                <ul className="subs__plan-features">
                  {plan.features.map(f => (
                    <li key={f} className="subs__plan-feature">
                      <span className="subs__plan-check"><IconCheck size={11} /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'} subs__plan-cta`}
                  onClick={() => setOrderPlan(plan)}
                  id={`choose-plan-${plan.id}`}
                >
                  {plan.cta} <IconArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>

          <PlanComparison billing={billing} onOrder={setOrderPlan} />
          <div className="subs__order-note">
            <div className="subs__order-note-inner glass">
              <p>
                <strong>How to order:</strong> Contact us on{' '}
                <a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer">
                  <IconTelegram size={14} /> Telegram
                </a>
                , <a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp size={14} /> WhatsApp
                </a>
                , or <a href="mailto:info@natentertainment.org">
                  <IconMail size={14} /> email
                </a> — we respond fast and activate within minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Browser (TMDB) ─────────────────── */}
      <section className="subs__browser section-sm" aria-label="Content library">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Find Your Next Favourite</p>
            <h2 className="section-title">
              Explore the <span className="text-gradient">Library</span>
            </h2>
            <p className="section-subtitle">
              Explore movies and series with TMDB. Contact our team to confirm which titles are available on your plan.
            </p>
          </div>
          <ContentBrowser />
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section className="subs__features section-sm" aria-label="Streaming features">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">What You Get</p>
            <h2 className="section-title">Everything <span className="text-gradient">Included</span></h2>
          </div>
          <div className="subs__features-grid">
            {FEATURES.map(({ Icon, icon, title, desc }) => (
              <div key={title} className="subs__feature-card card">
                <span className="subs__feature-icon">
                  {Icon ? <Icon size={26} /> : <FeatureIcon name={icon} />}
                </span>
                <h3 className="subs__feature-title">{title}</h3>
                <p className="subs__feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="subs__faq section-sm" aria-labelledby="faq-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Got Questions?</p>
            <h2 id="faq-heading" className="section-title">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="subs__faq-list">
            {FAQS.map((item, i) => (
              <div key={i} className={`subs__faq-item ${openFaq === i ? 'subs__faq-item--open' : ''}`}>
                <button
                  className="subs__faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-q-${i}`}
                >
                  {item.q}
                  <span className="subs__faq-chevron" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="subs__faq-answer" role="region" aria-labelledby={`faq-q-${i}`} hidden={openFaq !== i}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order Modal ───────────────────────────── */}
      {orderPlan && (
        <OrderModal
          plan={orderPlan}
          billing={billing}
          onClose={() => setOrderPlan(null)}
        />
      )}
    </div>
  )
}
