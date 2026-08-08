import { useRef } from 'react'
import { IconTelegram, IconWhatsApp, IconMail, IconCheck, IconArrowRight, IconTrendingUp, IconDollar, IconBarChart, IconGift, IconClock, IconShield } from '../components/Icons'
import './ResellerPage.css'

const PACKAGES = [
  {
    id:        'starter',
    name:      'Starter',
    credits:   30,
    price:     100,
    perCredit: 3.33,
    badge:     null,
    features: [
      '30 IPTV subscription credits',
      'Full HD & 4K quality',
      'All channels & VOD included',
      'Dashboard access',
      'Email & Telegram support',
      'Credits never expire',
    ],
    highlighted: false,
  },
  {
    id:        'pro',
    name:      'Pro',
    credits:   60,
    price:     180,
    perCredit: 3.00,
    badge:     'Most Popular',
    features: [
      '60 IPTV subscription credits',
      'Full HD & 4K quality',
      'All channels & VOD included',
      'Priority dashboard access',
      'Priority support',
      'Credits never expire',
      'Marketing materials included',
    ],
    highlighted: true,
  },
  {
    id:        'business',
    name:      'Business',
    credits:   100,
    price:     250,
    perCredit: 2.50,
    badge:     'Best Value',
    features: [
      '100 IPTV subscription credits',
      'Full HD & 4K quality',
      'All channels & VOD included',
      'VIP dashboard access',
      '24/7 dedicated support',
      'Credits never expire',
      'Marketing materials included',
      'Custom sub-reseller panel',
    ],
    highlighted: false,
  },
]

const HOW_IT_WORKS = [
  {
    n:    '01',
    title: 'Buy a Credit Package',
    desc:  'Choose one of the three packages below. Contact us on Telegram, WhatsApp, or email to complete your purchase.',
  },
  {
    n:    '02',
    title: 'Get Your Reseller Panel',
    desc:  'We set up your reseller dashboard where you can see your credit balance and activate subscriptions for your customers.',
  },
  {
    n:    '03',
    title: 'Sell to Your Customers',
    desc:  'Each credit = 1 month of IPTV for one customer. You set your own price. We suggest selling at $10–$15/month.',
  },
  {
    n:    '04',
    title: 'Earn the Margin',
    desc:  'Buy credits at wholesale, sell at retail. With the Business package at $2.50/credit, selling at $12 earns you $9.50 profit per sub.',
  },
]

const BENEFITS = [
  { Icon: IconDollar,     title: 'Low Entry Cost',    desc: 'Start with just $100 — no expensive setup or infrastructure needed.' },
  { Icon: IconTrendingUp, title: 'High Margins',      desc: 'Buy at $2.50–$3.33 per credit. Set your own retail price and keep the difference.' },
  { Icon: IconBarChart,   title: 'Reseller Panel',    desc: 'Real-time dashboard to manage customer subscriptions and credit balance.' },
  { Icon: IconGift,       title: 'Marketing Kit',     desc: 'Promotional banners and templates to help you sell faster.' },
  { Icon: IconClock,      title: 'Credits Never Expire', desc: 'Use your credits at your own pace — no time pressure.' },
  { Icon: IconShield,     title: 'Reliable Service',  desc: '99.9% uptime on all streams. Your customers stay happy.' },
]

const EXAMPLE_CALC = [
  { pkg: 'Starter',  buy: 100, credits: 30, sellAt: 12, profit: 260  },
  { pkg: 'Pro',      buy: 180, credits: 60, sellAt: 12, profit: 540  },
  { pkg: 'Business', buy: 250, credits: 100,sellAt: 12, profit: 950  },
]

export default function ResellerPage() {
  const formRef = useRef(null)

  function scrollToPackages() {
    document.getElementById('reseller-packages')?.scrollIntoView({ behavior: 'smooth' })
  }

  function buildOrderMsg(pkg) {
    return encodeURIComponent(
      `Hi! I'd like to order the ${pkg.name} Reseller Package — ${pkg.credits} credits for $${pkg.price}. Please set up my reseller panel.`
    )
  }

  return (
    <div className="reseller">
      {/* ── Hero ────────────────────────────── */}
      <section className="page-hero reseller__hero" aria-label="Reseller Program">
        <div className="page-hero__glow reseller__hero-glow" aria-hidden="true" />
        <div className="container page-hero__content">
          <span className="badge badge-gold animate-fade-in-up">IPTV Reseller Program</span>
          <h1 className="section-title animate-fade-in-up delay-100">
            Buy Credits. Sell Subscriptions.<br />
            <span className="text-gradient-gold">Keep the Margin.</span>
          </h1>
          <div className="divider divider-center animate-fade-in-up delay-200" />
          <p className="section-subtitle animate-fade-in-up delay-300">
            Become an IPTV reseller with NAT Entertainment. Purchase wholesale credit packages and sell 4K streaming subscriptions to your own customers at your own price. No technical knowledge needed.
          </p>
          <button onClick={scrollToPackages} className="btn btn-gold btn-lg animate-fade-in-up delay-400">
            View Packages <IconArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── What is a Credit? ───────────────── */}
      <section className="reseller__explainer" aria-label="How credits work">
        <div className="container">
          <div className="reseller__explainer-inner glass-strong">
            <div className="reseller__explainer-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="15" rx="2"/>
                <polyline points="17 2 12 7 7 2"/>
              </svg>
            </div>
            <div>
              <h2 className="reseller__explainer-title">What is 1 Credit?</h2>
              <p className="reseller__explainer-desc">
                <strong>1 credit = 1 month of full IPTV access for 1 customer.</strong> When a customer subscribes for 3 months, you use 3 credits from your balance. You buy credits wholesale from us and sell subscriptions to your customers at your own price — keeping the profit margin.
              </p>
            </div>
            <div className="reseller__explainer-example">
              <span className="badge badge-gold">Example</span>
              <p>Buy 30 credits @ $3.33 each → Sell 30 subscriptions @ $12 → <strong className="text-gradient-gold">Earn $260 profit</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ────────────────────────── */}
      <section className="reseller__packages section" id="reseller-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Credit Packages</p>
            <h2 id="packages-heading" className="section-title">
              Choose Your <span className="text-gradient-gold">Package</span>
            </h2>
            <div className="divider divider-center" />
            <p className="section-subtitle">All packages include reseller panel access. Credits never expire.</p>
          </div>

          <div className="reseller__packages-grid">
            {PACKAGES.map((pkg, i) => (
              <article
                key={pkg.id}
                className={`reseller__pkg-card ${pkg.highlighted ? 'reseller__pkg-card--hot' : ''} animate-fade-in-up delay-${(i+1)*100}`}
                aria-label={`${pkg.name} package`}
              >
                {pkg.badge && (
                  <div className="reseller__pkg-badge">
                    <span className={`badge ${pkg.badge === 'Best Value' ? 'badge-gold' : 'badge-purple'}`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="reseller__pkg-header">
                  <h3 className="reseller__pkg-name">{pkg.name}</h3>
                  <div className="reseller__pkg-credits">
                    <span className="reseller__pkg-credit-num text-gradient-gold">{pkg.credits}</span>
                    <span className="reseller__pkg-credit-label">credits</span>
                  </div>
                </div>

                <div className="reseller__pkg-price">
                  <span className="reseller__pkg-amount">${pkg.price}</span>
                  <span className="reseller__pkg-per">${pkg.perCredit.toFixed(2)}/credit</span>
                </div>

                <ul className="reseller__pkg-features">
                  {pkg.features.map(f => (
                    <li key={f} className="reseller__pkg-feature">
                      <span className="reseller__pkg-check"><IconCheck size={11} /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="reseller__pkg-actions">
                  <a
                    href={`https://t.me/NATENTERTAINMENTSUPPORT?text=${buildOrderMsg(pkg)}`}
                    target="_blank" rel="noopener noreferrer"
                    className={`btn ${pkg.highlighted ? 'btn-gold' : 'btn-primary'} reseller__pkg-cta`}
                  >
                    <IconTelegram size={16} /> Order on Telegram
                  </a>
                  <a
                    href={`https://wa.me/251945653317?text=${buildOrderMsg(pkg)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline reseller__pkg-cta-sm"
                  >
                    <IconWhatsApp size={15} /> WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="reseller__pkg-note">
            All orders placed via Telegram, WhatsApp, or email · Reseller panel activated within 24 hours · Credits never expire
          </p>
        </div>
      </section>

      {/* ── Profit Calculator ───────────────── */}
      <section className="reseller__calc section-sm" aria-labelledby="calc-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Profit Potential</p>
            <h2 id="calc-heading" className="section-title">
              Estimated <span className="text-gradient-gold">Earnings</span>
            </h2>
            <p className="section-subtitle">If you sell all credits at $12/month per subscription:</p>
          </div>
          <div className="reseller__calc-table glass-strong">
            <div className="reseller__calc-header">
              <span>Package</span>
              <span>Cost to You</span>
              <span>Credits</span>
              <span>Sell at $12/sub</span>
              <span>Your Profit</span>
            </div>
            {EXAMPLE_CALC.map(({ pkg, buy, credits, sellAt, profit }) => (
              <div key={pkg} className="reseller__calc-row">
                <span className="reseller__calc-pkg">{pkg}</span>
                <span className="reseller__calc-cost">${buy}</span>
                <span>{credits} subs</span>
                <span>${credits * sellAt}</span>
                <span className="reseller__calc-profit text-gradient-gold">${profit}</span>
              </div>
            ))}
          </div>
          <p className="reseller__calc-note">
            * Profit = (Credits × sell price) − package cost. You set your own price — sell higher for more margin.
          </p>
        </div>
      </section>

      {/* ── How It Works ────────────────────── */}
      <section className="reseller__steps section-sm" aria-labelledby="steps-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">How It Works</p>
            <h2 id="steps-heading" className="section-title">
              4 Simple <span className="text-gradient">Steps</span>
            </h2>
          </div>
          <div className="reseller__steps-grid">
            {HOW_IT_WORKS.map(({ n, title, desc }, i) => (
              <div key={n} className="reseller__step">
                <div className="reseller__step-number">{n}</div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="reseller__step-connector" aria-hidden="true" />
                )}
                <h3 className="reseller__step-title">{title}</h3>
                <p className="reseller__step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────── */}
      <section className="reseller__benefits section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="text-center mb-xl">
            <p className="section-eyebrow">Why Choose Us</p>
            <h2 id="benefits-heading" className="section-title">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
          </div>
          <div className="grid-3">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className="reseller__benefit-card card-gradient">
                <span className="reseller__benefit-icon"><Icon size={24} /></span>
                <h3 className="reseller__benefit-title">{title}</h3>
                <p className="reseller__benefit-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────── */}
      <section className="reseller__contact section-sm" aria-label="Contact to order">
        <div className="container">
          <div className="reseller__contact-inner glass-strong">
            <div className="reseller__contact-text">
              <p className="section-eyebrow">Ready to Start?</p>
              <h2 className="section-title">
                Order Your <span className="text-gradient-gold">Reseller Package</span>
              </h2>
              <p className="section-subtitle">
                Contact us on Telegram, WhatsApp, or email and tell us which package you want. We'll set everything up within 24 hours.
              </p>
            </div>
            <div className="reseller__contact-channels">
              <a
                href="https://t.me/NATENTERTAINMENTSUPPORT"
                target="_blank" rel="noopener noreferrer"
                className="reseller__contact-btn reseller__contact-btn--telegram"
              >
                <IconTelegram size={24} />
                <div>
                  <strong>Telegram</strong>
                  <span>@NATENTERTAINMENTSUPPORT</span>
                </div>
                <IconArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/251945653317"
                target="_blank" rel="noopener noreferrer"
                className="reseller__contact-btn reseller__contact-btn--whatsapp"
              >
                <IconWhatsApp size={24} />
                <div>
                  <strong>WhatsApp</strong>
                  <span>+251 94 565 3317</span>
                </div>
                <IconArrowRight size={16} />
              </a>
              <a
                href="mailto:info@natentertainment.org?subject=Reseller Package Order"
                className="reseller__contact-btn reseller__contact-btn--email"
              >
                <IconMail size={24} />
                <div>
                  <strong>Email</strong>
                  <span>info@natentertainment.org</span>
                </div>
                <IconArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
