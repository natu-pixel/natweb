import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import useTMDB from '../hooks/useTMDB'
import { imageUrl, mediaKey, titleOf } from '../lib/tmdb'
import { IconArrowRight, IconTv, IconHandshake, IconCheck, IconTelegram, IconWhatsApp } from '../components/Icons'
import HeroPosterGrid from '../components/HeroPosterGrid'
import PosterMarquee from '../components/PosterMarquee'
import ContentBrowser from '../components/ContentBrowser'
import MovieDetails from '../components/MovieDetails'
import DataState from '../components/DataState'
import WaveDivider from '../components/WaveDivider'
import './HomePage.css'

const OFFERINGS = [
  { n: '01', Icon: IconTv, title: 'Your front-row seat.', label: 'STREAMING SUBSCRIPTIONS', description: 'Live channels, movies, and series. Choose the plan that fits your screen, your household, and your next movie night.', features: ['Monthly or annual plans', 'Multi-device options', 'Direct setup support'], link: '/subscriptions', cta: 'Find your plan' },
  { n: '02', Icon: IconHandshake, title: 'Make it your business.', label: 'RESELLER PARTNERSHIPS', description: 'Turn entertainment into opportunity. Buy subscription credits, set your own prices, and grow at your own pace.', features: ['Packages from $100', 'Credits never expire', 'Your prices. Your customers.'], link: '/reseller', cta: 'Become a partner' },
]

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay }}>{children}</motion.div>
}

export default function HomePage() {
  const { data, loading, error, retry } = useTMDB('/trending/all/week')
  const [featureIndex, setFeatureIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const titles = (data?.results || []).filter(item => item.backdrop_path && ['movie', 'tv'].includes(item.media_type)).slice(0, 4)
  const featured = titles[featureIndex] || titles[0]

  return <div className="home">
    <section className="home__hero" aria-label="Welcome to NAT Entertainment">
      <div className="home__hero-image" key={featured ? mediaKey(featured) : 'local'}>
        <img src={featured ? imageUrl(featured.backdrop_path, 'w1280') : '/hero_bg.jpg'} alt="" fetchPriority="high" onError={event => { event.currentTarget.style.visibility = 'hidden' }} />
      </div>
      <div className="home__hero-wash" />
      <div className="container home__hero-inner">
        <div className="home__hero-topline"><span className="eyebrow"><span className="live-dot" />NAT ENTERTAINMENT</span><span className="home__edition">ENTERTAINMENT. ELEVATED.</span></div>
        <Reveal className="home__hero-content">
          <span className="home__hero-kicker">A little escape. A bigger experience.</span>
          <h1>Life deserves<br />a <em>better scene.</em></h1>
          <p>Unforgettable entertainment. Real business opportunities.<br />Welcome to the world of NAT.</p>
          <div className="home__hero-ctas"><Link to="/subscriptions" className="btn btn-primary btn-lg">Find your plan <IconArrowRight size={17} /></Link><Link to="/discover" className="home__text-link"><span className="play-ring" aria-hidden="true">▷</span> Explore movies & series</Link></div>
          <div className="home__hero-facts"><span>Plans from <strong>$15 / month</strong></span><span>Setup with a <strong>real person</strong></span></div>
        </Reveal>
        <div className="home__hero-bottom">
          <span className="home__scroll-note">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
          {featured && <div className="home__feature-caption"><span className="eyebrow">IN THE SPOTLIGHT</span><button onClick={() => setSelected(featured)}>{titleOf(featured)} <span aria-hidden="true">↗</span></button><div className="home__feature-switch" role="group" aria-label="Featured titles">{titles.map((item, index) => <button key={mediaKey(item)} onClick={() => setFeatureIndex(index)} aria-label={`Feature ${titleOf(item)}`} aria-pressed={index === featureIndex}>{String(index + 1).padStart(2, '0')}</button>)}</div></div>}
        </div>
      </div>
    </section>

    <div className="home__manifesto-strip"><div className="container"><span>NOT JUST SOMETHING TO WATCH.</span><span>SOMETHING TO <em>LOOK FORWARD TO.</em></span><Link to="/subscriptions">Meet your next plan ↗</Link></div></div>

    <section className="home__discover section" aria-labelledby="discover-heading"><div className="container">
      <Reveal className="home__section-heading"><div><span className="eyebrow">01 / THE DISCOVERY ROOM</span><h2 id="discover-heading">Great stories.<br /><em>One place to start.</em></h2></div><div><p>The talked-about films. The one-more-episode series. Find your next favourite and save it for later.</p><Link to="/discover" className="home__text-link">Explore all titles <IconArrowRight size={17} /></Link></div></Reveal>
      <ContentBrowser preview />
    </div></section>

    <section className="home__world section" aria-labelledby="world-heading"><div className="container">
      <Reveal className="home__section-heading"><div><span className="eyebrow">02 / A WORLD OF POSSIBILITIES</span><h2 id="world-heading">More than entertainment.<br /><em>More ways forward.</em></h2></div><p>Watch something extraordinary. Build something of your own. Whatever your next chapter looks like, start it here.</p></Reveal>
      <div className="home__offering-grid">{OFFERINGS.map(({ n, Icon, title, label, description, features, link, cta }, index) => <Reveal delay={index * .08} className="home__offering" key={n}><div className="home__offering-top"><Icon size={28} /><span>{n}</span></div><span className="eyebrow">{label}</span><h3>{title}</h3><p>{description}</p><ul>{features.map(feature => <li key={feature}><IconCheck size={12} />{feature}</li>)}</ul><Link to={link}>{cta}<IconArrowRight size={18} /></Link></Reveal>)}</div>
    </div></section>

    <WaveDivider to="#111217" />
    <section className="home__interlude" aria-labelledby="interlude-heading"><div className="container home__interlude-inner"><Reveal><span className="eyebrow">FOR THE LOVE OF A GOOD STORY</span><h2 id="interlude-heading">Your next<br /><em>“just one more.”</em></h2><p>Keep the films and series that catch your eye in one personal watchlist. No sign-up. No overthinking. Just your kind of entertainment.</p><Link to="/watchlist" className="btn btn-outline">Make it your list <IconArrowRight size={16} /></Link></Reveal><div><HeroPosterGrid items={titles} /><DataState loading={loading} error={error} retry={retry} compact /></div></div><PosterMarquee /></section>

    <section className="home__how section"><div className="container"><Reveal className="home__section-heading"><div><span className="eyebrow">03 / SIMPLE FROM THE START</span><h2>Less friction.<br /><em>More front-row moments.</em></h2></div><p>Behind the screen is a real person. Built and supported by Natnael, with hands-on technical expertise and direct communication.</p></Reveal><div className="home__steps">{[{ n: '01', title: 'Choose your experience', text: 'Compare streaming plans or explore reseller packages.' }, { n: '02', title: 'Say hello', text: 'Message us on Telegram or WhatsApp. We help you find the right fit.' }, { n: '03', title: 'Let us handle the setup', text: 'Get direct guidance on activation, devices, and your reseller panel.' }].map(step => <Reveal key={step.n} className="home__step"><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div><a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer" className="home__text-link">Talk to the person behind NAT <IconArrowRight size={16} /></a></div></section>

    <section className="home__final"><div className="container"><Reveal><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Shall we make<br /><em>it a great one?</em></h2><div className="home__final-actions"><Link to="/subscriptions" className="btn btn-primary btn-lg">Explore plans <IconArrowRight size={17} /></Link><a href="https://t.me/NATENTERTAINMENTSUPPORT" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><IconTelegram size={17} />Let's talk</a><a href="https://wa.me/251945653317" target="_blank" rel="noopener noreferrer" className="home__text-link"><IconWhatsApp size={17} />WhatsApp ↗</a></div></Reveal><span className="home__final-mark" aria-hidden="true">NAT.</span></div></section>
    {selected && <MovieDetails key={mediaKey(selected)} item={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}
  </div>
}
