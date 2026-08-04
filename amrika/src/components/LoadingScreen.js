'use client';

import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [phase, setPhase] = useState('filling'); // 'filling' | 'done' | 'hidden'

  useEffect(() => {
    // After fill animation completes, trigger exit
    const exitTimer = setTimeout(() => setPhase('done'), 2600);
    // After exit fade, unmount
    const hideTimer = setTimeout(() => setPhase('hidden'), 3200);
    return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`ls ${phase === 'done' ? 'ls--exit' : ''}`} aria-hidden="true">

      {/* ── Background particles / bubbles ── */}
      <div className="ls__bubbles">
        {[...Array(14)].map((_, i) => (
          <span key={i} className="ls__bubble" style={{ '--i': i }} />
        ))}
      </div>

      {/* ── Centre stage ── */}
      <div className="ls__stage">

        {/* Drop icon that falls and splashes */}
        <div className="ls__drop-wrap" aria-hidden="true">
          <svg className="ls__drop" viewBox="0 0 40 56" fill="none">
            <path
              d="M20 2 C20 2 2 24 2 36 a18 18 0 0 0 36 0 C38 24 20 2 20 2Z"
              stroke="url(#dropGrad)" strokeWidth="2.5" fill="url(#dropFill)"
            />
            <defs>
              <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="dropFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.55" />
              </linearGradient>
            </defs>
          </svg>
          {/* Ripple rings on splash */}
          <span className="ls__ripple ls__ripple--1" />
          <span className="ls__ripple ls__ripple--2" />
          <span className="ls__ripple ls__ripple--3" />
        </div>

        {/* Brand name with water-fill clip */}
        <div className="ls__brand">
          {/* Outline layer — always visible */}
          <span className="ls__brand-outline" aria-label="Amirita">Amirita</span>
          {/* Filled layer — clipped by rising water mask */}
          <span className="ls__brand-fill" aria-hidden="true">Amirita</span>
        </div>

        {/* Tagline */}
        <p className="ls__tagline">
          <span className="ls__tag-word">Drinking</span>
          <span className="ls__tag-word">Water</span>
        </p>

        {/* Wave progress bar */}
        <div className="ls__bar-wrap">
          <div className="ls__bar">
            <span className="ls__bar-fill" />
          </div>
          <span className="ls__bar-label">Pure · RO + UV · FSSAI Certified</span>
        </div>

      </div>

      {/* Radial glow behind brand */}
      <div className="ls__glow" />
    </div>
  );
}
