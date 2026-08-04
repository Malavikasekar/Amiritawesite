'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Droplets, Phone } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '/',         label: 'Home1' },
  { href: '/about',    label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
];

const WHATSAPP_URL =
  'https://wa.me/9843268604?text=Hi%2C%20I%20would%20like%20to%20order%20Amirita%20Water';

export default function Navbar() {
  const pathname  = usePathname();
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">

        {/* Logo */}
        <Link href="/" className="navbar__logo" aria-label="Amirita Water — home">
          <Droplets size={28} aria-hidden="true" />
          <span>Amirita <strong>Water</strong></span>
        </Link>

        {/* Desktop links */}
        <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`} id="nav-menu">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp navbar__cta"
            id="nav-whatsapp-cta"
          >
            <Phone size={16} aria-hidden="true" />
            Order via WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          id="nav-mobile-toggle"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
}
