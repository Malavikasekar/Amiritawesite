import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import './products.css';

export const metadata = {
  title: 'Products & Pricing',
  description:
    "Explore Amirita Water's 2L, 1L, 500ml and 300ml RO + UV purified water bottles — FSSAI certified, pH balanced, delivered fresh.",
};

const FEATURES = [
  'RO + UV Purified',
  'FSSAI Certified',
  'pH Balanced',
  'No Added Chemicals',
];

const PRODUCTS = [
  {
    id: 'bottle-2l',
    name: '2 Ltr Water Bottle',
    tagline: 'Family Size',
    description:
      'The ideal large bottle for home and family use. RO + UV purified, BPA-free, and sealed for freshness. Perfect for daily hydration at home, office, or gatherings.',
    image: '/images/water_bottle_2l.jpg',
    imageW: 220,
    imageH: 320,
    price: '₹120',
    unit: 'per case (9 bottles)',
    accent: 'blue',
    popular: true,
    href: '/contact?product=2l',
  },
  {
    id: 'bottle-1l',
    name: '1 Ltr Water Bottle',
    tagline: 'Everyday Essential',
    description:
      'The perfect everyday bottle for work, travel, and personal use. Sealed, BPA-free, and purified to the highest standard. Great for desks, bags, and on-the-go.',
    image: '/images/water_bottle_1l.jpg',
    imageW: 200,
    imageH: 300,
    price: '₹90',
    unit: 'per case (12 bottles)',
    accent: 'aqua',
    popular: false,
    href: '/contact?product=1l',
  },
  {
    id: 'bottle-500ml',
    name: '500ml Water Bottle',
    tagline: 'Compact Hydration',
    description:
      'Perfect pocket-sized bottle for on-the-go hydration. Sealed, BPA-free, and purified to the highest standard. Ideal for gyms, events, offices, and travel.',
    image: '/images/water_bottle_500ml_new.jpg',
    imageW: 180,
    imageH: 280,
    price: '₹120',
    unit: 'per case (24 bottles)',
    accent: 'green',
    popular: false,
    href: '/contact?product=500ml',
  },
  {
    id: 'bottle-300ml',
    name: '300ml Water Bottle',
    tagline: 'Mini & Fresh',
    description:
      "Mini bottle with maximum freshness. Great for kids' lunch boxes, cafes, short commutes, and hospitality. Light, sealed, and eco-friendly.",
    image: '/images/water_bottle_300ml.jpg',
    imageW: 160,
    imageH: 240,
    price: '₹120',
    unit: 'per case (30 bottles)',
    accent: 'purple',
    popular: false,
    href: '/contact?product=300ml',
  },
];

export default function Products() {
  return (
    <div className="products-page">
      {/* Banner */}
      <header className="page-banner" aria-labelledby="products-heading">
        <div className="container">
          <p className="badge products__eyebrow">Products &amp; Pricing</p>
          <h1 className="h1 products__hero-title" id="products-heading">
            Pure Water, <span className="gradient-text">Your Way.</span>
          </h1>
          <p className="lead products__hero-sub">
            Choose from our range of 2L, 1L, 500ml and 300ml bottles.
            Every drop is RO&nbsp;+&nbsp;UV purified and FSSAI certified.
          </p>
        </div>
      </header>

      {/* Features strip */}
      <div className="products__features-strip bg-panel">
        <div className="container products__features-inner">
          {FEATURES.map((f) => (
            <div key={f} className="products__feature">
              <CheckCircle2 size={16} aria-hidden="true" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Product grid — 3 cards */}
      <section className="section" aria-label="Our products">
        <div className="container">
          <div className="products__grid products__grid--four">
            {PRODUCTS.map((p, i) => (
              <article
                key={p.id}
                className={[
                  'product-card',
                  `product-card--${p.accent}`,
                  p.popular ? 'product-card--popular' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={p.name}
                style={{ '--card-index': i }}
              >
                {p.popular && (
                  <div className="product-card__badge" aria-label="Best seller">
                    🔥 Best Seller
                  </div>
                )}

                <div className="product-card__image">
                  <Image
                    src={p.image}
                    alt={`Amirita ${p.name}`}
                    width={p.imageW}
                    height={p.imageH}
                    style={{ objectFit: 'contain' }}
                    className="product-card__img"
                  />
                </div>

                <div className="product-card__body">
                  <p className="caption product-card__tagline">{p.tagline}</p>
                  <h2 className="h3 product-card__name">{p.name}</h2>
                  <p className="body product-card__desc">{p.description}</p>

                  {p.price && (
                    <div className="product-card__price">
                      <span className="product-card__amount">{p.price}</span>
                      <span className="caption product-card__unit">{p.unit}</span>
                    </div>
                  )}

                  <Link
                    href={p.href}
                    className={[
                      'btn product-card__cta',
                      p.popular
                        ? 'btn-primary'
                        : 'btn-outline',
                    ].join(' ')}
                    id={`product-order-${p.id}`}
                  >
                    Order Now
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
