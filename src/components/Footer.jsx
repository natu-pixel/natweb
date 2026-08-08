import { Link } from 'react-router-dom'
import { IconTelegram, IconWhatsApp, IconMail } from './Icons'
import './Footer.css'

const FOOTER_LINKS = {
  'Services': [
    { to: '/subscriptions', label: 'IPTV Subscriptions' },
    { to: '/reseller',      label: 'Reseller Program'  },
    { to: '/services',      label: 'Web Design'        },
  ],
  'Company': [
    { to: '/about', label: 'About Nathan' },
    { to: '/about', label: 'Contact'      },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="NAT Entertainment Home">
              <img src="/nat_logo.png" alt="NAT Entertainment" className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">
              Premium IPTV streaming, reseller partnerships, and professional web development — all under one roof, built by a Computer Science engineer.
            </p>

            {/* Real contact channels */}
            <div className="footer__contacts">
              <a
                href="https://t.me/NATENTERTAINMENTSUPPORT"
                target="_blank" rel="noopener noreferrer"
                className="footer__contact-link footer__contact-link--telegram"
                aria-label="Telegram"
              >
                <IconTelegram size={16} />
                <span>@NATENTERTAINMENTSUPPORT</span>
              </a>
              <a
                href="https://wa.me/251945653317"
                target="_blank" rel="noopener noreferrer"
                className="footer__contact-link footer__contact-link--whatsapp"
                aria-label="WhatsApp"
              >
                <IconWhatsApp size={16} />
                <span>+251 94 565 3317</span>
              </a>
              <a
                href="mailto:info@natentertainment.org"
                className="footer__contact-link footer__contact-link--email"
                aria-label="Email"
              >
                <IconMail size={16} />
                <span>info@natentertainment.org</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="footer__col">
              <h3 className="footer__col-title">{category}</h3>
              <ul className="footer__col-links">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="footer__col-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* QR */}
          <div className="footer__qr-col">
            <h3 className="footer__col-title">Quick Order</h3>
            <img src="/telegram_qr.png" alt="Telegram QR code — @NATENTERTAINMENTSUPPORT" className="footer__qr" />
            <p className="footer__qr-label">Scan to message us on Telegram</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} NAT Entertainment &amp; Services. All rights reserved.
          </p>
          <p className="footer__copy footer__copy--right">
            Built by Natnael — NAT Entertainment
          </p>
        </div>
      </div>
    </footer>
  )
}
