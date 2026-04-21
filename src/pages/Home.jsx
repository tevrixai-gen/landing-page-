import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Zap, Sparkles, ArrowRight, CheckCircle, TrendingUp,
  Cpu, Globe, Activity, Lock, Mail, ChevronRight,
  Flag, Users, Mic, BarChart3, Bot, Headphones
} from 'lucide-react';
import { BPO_STATS } from '../data';
import { ServiceCards, SectorCards } from '../Cards';
const logo = '/logo.png';

/* ============================================================
   MARQUEE STATS TICKER
   ============================================================ */
const StatsTicker = () => {
  const doubled = [...BPO_STATS, ...BPO_STATS];
  return (
    <section className="relative py-10 px-0 overflow-hidden">
      <div className="gradient-divider mb-6" />
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <div key={i} className="stat-card mx-3 flex-shrink-0 min-w-[160px] text-center py-4 px-6">
              <div className="text-2xl font-bold text-slate-900 tracking-tight mb-0.5">{s.n}</div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="gradient-divider mt-6" />
    </section>
  );
};

/* ============================================================
   TILT WRAPPER
   ============================================================ */
const TiltDiv = ({ children, className = '' }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useTransform(my, [-60, 60], [3, -3]);
  const rY = useTransform(mx, [-60, 60], [-3, 3]);
  return (
    <motion.div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   HERO
   ============================================================ */
const Hero = ({ onDemo }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useTransform(my, [-500, 500], [4, -4]);
  const rY = useTransform(mx, [-500, 500], [-4, 4]);

  return (
    <section
      onMouseMove={e => {
        if (window.innerWidth >= 768) {
          mx.set((e.clientX - window.innerWidth / 2) * 0.25);
          my.set((e.clientY - window.innerHeight / 2) * 0.25);
        }
      }}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="warm-mesh-bg" />
      <div className="mesh-blob blob-amber" />
      <div className="mesh-blob blob-violet" />
      <div className="mesh-blob blob-amber-br" />
      <div className="mesh-blob blob-violet-bl" />
      <div className="dot-grid" />

      <div className="relative z-10 max-w-5xl mx-auto" style={{ perspective: '1400px' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="flex justify-center mb-8"
        >
          <span className="label-badge">
            <Sparkles className="w-3.5 h-3.5 fill-current opacity-70" />
            AI Customer Care · AI Employees · Built in India
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-[76px] lg:text-[88px] font-bold leading-[0.92] tracking-tighter text-slate-950">
            Humans Innovate.<br />
            <span className="text-gradient-amber">AI Operates.</span>
          </h1>
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
        >
          We're building AI that handles every customer interaction — and AI that works as your
          employees across every department. Starting with customer care, scaling to the entire enterprise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/ai-bpo" className="btn-primary text-[14px]">
            See What We're Building <ArrowRight className="w-4 h-4" />
          </Link>
          <button onClick={onDemo} className="btn-secondary text-[14px]">
            Book a Live Demo
          </button>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-[13px] font-medium"
        >
          {['Building MVP', 'Founded Jan 2026', 'Open for Early Access', 'Built in India'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Aurora glow — Sarvam-style warm sunset bleeding up from footer */}
      <div className="aurora-hero-bottom" />
    </section>
  );
};

/* ============================================================
   WHAT WE ARE BUILDING
   ============================================================ */
const WhatWeAreBuilding = () => (
  <section className="relative py-20 md:py-28 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="label-badge mb-5 inline-flex"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current opacity-70" /> Our Focus
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-5xl md:text-6xl text-slate-950 mb-5"
        >
          What We're Building.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
          className="text-lg text-slate-500 max-w-2xl mx-auto"
        >
          Two distinct tracks. One company. Starting focused, scaling with precision.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

        {/* Track 1 — AI Customer Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="card-3d card-bpo p-8 md:p-10 flex flex-col"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center mb-6">
            <Headphones className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3">Track 01 · Live & Scaling</div>
          <h3 className="text-2xl font-bold text-slate-950 mb-4 leading-tight">
            AI Customer Experience<br />
            <span className="text-gradient-amber">→ AI BPO</span>
          </h3>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
            We started with AI Customer Care — the single highest-volume, highest-cost operation in any business.
            We're perfecting it, then scaling horizontally: e-commerce first, then banking, healthcare, telecom, and beyond.
            As we expand across sectors, it becomes a full AI BPO for customer experience.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['AI Customer Care', 'E-Commerce', 'Banking', 'Healthcare', 'Telecom', 'Full AI BPO'].map((tag, i) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-3 py-1 rounded-full border"
                style={{
                  background: i === 5 ? 'rgba(245,158,11,0.1)' : 'rgba(0,0,0,0.03)',
                  borderColor: i === 5 ? 'rgba(245,158,11,0.3)' : 'rgba(0,0,0,0.07)',
                  color: i === 5 ? '#D97706' : '#64748B',
                }}
              >
                {i === 0 ? '✓ ' : i === 5 ? '→ ' : ''}{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Track 2 — AI Employees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
          className="card-3d p-8 md:p-10 flex flex-col"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.03) 0%, rgba(245,158,11,0.02) 100%)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-200 flex items-center justify-center mb-6">
            <Bot className="w-5 h-5 text-violet-600" />
          </div>
          <div className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-3">Track 02 · The Bigger Vision</div>
          <h3 className="text-2xl font-bold text-slate-950 mb-4 leading-tight">
            AI Employees —<br />
            <span className="text-gradient-amber">The Future Workforce</span>
          </h3>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
            Beyond customer care — AI agents that work inside your company as permanent members of every department.
            An AI HR lead sourcing and hiring 24/7. An AI Compliance officer that never misses a clause.
            An AI Finance analyst closing books in real time. Not software tools — actual employees.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['AI HR', 'AI Compliance', 'AI Finance', 'AI Legal', 'Any Department', 'Any Sector'].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-3 py-1 rounded-full border"
                style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.15)', color: '#6D28D9' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

/* ============================================================
   AI BPO TEASER
   ============================================================ */
const AIBPOTeaser = () => (
  <section id="ai-bpo-teaser" className="relative py-20 md:py-32 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }} viewport={{ once: true }}
        >
          <span className="label-badge mb-6 inline-flex">
            <TrendingUp className="w-3.5 h-3.5" /> Our Biggest Ambition
          </span>
          <h2 className="text-5xl md:text-6xl text-slate-950 mb-6">
            AI-Powered Customer<br />
            <span className="text-gradient-amber">Experience at Scale.</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed mb-6">
            The global BPO industry runs on human labor — millions of agents in offshore call
            centers handling the same queries, day after day. We're replacing every repeatable
            process with AI that delivers superior CX at a fraction of the cost.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            Reception, HR, finance, customer support, document processing — every department,
            automated. Tevrix AI is the operating system for the post-human enterprise.
          </p>
          <Link to="/ai-bpo" className="btn-primary text-[14px] inline-flex">
            Explore AI BPO <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1 }} viewport={{ once: true }}
        >
          <TiltDiv className="card-3d card-bpo p-10">
            <div className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-8">Market Opportunity</div>
            <div className="space-y-5">
              {[
                { label: 'Global BPO Market Size',      value: '$280B', color: 'text-amber-500' },
                { label: 'AI Automation Addressable',   value: '73%',   color: 'text-violet-500' },
                { label: 'Cost Reduction vs. Offshore', value: '85%',   color: 'text-emerald-500' },
                { label: 'Output Speed Multiplier',      value: '140×',  color: 'text-amber-500' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-3 border-b border-black/[0.05] last:border-0">
                  <span className="text-slate-500 text-[14px] font-medium">{r.label}</span>
                  <span className={`text-2xl font-bold tracking-tight ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </div>
            <Link to="/ai-bpo" className="btn-primary w-full justify-center mt-8 text-[14px]">
              Learn About AI BPO <ArrowRight className="w-4 h-4" />
            </Link>
          </TiltDiv>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ============================================================
   SERVICES SECTION
   ============================================================ */
const ServicesSection = () => (
  <section id="solutions" className="relative py-20 md:py-32 px-6 overflow-hidden">
    <div className="aurora-section-end" />
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="label-badge mb-5 inline-flex"
        >
          <Cpu className="w-3.5 h-3.5" /> AI Modules
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-5xl md:text-6xl text-slate-950 mb-5"
        >
          Every Process.<br /><span className="text-gradient-amber">One Platform.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
          className="text-lg text-slate-500 max-w-xl mx-auto"
        >
          Six modular AI agents, each purpose-built for a BPO vertical.
          Click any module to explore the technology and ROI in detail.
        </motion.p>
      </div>
      <ServiceCards />
    </div>
  </section>
);

/* ============================================================
   SECTORS SECTION — enhanced cards
   ============================================================ */
const SectorsSection = () => (
  <section id="sectors" className="relative py-24 px-6 overflow-hidden">
    <div className="aurora-section-end" />
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="label-badge mb-5 inline-flex"><Globe className="w-3.5 h-3.5" /> Industries We Serve</span>
        <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">Built for Every Sector.</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          From e-commerce to healthcare — Tevrix AI adapts to every regulatory, linguistic,
          and operational demand.
        </p>
      </div>
      <SectorCards />
    </div>
  </section>
);

/* ============================================================
   INDIA SECTION — "Built in Bharat"
   ============================================================ */
const IndiaSection = () => (
  <section id="india" className="relative py-32 px-6 overflow-hidden">
    <div className="aurora-section-end" />
    {/* Tri-colour inspired gradient decoration */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_20%_50%,rgba(255,153,51,0.07),transparent)] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_50%,rgba(19,136,8,0.05),transparent)] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">

      {/* Header */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="label-badge mb-6 inline-flex"
          style={{ background: 'rgba(255,153,51,0.08)', borderColor: 'rgba(255,153,51,0.25)', color: '#E07000' }}
        >
          <Flag className="w-3.5 h-3.5" /> Built in Bharat, for the World
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-5xl md:text-7xl text-slate-950 mb-6"
        >
          India's AI Moment<br />
          <span className="text-gradient-amber">Has Arrived.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} viewport={{ once: true }}
          className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
        >
          India has built the world's largest BPO industry on human talent. Tevrix AI is the next chapter —
          replacing repetitive offshore labor with sovereign AI that operates in every Indian language,
          understands every Indian market, and carries Indian innovation to the world.
        </motion.p>
      </div>

      {/* 2-col layout: left copy, right stat cards */}
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }} viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-slate-950 mb-6">
            Solving India's Biggest<br />
            <span className="text-gradient-amber">Operational Challenges.</span>
          </h3>

          <div className="space-y-5">
            {[
              {
                icon: Mic,
                color: 'bg-amber-500/10 border-amber-200',
                iconColor: 'text-amber-600',
                title: 'Bharat Multilingual — 22 Languages, One AI',
                desc: 'From Hindi and Bengali to Tamil, Telugu, Kannada, and beyond — Tevrix AI speaks the language of every Indian customer natively, not through translation. For the first time, enterprises can serve every district of Bharat without a local agent team.'
              },
              {
                icon: Users,
                color: 'bg-violet-500/10 border-violet-200',
                iconColor: 'text-violet-600',
                title: 'A $38B Industry, Ready for Disruption',
                desc: 'India\'s BPO sector employs over 5 million people — many in repetitive, low-value tasks. Tevrix AI doesn\'t replace the workforce; it liberates it. Humans move up the value chain. AI takes the repetition. India wins.'
              },
              {
                icon: BarChart3,
                color: 'bg-emerald-500/10 border-emerald-200',
                iconColor: 'text-emerald-600',
                title: 'Digital Bharat at 10× Speed',
                desc: 'Government initiatives like Digital India and BharatNet are bringing 900M+ Indians online. Tevrix AI is the intelligence layer that makes this connectivity economically powerful — automating the services those citizens need at scale.'
              },
              {
                icon: Globe,
                color: 'bg-blue-500/10 border-blue-200',
                iconColor: 'text-blue-600',
                title: 'Exporting Indian AI to the World',
                desc: 'Built in India with Indian engineering talent, trained on Indian data, designed for Indian complexity — and then scaled globally. Tevrix AI is India\'s contribution to the global AI economy, not just a consumer of it.'
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-[15px] mb-1.5">{item.title}</h4>
                  <p className="text-slate-500 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1 }} viewport={{ once: true }}
          className="sticky top-24"
        >
          <TiltDiv className="card-3d p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex flex-col">
                <div className="flex-1 bg-[#FF9933]" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-[#138808]" />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">India Market Snapshot</div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'India BPO Market Size (2024)',           value: '$38B',   color: 'text-amber-500',   sub: 'Growing at 14% CAGR' },
                { label: 'BPO Workforce in India',                  value: '5M+',    color: 'text-violet-500',  sub: 'Ready for upskilling' },
                { label: 'Indian Languages Supported',               value: '22',     color: 'text-emerald-500', sub: 'All scheduled languages' },
                { label: 'Internet Users in Bharat',                 value: '900M+',  color: 'text-blue-500',    sub: 'Growing 30% YoY' },
                { label: 'Cost Advantage vs. Western BPO',           value: '70%',    color: 'text-amber-500',   sub: 'AI amplifies this gap' },
                { label: 'Global AI Market India Can Capture',        value: '$200B',  color: 'text-violet-500',  sub: 'By 2030 est.' },
              ].map(r => (
                <div key={r.label} className="py-3 border-b border-black/[0.05] last:border-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-500 text-[13px] font-medium">{r.label}</span>
                    <span className={`text-xl font-bold tracking-tight ${r.color}`}>{r.value}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{r.sub}</div>
                </div>
              ))}
            </div>
          </TiltDiv>
        </motion.div>
      </div>

      {/* Vision statement bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} viewport={{ once: true }}
        className="card-3d card-bpo p-10 text-center"
      >
        <div className="text-4xl mb-4">🇮🇳</div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 tracking-tight">
          "If India made the world call — Tevrix AI makes the world's AI."
        </h3>
        <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
          India gave the world its outsourcing backbone. Now we're building the intelligence layer
          that sits above it — home-grown, multilingual, and scaled for the needs of 1.4 billion people
          and the enterprises that serve them.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ============================================================
   MANIFESTO
   ============================================================ */
const Manifesto = ({ onDemo }) => (
  <section id="enterprise" className="relative py-20 md:py-32 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
        >
          <span className="label-badge mb-8 inline-flex"><Activity className="w-3.5 h-3.5" /> Manifesto</span>
          <h2 className="text-5xl md:text-6xl text-slate-950 mb-8">
            Erase Operational<br /><span className="text-gradient-amber">Friction.</span>
          </h2>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed">
            The Autonomous Era is here. We're shifting the global enterprise from human labor to
            synthetic orchestration at planetary scale — starting from India.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-black/[0.06]">
            <div className="stat-card">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">System Status</div>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <span className="glow-dot" /> Operational
              </div>
            </div>
            <div className="stat-card">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Protocol Latency</div>
              <div className="text-slate-900 font-semibold font-mono">&lt; 0.001 MS</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="card-3d p-10 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8">
            <Lock className="text-amber-600 w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Secure Your Node</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Early access slots are limited. Integrate Tevrix protocols into your enterprise before your competitors do.
          </p>
          <button onClick={onDemo} className="btn-primary w-full justify-center py-4 text-[14px]">
            Request Early Access <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ============================================================
   CONTACT (inline form, not modal)
   ============================================================ */
const Contact = () => {
  const [status, setStatus] = useState('');
  const handle = async (e) => {
    e.preventDefault(); setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/mwvrvovb', {
        method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' },
      });
      setStatus(r.ok ? 'ok' : 'err');
      if (r.ok) e.target.reset();
    } catch { setStatus('err'); }
  };
  const inp = "w-full bg-white/60 border border-black/[0.08] rounded-xl px-4 py-3.5 text-slate-900 text-[14px] placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] transition-all duration-200";
  return (
    <section id="contact" className="relative py-24 px-6 aurora-contact overflow-hidden">
      <div className="gradient-divider mb-16" />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="label-badge mb-5 inline-flex"><Mail className="w-3.5 h-3.5" /> Get In Touch</span>
          <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">Sync with Tevrix.</h2>
          <p className="text-slate-500">Tell us your enterprise requirements.</p>
        </div>
        <div className="card-3d p-8 md:p-10">
          {status === 'ok' ? (
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-amber-500 w-7 h-7 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received.</h3>
              <p className="text-slate-500">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handle} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input required name="name" placeholder="Your Name" className={inp} />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Work Email</label>
                  <input required name="email" type="email" placeholder="name@company.com" className={inp} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Area of Interest</label>
                <select required name="service" className={inp}>
                  <option value="" disabled>Select department...</option>
                  {['AI BPO (Full Deployment)', 'AI Customer Care', 'AI HR Automation', 'Financial Intelligence', 'Custom Enterprise'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Requirements</label>
                <textarea name="message" rows={4} placeholder="Tell us about your business processes to automate..." className={inp + ' resize-none'} />
              </div>
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-4 text-[14px]">
                {status === 'sending' ? 'Sending...' : 'Send Message'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER — with founder emails
   ============================================================ */
const Footer = ({ onDemo }) => (
  <footer className="relative pt-16 pb-10 px-6 aurora-footer">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-16 mb-12">

        {/* Brand + tagline */}
        <div className="lg:col-span-1">
          <p className="text-slate-500 leading-relaxed max-w-xs mb-6 text-[14px]">
            India's AI-native BPO platform. Built in Bharat, engineered for the world.
          </p>
          <div className="flex gap-4 mb-8">
            <a href="https://x.com/TevrixAi" target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-slate-400 hover:text-amber-500 transition-colors duration-200 uppercase tracking-widest">Twitter</a>
            <a href="https://www.linkedin.com/company/tevrixai/" target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-slate-400 hover:text-amber-500 transition-colors duration-200 uppercase tracking-widest">LinkedIn</a>
          </div>

          {/* Founders */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Team</div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700 flex-shrink-0">PS</div>
              <div>
                <div className="text-[12px] font-semibold text-slate-700">Panshul Sharma — Founder & CEO</div>
                <div className="flex items-center gap-2">
                  <a href="mailto:panshul@tevrixai.com" className="text-[12px] text-amber-600 hover:text-amber-700 transition-colors">panshul@tevrixai.com</a>
                  <span className="text-slate-300">·</span>
                  <a href="https://www.linkedin.com/in/panshulsharma777/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-400 hover:text-amber-600 transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-[10px] font-bold text-violet-700 flex-shrink-0">MS</div>
              <div>
                <div className="text-[12px] font-semibold text-slate-700">Vempalli Madhu Sai — Co-Founder & CTO</div>
                <div className="flex items-center gap-2">
                  <a href="mailto:madhu@tevrixai.com" className="text-[12px] text-violet-600 hover:text-violet-700 transition-colors">madhu@tevrixai.com</a>
                  <span className="text-slate-300">·</span>
                  <a href="https://www.linkedin.com/in/madhu-sai-vempalli-72205a3b9/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-400 hover:text-violet-600 transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <div className="lg:col-span-2 flex flex-col sm:flex-row sm:flex-wrap md:grid md:grid-cols-3 gap-12 lg:gap-8">
          {[
            {
              title: 'Platform',
              links: [
                { label: 'AI BPO', href: '/ai-bpo' },
                { label: 'Customer Care', href: '/service/customer-care' },
                { label: 'HR Automation', href: '/service/hr-automation' },
                { label: 'Financial AI', href: '/service/financial-analyst' },
              ]
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '/about' },
                { label: 'Our Vision', href: '#india' },
                { label: 'Book a Demo', href: '#', onClick: onDemo },
                { label: 'Contact Us', href: '#contact' },
              ]
            },
            {
              title: 'Reach Us',
              links: [
                { label: 'panshul@tevrixai.com', href: 'mailto:panshul@tevrixai.com' },
                { label: 'madhu@tevrixai.com', href: 'mailto:madhu@tevrixai.com' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ]
            },
          ].map(col => (
            <div key={col.title} className="min-w-[200px]">
              <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-5">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label} className="break-all">
                    {l.onClick ? (
                      <button onClick={l.onClick} className="text-[13px] text-slate-500 hover:text-amber-600 transition-colors duration-200 text-left">{l.label}</button>
                    ) : l.href.startsWith('/') ? (
                      <Link to={l.href} className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors duration-200">{l.label}</Link>
                    ) : (
                      <a href={l.href} className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors duration-200">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="gradient-divider mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} TEVRIX AI PVT LTD · BUILT WITH ❤️ IN INDIA
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="glow-dot" />
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">All Systems Operational</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">🇮🇳 Made in India</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ============================================================
   HOME PAGE ROOT
   ============================================================ */
export default function Home({ onDemo }) {
  return (
    <main>
      <Hero onDemo={onDemo} />
      <StatsTicker />
      <WhatWeAreBuilding />
      <AIBPOTeaser />
      <ServicesSection />
      <SectorsSection />
      <IndiaSection />
      <Manifesto onDemo={onDemo} />
      <Contact />
      <Footer onDemo={onDemo} />
    </main>
  );
}
