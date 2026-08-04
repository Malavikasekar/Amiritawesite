import '../privacy/legal.css';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Amirita Water Plant — rules and conditions for using our water delivery services.',
};

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <header className="page-banner" aria-labelledby="terms-heading">
        <div className="container">
          <h1 className="h1 legal__title" id="terms-heading">Terms of Service</h1>
          <p className="lead legal__sub">Last updated: June 2025</p>
        </div>
      </header>

      <section className="section" aria-label="Terms of service content">
        <div className="container legal__content">
          <div className="glass-card legal__card">

            <h2 className="h3 legal__section-title">1. Acceptance of Terms</h2>
            <p className="body">
              By placing an order or using our services, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2 className="h3 legal__section-title">2. Order & Delivery</h2>
            <p className="body">
              Orders placed before 2:00 PM are eligible for same-day delivery, subject to
              availability in your area. We reserve the right to reschedule deliveries due
              to unforeseen circumstances and will notify you promptly.
            </p>

            <h2 className="h3 legal__section-title">3. Pricing & Payment</h2>
            <p className="body">
              Prices are listed per product and are subject to change. We accept UPI, Cash
              on Delivery, and monthly subscription payments. Prices may vary for bulk orders;
              contact us for a custom quote.
            </p>

            <h2 className="h3 legal__section-title">4. Water Can Returns</h2>
            <p className="body">
              Our 20L water cans are returnable assets. Customers are expected to return
              empty cans upon delivery of a new order. Unreturned cans may be charged
              separately.
            </p>

            <h2 className="h3 legal__section-title">5. Quality Guarantee</h2>
            <p className="body">
              We guarantee that all water supplied is RO + UV purified and FSSAI compliant.
              If you are dissatisfied with a delivery, contact us within 24 hours for a
              replacement or refund.
            </p>

            <h2 className="h3 legal__section-title">6. Limitation of Liability</h2>
            <p className="body">
              Amirita Water Plant shall not be liable for any indirect or consequential
              damages arising from the use of our services beyond the value of the order
              in question.
            </p>

            <h2 className="h3 legal__section-title">7. Contact Us</h2>
            <p className="body">
              For any questions regarding these Terms, please contact us at{' '}
              {/* TODO: Replace with real email */}
              <a href="mailto:ulkptrmails@gmail.com" style={{ color: 'var(--aqua)' }}>
                ulkptrmails@gmail.com
              </a>.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
