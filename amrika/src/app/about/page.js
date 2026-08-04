"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Award, Users, ShieldCheck, Leaf, CheckCircle2 } from 'lucide-react';
import './about.css';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Uncompromising Purity',
    body: '7-stage RO + UV purification & third-party lab testing.',
    color: 'var(--blue)',
  },
  {
    icon: Users,
    title: 'Customer First',
    body: 'Same-day delivery & seamless subscriptions designed for you.',
    color: 'var(--aqua)',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    body: 'Returnable 20L cans to reduce single-use plastic waste.',
    color: 'var(--success)',
  },
  {
    icon: Award,
    title: 'Certified Excellence',
    body: 'FSSAI licensed & ISO compliant. Quality is our standard.',
    color: '#8B5CF6',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="about-page" ref={containerRef}>
      {/* Cinematic Hero */}
      <header className="about-hero">
        <motion.div className="about-hero__bg" style={{ y: y1, opacity: opacityHero }} />
        
        <div className="container about-hero__content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="badge about-hero__badge"
          >
            Since 2003
          </motion.div>
          
          <h1 className="display about-hero__title">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              Beyond
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="gradient-text"
              style={{ display: 'inline-block' }}
            >
              Hydration.
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="lead about-hero__sub"
          >
            Over two decades of engineering the perfect drop. Pure, certified, and delivered with uncompromising precision.
          </motion.p>
        </div>
      </header>

      {/* The Bento Grid Mosaic */}
      <section className="section bento-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="bento-grid"
          >
            {/* Bento 1: The Core Story (Spans 2 columns) */}
            <motion.div variants={itemVariants} className="bento-card bento-card--story">
              <div className="bento-card__content">
                <h2 className="h2 bento-card__title">The Amirita Standard</h2>
                <p className="body bento-card__p">
                  Born from a simple belief in 2003: absolute purity should never be a luxury. We evolved from a neighborhood supplier to the region's most trusted water authority.
                </p>
                <p className="body bento-card__p">
                  Every 20L can undergoes extreme reverse osmosis and UV sterilization. We don't just filter water; we reconstruct it to its most vibrant, life-giving state.
                </p>
                
                <div className="bento-card__stats-mini">
                  <div className="stat-mini">
                    <span className="stat-mini__val gradient-text">10K+</span>
                    <span className="stat-mini__lbl">Active Families</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-mini__val gradient-text">50+</span>
                    <span className="stat-mini__lbl">Service Regions</span>
                  </div>
                </div>
              </div>
              <div className="bento-card__glow" />
            </motion.div>

            {/* Bento 2: Visual Impact */}
            <motion.div variants={itemVariants} className="bento-card bento-card--visual">
              <div className="bento-card__img-wrapper">
                <Image
                  src="/images/water_delivery_hero.png"
                  alt="Premium Amirita Water"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="bento-img"
                />
              </div>
              <div className="bento-overlay">
                <span className="bento-overlay__badge">
                  <CheckCircle2 size={14} /> FSSAI Certified
                </span>
              </div>
            </motion.div>

            {/* Bento 3: Mission */}
            <motion.div variants={itemVariants} className="bento-card bento-card--mission">
              <div className="bento-icon-box">
                <Target size={28} />
              </div>
              <h3 className="h3">Our Mission</h3>
              <p className="body">
                To deliver the highest standard of health directly to your doorstep. Zero compromises, zero delays.
              </p>
              <div className="bento-card__glow-accent" style={{ '--bento-accent': 'var(--blue)' }} />
            </motion.div>

            {/* Bento 4: Vision */}
            <motion.div variants={itemVariants} className="bento-card bento-card--vision">
              <div className="bento-icon-box" style={{ color: 'var(--aqua)', background: 'var(--aqua-dim)', borderColor: 'rgba(6,182,212,0.2)' }}>
                <Eye size={28} />
              </div>
              <h3 className="h3">Our Vision</h3>
              <p className="body">
                To set the global benchmark for sustainable, ultra-pure water distribution.
              </p>
              <div className="bento-card__glow-accent" style={{ '--bento-accent': 'var(--aqua)' }} />
            </motion.div>

            {/* Values Row within Bento */}
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                variants={itemVariants}
                className="bento-card bento-card--value"
                whileHover={{ y: -5 }}
              >
                <div className="bento-value-icon" style={{ color: val.color }}>
                  <val.icon size={24} />
                </div>
                <h4 className="bento-value-title">{val.title}</h4>
                <p className="caption">{val.body}</p>
                <div className="bento-card__border-glow" style={{ '--border-glow': val.color }} />
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>

      {/* Futuristic closing strip */}
      <section className="section about-closing">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="closing-banner glass-card"
          >
            <h2 className="h2 text-primary" style={{ marginBottom: '0.5rem' }}>Taste the difference of true purity.</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>Join over 10,000 households living healthier lives.</p>
            <a href="/contact" className="btn btn-primary btn-lg">
              Get Your First Order
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
