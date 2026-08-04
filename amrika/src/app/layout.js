import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Amirita Water Plant | Pure Drinking Water Delivered to You',
    template: '%s | Amirita Water Plant',
  },
  description:
    'Premium RO + UV purified drinking water delivered same-day to your home and office. FSSAI certified. Order via WhatsApp in seconds.',
  keywords: ['water delivery', 'purified water', 'RO water', '20L water can', 'drinking water', 'Amirita Water'],
  openGraph: {
    title: 'Amirita Water Plant | Pure Drinking Water Delivered to You',
    description:
      'Premium RO + UV purified drinking water delivered same-day to your home and office.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
