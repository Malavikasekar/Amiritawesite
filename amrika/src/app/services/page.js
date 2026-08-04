import Link from 'next/link';
import { Home, Building2, CalendarDays, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import './services.css';

export const metadata = {
  title: 'Services',
  description:
    'Amirita Water Plant offers residential delivery, corporate water supply, event water supply, and bulk tanker services.',
};

const SERVICES = [
  {
    id: 'residential',
    icon: Home,
    accent: '#3B82F6',
    title: 'Residential Delivery',
    desc: 'Never run out of clean water. We deliver 20L cans directly to your doorstep on your schedule — daily, weekly, or on-demand.',
    features: [
      'Same-day delivery available',
      'Monthly subscription plans',
      'Dispenser rental available',
      'SMS/WhatsApp reminders',
    ],
    cta: 'Schedule Delivery',
  },
  {
    id: 'corporate',
    icon: Building2,
    accent: '#06B6D4',
    title: 'Corporate Supply',
    desc: 'Keep your team hydrated and productive. We supply offices, co-working spaces, and factories with reliable bulk water.',
    features: [
      'Custom delivery schedule',
      'Dispenser installation & service',
      'Dedicated account manager',
      'Monthly invoicing available',
    ],
    cta: 'Get Corporate Quote',
  },
  {
    id: 'events',
    icon: CalendarDays,
    accent: '#8B5CF6',
    title: 'Event Water Supply',
    desc: 'Hosting a wedding, conference, or festival? We supply 500ml, 1L bottles, and 20L cans in bulk for any event size.',
    features: [
      'Bulk order discounts',
      'Branded bottle options',
      'Day-of delivery guaranteed',
      'Flexible quantity adjustments',
    ],
    cta: 'Book for Event',
  },
  {
    id: 'bulk',
    icon: Truck,
    accent: '#10B981',
    title: 'Bulk & Tanker Supply',
    desc: 'Large-scale RO treated water via tanker for construction sites, townships, factories, and industrial requirements.',
    features: [
      'Food-grade tanker trucks',
      'Scalable volume ordering',
      'Emergency supply available',
      'Competitive bulk pricing',
    ],
    cta: 'Contact for Bulk',
  },
];

export default function Services() {
  return (
    <div className="services-page">
      {/* Banner */}
      <header className="page-banner" aria-labelledby="services-heading">
        <div className="container">
          <p className="badge services__eyebrow">What We Offer</p>
          <h1 className="h1 services__hero-title" id="services-heading">
            Tailored Water Solutions<br />
            for <span className="gradient-text">Every Need.</span>
          </h1>
          <p className="lead services__hero-sub">
            From a single household to a large enterprise — we have a water
            solution designed exactly for you.
          </p>
        </div>
      </header>

      {/* Service Cards */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="services__grid">
            {SERVICES.map(({ id, icon: Icon, accent, title, desc, features, cta }) => (
              <article key={id} className="service-card" aria-label={title}>
                <div
                  className="service-card__icon icon-circle"
                  style={{ '--card-accent': accent }}
                >
                  <Icon size={28} aria-hidden="true" />
                </div>

                <h2 className="h3 service-card__title">{title}</h2>
                <p className="body service-card__desc">{desc}</p>

                <ul className="service-card__features" aria-label={`${title} features`}>
                  {features.map((f) => (
                    <li key={f} className="service-card__feature">
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="btn btn-outline service-card__cta"
                  id={`service-cta-${id}`}
                >
                  {cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="services__cta-band bg-panel" aria-labelledby="services-cta-heading">
        <div className="container services__cta-inner">
          <div>
            <h2 className="h2 services__cta-title" id="services-cta-heading">
              Not sure which plan fits you?
            </h2>
            <p className="lead services__cta-sub">
              Our team will help you find the perfect water solution. Just reach out.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-lg" id="services-contact-cta">
            Talk to Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
