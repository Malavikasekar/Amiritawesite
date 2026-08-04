import Link from 'next/link';
import Image from 'next/image';
import { Flame, ShieldCheck, Truck, CheckCircle2, MessageCircle } from 'lucide-react';
import TrustSection from '@/components/TrustSection';
import './Home.css';

const WHATSAPP_URL =
  'https://wa.me/9843268604?text=Hi%2C%20I%20want%20to%20start%20my%20water%20delivery';

const HOW_STEPS = [
  {
    num: '1',
    title: 'Message us on WhatsApp',
    desc: 'Send "Hi" or your requirement directly to our verified business number.',
  },
  {
    num: '2',
    title: 'Confirm your order',
    desc: 'Share your location. We accept UPI, Cash on Delivery, or monthly subscriptions.',
  },
  {
    num: '3',
    title: 'Receive your water',
    desc: 'Our friendly delivery executive drops off sanitized 20L cans at your door.',
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        {/* ambient blobs */}
        <div className="hero__blob hero__blob--1" aria-hidden="true" />
        <div className="hero__blob hero__blob--2" aria-hidden="true" />

        {/* Full-viewport product image — absolutely positioned, bleeds into bg */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__img-wrap">
            <Image
              src="/images/bg_product_3.png"
              alt="Amirita premium 20L purified water can — crystal clear and ready for delivery"
              fill
              priority
              className="hero__img"
            />
          </div>
        </div>

        {/* Text content sits above the image */}
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="badge hero__badge">
              <Flame size={14} aria-hidden="true" />
              Every Drop, Pure by Nature
            </div>

            <h1 className="h1 hero__title" id="hero-heading">
              Drinking Water<br />
              Delivered to <span className="gradient-text">You.</span>
            </h1>

            <p className="lead hero__sub">
              Experience the highest standard of hydration. Pure drinking 
              water delivered fastest way to your doorstep.
            </p>

            <div className="hero__actions">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="hero-order-btn"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Order via WhatsApp
              </a>
              <Link href="/products" className="btn btn-outline btn-lg">
                View Products &amp; Pricing
              </Link>
            </div>

            {/* Trust chips */}
            <div className="hero__chips">
              <span className="hero__chip">
                <ShieldCheck size={14} aria-hidden="true" />
                FSSAI Certified
              </span>
              <span className="hero__chip">
                <Truck size={14} aria-hidden="true" />
                Same-Day Delivery
              </span>
              <span className="hero__chip">
                <CheckCircle2 size={14} aria-hidden="true" />
                4.9 ★ Rating
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ── TRUST SECTION ────────────────────────── */}
      <TrustSection />

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="hiw section bg-panel" aria-labelledby="hiw-heading">
        <div className="container hiw__inner">

          {/* Image side */}
          <div className="hiw__visual">
            <div className="hiw__img-wrap">
              <Image
                src="/images/water_load.png"
                alt="Amirita water delivery truck en route to customers"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="hiw__img"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Floating badge */}
            <div className="glass-card-sm hiw__badge">
              <div className="hiw__badge-icon">
                <CheckCircle2 size={22} aria-hidden="true" />
              </div>
              <div>
                <div className="hiw__badge-title">Fast &amp; Reliable</div>
                <div className="hiw__badge-sub">Track your delivery instantly</div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="hiw__content">
            <h2 className="h2 hiw__heading" id="hiw-heading">
              Hydration, just a text away.
            </h2>
            <p className="lead hiw__sub">
              No complicated apps, no long forms. Just WhatsApp us and
              we&apos;ll handle the rest — from order to doorstep.
            </p>

            <ol className="hiw__steps">
              {HOW_STEPS.map(({ num, title, desc }) => (
                <li key={num} className="hiw__step">
                  <div className="hiw__step-num" aria-hidden="true">{num}</div>
                  <div>
                    <h4 className="hiw__step-title">{title}</h4>
                    <p className="body hiw__step-desc">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              id="hiw-order-btn"
            >
              Start Delivery Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
