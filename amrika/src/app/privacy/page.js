import './legal.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Amirita Water Plant — how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <header className="page-banner" aria-labelledby="privacy-heading">
        <div className="container">
          <h1 className="h1 legal__title" id="privacy-heading">Privacy Policy</h1>
          <p className="lead legal__sub">Last updated: June 2025</p>
        </div>
      </header>

      <section className="section" aria-label="Privacy policy content">
        <div className="container legal__content">
          <div className="glass-card legal__card">

            <h2 className="h3 legal__section-title">1. Information We Collect</h2>
            <p className="body">
              When you place an order or contact us, we may collect your name, phone number,
              delivery address, and order details. This information is used solely to fulfil
              your water delivery order and communicate with you about it.
            </p>

            <h2 className="h3 legal__section-title">2. How We Use Your Information</h2>
            <p className="body">
              We use your personal information to process and deliver your orders, send
              delivery notifications, and improve our service. We do not sell, trade, or
              share your data with third parties for marketing purposes.
            </p>

            <h2 className="h3 legal__section-title">3. Data Security</h2>
            <p className="body">
              We take reasonable steps to protect your information. All data is stored
              securely and access is restricted to authorised team members only.
            </p>

            <h2 className="h3 legal__section-title">4. WhatsApp & Communication</h2>
            <p className="body">
              When you contact us via WhatsApp, your messages are subject to WhatsApp&apos;s
              own privacy policy. We only use these communications to process your order.
            </p>

            <h2 className="h3 legal__section-title">5. Cookies</h2>
            <p className="body">
              This website does not use tracking cookies. We may use basic session data
              only for the functioning of the website.
            </p>

            <h2 className="h3 legal__section-title">6. Contact Us</h2>
            <p className="body">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
