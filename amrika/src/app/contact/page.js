'use client';

import { useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ArrowRight,
  CheckCircle2,
  Check,
  ShoppingCart,
  Package2,
} from 'lucide-react';
import './contact.css';

/* ── Config ──────────────────────────────────────────────────── */
const WHATSAPP_BASE = 'https://wa.me/9843268604';

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '+91 9843268604', href: 'tel:+919843268604' },
  { icon: Mail, label: 'Email', value: 'ulkptrmails@gmail.com', href: 'mailto:ulkptrmails@gmail.com' },
  {
    icon: MapPin,
    label: 'Address',
    value: 'No. 10/1, Panaikulam Village, T. Veppankulam Panchayat, Kariapatti Taluk, Virudhunagar Dist – 626106',
    href: null,
  },
];

const BOTTLE_PRODUCTS = [
  {
    id: '2l',
    name: '2 Ltr Bottle',
    pricePerBottle: null,
    bottlesPerCase: 9,
    pricePerCase: 120,
    image: '/images/water_bottle_2l.jpg',
    accent: 'blue',
    param: '2l',
  },
  {
    id: '1l',
    name: '1 Ltr Bottle',
    pricePerBottle: null,
    bottlesPerCase: 12,
    pricePerCase: 90,
    image: '/images/water_bottle_1l.jpg',
    accent: 'aqua',
    param: '1l',
  },
  {
    id: '500ml',
    name: '500ml Bottle',
    pricePerBottle: null,
    bottlesPerCase: 24,
    pricePerCase: 120,
    image: '/images/water_bottle_500ml_new.jpg',
    accent: 'green',
    param: '500ml',
  },
  {
    id: '300ml',
    name: '300ml Bottle',
    pricePerBottle: null,
    bottlesPerCase: 30,
    pricePerCase: 120,
    image: '/images/water_bottle_300ml.jpg',
    accent: 'purple',
    param: '300ml',
  },
];

function AnimatedPhoneInput({ value, onChange, error, ariaDescribedBy }) {
  const handleKeyDown = (e) => {
    // Only allow numbers, backspace, delete, tab, arrows
    if (
      !/^[0-9]$/.test(e.key) &&
      !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    onChange(val);
  };

  const digits = value.split('');
  const placeholders = Array.from({ length: 10 - digits.length });

  return (
    <div className={`animated-phone-wrapper ${error ? 'animated-phone-wrapper--error' : ''}`}>
      <span className="phone-prefix" aria-hidden="true">+91</span>

      <input
        id="phone"
        type="tel"
        name="phone"
        className="phone-hidden-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={10}
        aria-describedby={ariaDescribedBy}
        autoComplete="tel"
        aria-label="Mobile Number"
      />

      <div className="phone-visual-display" aria-hidden="true">
        {digits.map((digit, i) => (
          <div key={i} className="digit-slot">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={digit + i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="digit"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
        {placeholders.map((_, i) => (
          <div key={`p-${i}`} className="digit-slot digit-slot--placeholder">
            <span className="digit">_</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Inner form (needs useSearchParams → must be in Suspense) ── */
function OrderForm() {
  const params = useSearchParams();
  const productParam = params.get('product'); // '500ml' | '250ml' | 'custom' | null

  const [selectedProducts, setSelectedProducts] = useState(() => {
    const initial = {};
    if (productParam === '2l') initial['2l'] = true;
    else if (productParam === '1l') initial['1l'] = true;
    else if (productParam === '500ml') initial['500ml'] = true;
    else if (productParam === '300ml') initial['300ml'] = true;
    else if (productParam === 'custom') {
      initial['2l'] = true;
      initial['1l'] = true;
      initial['500ml'] = true;
      initial['300ml'] = true;
    }
    return initial;
  });

  const [quantities, setQuantities] = useState({
    '2l': 1,
    '1l': 1,
    '500ml': 1,
    '300ml': 1,
  });

  const [form, setForm] = useState({ name: '', phone: '', deliveryDate: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /* Ref on the form panel top — used to scroll-into-view on success */
  const formTopRef = useRef(null);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    /* Clear the specific field error as the user types */
    if (errors[e.target.name]) {
      setErrors((p) => ({ ...p, [e.target.name]: '' }));
    }
  };

  const handlePhoneChange = (val) => {
    setForm((p) => ({ ...p, phone: val }));
    if (errors.phone) {
      setErrors((p) => ({ ...p, phone: '' }));
    }
  };

  const nothingSelected = !BOTTLE_PRODUCTS.some((prod) => selectedProducts[prod.id]);

  /* Computed totals */
  const grandTotal = BOTTLE_PRODUCTS.reduce((acc, prod) => {
    if (selectedProducts[prod.id]) {
      return acc + (quantities[prod.id] || 0) * prod.pricePerCase;
    }
    return acc;
  }, 0);

  /* WhatsApp message */
  const buildWAText = () => {
    const lines = ["Hi! I'd like to place a water bottle order."];
    if (form.name) lines.push(`Name: ${form.name}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    BOTTLE_PRODUCTS.forEach((prod) => {
      if (selectedProducts[prod.id]) {
        const qty = quantities[prod.id] || 1;
        lines.push(`${prod.name}: ${qty} case(s) = ${qty * prod.bottlesPerCase} bottles`);
      }
    });
    if (form.deliveryDate) lines.push(`Delivery Date: ${form.deliveryDate}`);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    /* ── Validate ───────────────────────────────────────────── */
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';

    const phoneVal = form.phone.trim();
    if (!phoneVal) {
      errs.phone = 'Mobile number is required.';
    } else if (phoneVal.length !== 10) {
      errs.phone = 'Mobile number must be exactly 10 digits.';
    } else if (!/^[6-9]/.test(phoneVal)) {
      errs.phone = 'Mobile numbers must start with 6, 7, 8, or 9.';
    } else if (/^(\d)\1{9}$/.test(phoneVal)) {
      errs.phone = 'Identical digits are not allowed.';
    } else {
      const seqForward = '01234567890123456789';
      const seqBackward = '98765432109876543210';
      if (seqForward.includes(phoneVal) || seqBackward.includes(phoneVal)) {
        errs.phone = 'Sequential numbers are not allowed.';
      } else if (/^(\d{2})\1{4}$/.test(phoneVal) || /^(\d{5})\1{1}$/.test(phoneVal)) {
        errs.phone = 'Repeated patterns are not allowed.';
      }
    }
    if (nothingSelected) errs.product = 'Please select at least one product.';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    /* ── Resend API Request ─────────────────────────────────── */
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Customer_Name: form.name,
          Mobile_Number: form.phone,
          Delivery_Date: form.deliveryDate,
          Order_2l: selectedProducts['2l'] ? `${quantities['2l']} case(s) = ${quantities['2l'] * 9} bottles` : null,
          Order_1l: selectedProducts['1l'] ? `${quantities['1l']} case(s) = ${quantities['1l'] * 12} bottles` : null,
          Order_500ml: selectedProducts['500ml'] ? `${quantities['500ml']} case(s) = ${quantities['500ml'] * 24} bottles` : null,
          Order_300ml: selectedProducts['300ml'] ? `${quantities['300ml']} case(s) = ${quantities['300ml'] * 30} bottles` : null,
          Estimated_Total: `₹${grandTotal}`,
        }),
      });

      const data = await res.json();
      console.log('[Resend response]', data); // visible in browser DevTools

      if (data.success) {
        setIsSuccess(true);
        /* Scroll to the success card */
        setTimeout(() => {
          formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      } else {
        const reason = data.message || 'Unknown error';
        setSubmitError(`Order not sent — ${reason}. Use WhatsApp below as a backup.`);
      }
    } catch (err) {
      console.error('[API fetch error]', err);
      setSubmitError('Network error — please check your connection or use WhatsApp below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setForm({ name: '', phone: '', deliveryDate: '' });
    setSelectedProducts({});
    setQuantities({
      '2l': 1,
      '1l': 1,
      '500ml': 1,
      '300ml': 1,
    });
    setIsSuccess(false);
    setErrors({});
    setSubmitAttempted(false);
    setSubmitError('');
  };

  /* ── Success state ─────────────────────────────────────────── */
  if (isSuccess) {
    return (
      <div ref={formTopRef} className="contact__success" role="status" aria-live="polite">
        <div className="contact__success-icon">
          <CheckCircle2 size={44} aria-hidden="true" />
        </div>
        <h2 className="h3 contact__success-title">Order Received! 🎉</h2>
        <p className="body contact__success-msg">
          Thank you, <strong>{form.name}</strong>. Your order of{' '}
          {BOTTLE_PRODUCTS.filter((prod) => selectedProducts[prod.id]).map((prod, idx, arr) => {
            const qty = quantities[prod.id] || 1;
            const separator = idx === 0 ? '' : idx === arr.length - 1 ? ' and ' : ', ';
            return (
              <span key={prod.id}>
                {separator}
                <strong>
                  {qty} case(s) of {prod.name} ({qty * prod.bottlesPerCase} bottles)
                </strong>
              </span>
            );
          })}{' '}
          has been received. We&apos;ll call{' '}
          <strong>{form.phone}</strong> to confirm delivery.
        </p>

        <div className="contact__success-actions">
          <a
            href={`${WHATSAPP_BASE}?text=${buildWAText()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id="contact-success-whatsapp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Confirm on WhatsApp
          </a>
          <button
            className="btn btn-outline"
            onClick={reset}
            id="contact-order-again-btn"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  /* ── Order form ────────────────────────────────────────────── */
  return (
    <>
      {/* Invisible anchor at the very top of the form panel — scrolled to on success */}
      <div ref={formTopRef} aria-hidden="true" style={{ position: 'absolute', top: 0 }} />

      <div className="contact__form-header">
        <h2 className="h3 contact__form-title">Quick Order Form</h2>
        <p className="body contact__form-sub">
          Select your products, set quantities, and place your order in seconds.
        </p>
      </div>

      <form
        className="contact__form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Water bottle order form"
      >
        {/* ── Step 1: Select Products ───────────────────────── */}
        <div className="order-step">
          <p className="order-step__label">
            <span className="order-step__num" aria-hidden="true">1</span>
            Select Products
          </p>

          <div className="product-selector" role="group" aria-label="Select bottle sizes">
            {BOTTLE_PRODUCTS.map((prod) => {
              const isSelected = !!selectedProducts[prod.id];
              const toggle = () =>
                setSelectedProducts((prev) => ({
                  ...prev,
                  [prod.id]: !prev[prod.id],
                }));

              return (
                <button
                  key={prod.id}
                  type="button"
                  className={[
                    'prod-toggle',
                    `prod-toggle--${prod.accent}`,
                    isSelected ? 'prod-toggle--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={toggle}
                  aria-pressed={isSelected}
                  id={`select-${prod.id}`}
                >
                  {/* Animated check */}
                  <span className="prod-toggle__check" aria-hidden="true">
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </span>

                  {/* Bottle thumbnail */}
                  <span className="prod-toggle__img-wrap" aria-hidden="true">
                    <Image
                      src={prod.image}
                      alt=""
                      width={50}
                      height={68}
                      style={{ objectFit: 'contain' }}
                    />
                  </span>

                  {/* Info */}
                  <span className="prod-toggle__info">
                    <span className="prod-toggle__name">{prod.name}</span>
                    <span className="prod-toggle__sub">
                      {prod.bottlesPerCase} bottles/case
                    </span>
                  </span>

                  {/* Price-per-case badge */}
                  <span className="prod-toggle__case-price" aria-hidden="true">
                    ₹{prod.pricePerCase}
                    <span>/case</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Only show product error after a submit attempt */}
          {submitAttempted && errors.product && (
            <p className="order-step__hint" role="alert" aria-live="polite">
              {errors.product}
            </p>
          )}
        </div>

        {/* ── Step 2: Number of Cases (visible only when a product is selected) ── */}
        {!nothingSelected && (
          <div className="order-step order-step--cases">
            <p className="order-step__label">
              <span className="order-step__num" aria-hidden="true">2</span>
              Number of Cases
            </p>

            <div className="cases-grid">
              {BOTTLE_PRODUCTS.filter((prod) => selectedProducts[prod.id]).map((prod) => {
                const qty = quantities[prod.id] || 1;
                const accentClass = `cases-row--${prod.accent}`;
                return (
                  <div key={prod.id} className={`cases-row ${accentClass}`}>
                    <Package2 size={18} className="cases-row__icon" aria-hidden="true" />
                    <span className="cases-row__label">{prod.name} Cases</span>

                    <div
                      className="qty-control"
                      role="group"
                      aria-label={`${prod.name} cases quantity`}
                    >
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [prod.id]: Math.max(1, (prev[prod.id] || 1) - 1),
                          }))
                        }
                        aria-label={`Decrease ${prod.name} cases`}
                        id={`qty-${prod.id}-decrease`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-value" aria-live="polite" aria-atomic="true">
                        {qty}
                      </span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [prod.id]: (prev[prod.id] || 1) + 1,
                          }))
                        }
                        aria-label={`Increase ${prod.name} cases`}
                        id={`qty-${prod.id}-increase`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <span className="cases-row__sub">
                      = {qty * prod.bottlesPerCase} bottles · ₹{qty * prod.pricePerCase}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 3: Your Details ──────────────────────────── */}
        <div className="order-step">
          <p className="order-step__label">
            <span className="order-step__num" aria-hidden="true">3</span>
            Your Details
          </p>

          <div className="form-fields">
            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                className={`form-input${errors.name ? ' form-input--error' : ''}`}
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Mohamed Faseed"
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <p className="form-error" id="name-error" role="alert">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Mobile Number *</label>
              <AnimatedPhoneInput
                value={form.phone}
                onChange={handlePhoneChange}
                error={!!errors.phone}
                ariaDescribedBy={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p className="form-error" id="phone-error" role="alert">{errors.phone}</p>
              )}
            </div>

            {/* Delivery Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="deliveryDate">
                Expected Delivery Date
              </label>
              <input
                id="deliveryDate"
                type="date"
                name="deliveryDate"
                className={`form-input${errors.deliveryDate ? ' form-input--error' : ''}`}
                value={form.deliveryDate}
                onChange={handleChange}
                aria-describedby={errors.deliveryDate ? 'date-error' : undefined}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.deliveryDate && (
                <p className="form-error" id="date-error" role="alert">{errors.deliveryDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Live Order Summary ────────────────────────────── */}
        {!nothingSelected && (
          <div className="order-summary" aria-label="Live order summary" aria-live="polite">
            <p className="order-summary__title">
              <ShoppingCart size={15} aria-hidden="true" />
              Order Summary
            </p>

            <div className="order-summary__items">
              {BOTTLE_PRODUCTS.filter((prod) => selectedProducts[prod.id]).map((prod) => {
                const qty = quantities[prod.id] || 1;
                return (
                  <div key={prod.id} className={`order-summary__item order-summary__item--${prod.accent}`}>
                    <span>
                      {prod.name} &times; {qty} case{qty !== 1 ? 's' : ''}
                    </span>
                    <span className="order-summary__price">
                      {qty * prod.bottlesPerCase} bottles · ₹{qty * prod.pricePerCase}
                    </span>
                  </div>
                );
              })}
              {!nothingSelected && (
                <div className="order-summary__item order-summary__item--total">
                  <span><strong>Estimated Total</strong></span>
                  <span className="order-summary__price"><strong>₹{grandTotal}</strong></span>
                </div>
              )}
            </div>


          </div>
        )}

        {/* ── Network / server error banner ─────────────────── */}
        {submitError && (
          <div className="submit-error" role="alert">
            <span>{submitError}</span>
            <a
              href={`${WHATSAPP_BASE}?text=${buildWAText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="submit-error__wa"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Order via WhatsApp
            </a>
          </div>
        )}

        {/* ── Submit ───────────────────────────────────────── */}
        <button
          type="submit"
          className="btn btn-primary contact__submit"
          disabled={isSubmitting}
          id="contact-submit-btn"
        >
          {isSubmitting ? (
            <span className="spinner" role="status" aria-label="Sending your order…" />
          ) : (
            <>
              Place Order <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

/* ── Page shell ──────────────────────────────────────────────── */
export default function Contact() {
  return (
    <div className="contact-page">
      {/* Page banner */}
      <header
        className="page-banner contact-page__banner"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <p className="badge contact__eyebrow">Place an Order</p>
          <h1 className="h1 contact__hero-title" id="contact-heading">
            Fresh Water, <span className="gradient-text">Your Doorstep.</span>
          </h1>
          <p className="lead contact__hero-sub">
            Select your bottles, set your quantity, and we&apos;ll deliver.
            No apps, no hassle — just fresh water at your door.
          </p>
        </div>
      </header>

      {/* Main two-column layout */}
      <section className="section" aria-label="Order form and contact information">
        <div className="container contact__inner">

          {/* ── LEFT: Contact info ─────────────────────────── */}
          <aside
            className="contact__info-panel glass-card"
            aria-label="Contact information"
          >
            <h2 className="h3 contact__info-title">Contact Information</h2>
            <p className="body contact__info-sub">
              Prefer to call, email, or visit us? Here&apos;s how to reach our team.
            </p>

            <ul className="contact__info-list">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="contact__info-item">
                  <div className="icon-circle contact__info-icon">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="caption contact__info-label">{label}</div>
                    {href ? (
                      <a href={href} className="contact__info-value">{value}</a>
                    ) : (
                      <span className="contact__info-value">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact__wa-block">
              <p className="caption contact__wa-caption">
                Fastest way to order — just message us:
              </p>
              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp contact__wa-btn"
                id="contact-whatsapp-btn"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Open WhatsApp Chat
              </a>
            </div>
          </aside>

          {/* ── RIGHT: Order form (Suspense required for useSearchParams) ── */}
          <div className="contact__form-panel glass-card" role="main" style={{ position: 'relative' }}>
            <Suspense
              fallback={
                <div className="contact__loading" aria-live="polite">
                  <span className="spinner" aria-label="Loading order form" />
                  <span>Loading order form…</span>
                </div>
              }
            >
              <OrderForm />
            </Suspense>
          </div>

        </div>
      </section>
    </div>
  );
}
