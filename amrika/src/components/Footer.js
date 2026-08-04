import Link from 'next/link';
import { Droplets, Phone, Mail } from 'lucide-react';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Order',    href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">

      {/* ── Aurora ───────────────────────────── */}
      <div className="footer__aurora" aria-hidden="true">
        <div className="footer__orb footer__orb--1" />
        <div className="footer__orb footer__orb--2" />
      </div>

      {/* ── Animated shimmer border ──────────── */}
      <div className="footer__shimmer-line" aria-hidden="true" />

      <div className="footer__inner">

        {/* ── Top strip: logo · nav · contacts ── */}
        <div className="footer__strip">

          <Link href="/" className="footer__logo" aria-label="Amirita Water — home">
            <div className="footer__logo-orb" aria-hidden="true">
              <Droplets size={18} />
            </div>
            <span>Amirita <strong>Water</strong></span>
          </Link>

          <nav className="footer__nav" aria-label="Footer navigation">
            {NAV_LINKS.map(({ label, href }, i) => (
              <span key={href} className="footer__nav-item">
                {i > 0 && <span className="footer__dot" aria-hidden="true">·</span>}
                <Link href={href} className="footer__nav-link">{label}</Link>
              </span>
            ))}
          </nav>

          <div className="footer__contacts">
            <a href="tel:+919843268604" className="footer__icon-btn"
               aria-label="Call us" title="+91 9843268604">
              <Phone size={15} />
            </a>
            <a href="mailto:ulkptrmails@gmail.com" className="footer__icon-btn"
               aria-label="Email us" title="ulkptrmails@gmail.com">
              <Mail size={15} />
            </a>
          </div>

        </div>

        {/* ── GIANT WORDMARK ───────────────────── */}
        <div className="footer__wordmark-wrap" aria-hidden="true">
          <span className="footer__wordmark">AmiritA</span>
        </div>

        {/* ── Bottom bar (sits below the wordmark) */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {year} Amirita Water Plant
          </span>
          <span className="footer__badges">
            <span className="footer__badge">FSSAI</span>
            <span className="footer__badge footer__badge--aqua">RO+UV</span>
            <span className="footer__badge footer__badge--green">BPA-Free</span>
          </span>
          <div className="footer__legal">
            <Link href="/privacy" className="footer__legal-link">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="footer__legal-link">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
