import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  ChevronRight, Headphones, Users, BarChart3,
  FileText, Phone, Layers, ArrowUpRight
} from 'lucide-react';
import { SERVICES, SECTORS } from './data';

const ICON_MAP = { Headphones, Users, BarChart3, FileText, Phone, Layers };

/* ──────────────────────────────────────────────────────────────
   8 unique amber-violet mesh gradient variants.
   Every card shares the same brand palette but has a
   different radial-gradient geometry — subtle variation,
   unified language. No static pastels. No "template" feel.
   ────────────────────────────────────────────────────────────── */
const MESH = [
  // 0 — amber top-left, violet bottom-right
  `radial-gradient(ellipse 80% 70% at 10% 10%, rgba(245,158,11,0.10) 0%, transparent 60%),
   radial-gradient(ellipse 70% 70% at 90% 90%, rgba(124,58,237,0.08) 0%, transparent 60%)`,

  // 1 — violet top-right, amber bottom-left
  `radial-gradient(ellipse 80% 70% at 90% 10%, rgba(124,58,237,0.10) 0%, transparent 60%),
   radial-gradient(ellipse 70% 70% at 10% 90%, rgba(245,158,11,0.08) 0%, transparent 60%)`,

  // 2 — amber top, violet bottom
  `radial-gradient(ellipse 100% 55% at 50% 0%, rgba(245,158,11,0.11) 0%, transparent 65%),
   radial-gradient(ellipse 90% 50% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 65%)`,

  // 3 — violet top, amber bottom
  `radial-gradient(ellipse 100% 55% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 65%),
   radial-gradient(ellipse 90% 50% at 50% 100%, rgba(245,158,11,0.09) 0%, transparent 65%)`,

  // 4 — amber right, violet left
  `radial-gradient(ellipse 55% 100% at 100% 50%, rgba(245,158,11,0.11) 0%, transparent 65%),
   radial-gradient(ellipse 50% 90% at 0% 50%, rgba(124,58,237,0.08) 0%, transparent 65%)`,

  // 5 — amber left, violet right
  `radial-gradient(ellipse 55% 100% at 0% 50%, rgba(245,158,11,0.09) 0%, transparent 65%),
   radial-gradient(ellipse 50% 90% at 100% 50%, rgba(124,58,237,0.10) 0%, transparent 65%)`,

  // 6 — amber bottom-left diagonal
  `radial-gradient(ellipse 70% 65% at 15% 85%, rgba(245,158,11,0.12) 0%, transparent 60%),
   radial-gradient(ellipse 60% 60% at 85% 15%, rgba(124,58,237,0.08) 0%, transparent 60%)`,

  // 7 — violet bottom-right diagonal
  `radial-gradient(ellipse 70% 65% at 85% 85%, rgba(124,58,237,0.11) 0%, transparent 60%),
   radial-gradient(ellipse 60% 60% at 15% 15%, rgba(245,158,11,0.09) 0%, transparent 60%)`,
];

/* The key stat for each sector. Alternates amber/violet gradient text. */
const SECTOR_STATS = [
  { stat: '4.2B',   label: 'Transactions / yr',      tag: '#1 AI Use Case',    tagClass: 'sector-tag-amber' },
  { stat: '₹730B',  label: 'India Health Market',    tag: 'High Compliance',   tagClass: 'sector-tag-violet' },
  { stat: '900M+',  label: 'Bank Accounts (India)',  tag: 'RBI Compliant',     tagClass: 'sector-tag-amber' },
  { stat: '1.2B',   label: 'Subscribers (India)',    tag: 'Multilingual',      tagClass: 'sector-tag-violet' },
  { stat: '14%',    label: 'India CAGR',             tag: 'Claims AI',         tagClass: 'sector-tag-amber' },
  { stat: '22B+',   label: 'Parcels Tracked / yr',   tag: 'Supply Chain',      tagClass: 'sector-tag-violet' },
  { stat: '₹33T',   label: 'India PropTech Size',    tag: 'Lead Nurturing',    tagClass: 'sector-tag-amber' },
  { stat: '250M',   label: 'Students in India',      tag: 'EdTech AI',         tagClass: 'sector-tag-violet' },
];

/* ── 3D Tilt wrapper for service cards ── */
const TiltCard = ({ children, className = '', delay = 0, glowVariant = 'amber' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`card-3d ${glowVariant === 'violet' ? 'card-3d-violet' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SERVICE CARDS — 3D tilt, amber/violet icon shells
   ══════════════════════════════════════════════════════════════ */
export function ServiceCards() {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {SERVICES.map((svc, i) => {
        const Icon = ICON_MAP[svc.icon];
        return (
          <TiltCard key={svc.id} delay={i * 0.08} glowVariant={svc.tagVariant}>
            <div className="flex justify-between items-start mb-8">
              <div className={`icon-shell ${svc.color === 'violet' ? 'icon-violet' : 'icon-amber'}`}>
                {Icon && <Icon className="w-5 h-5" />}
              </div>
              <span className={`label-badge text-[10px] py-1 px-3 ${svc.tagVariant === 'violet' ? 'label-badge-violet' : ''}`}>
                {svc.tag}
              </span>
            </div>

            <h3 className="text-[18px] font-bold text-slate-900 mb-3 tracking-tight">{svc.title}</h3>
            <p className="text-slate-500 leading-relaxed text-[14px] mb-6">{svc.short}</p>

            <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between">
              <div>
                <div className={`text-xl font-bold tracking-tight ${svc.color === 'violet' ? 'stat-gradient-violet' : 'stat-gradient-amber'}`}>
                  {svc.stat1.n}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">{svc.stat1.l}</div>
              </div>
              <button
                onClick={() => navigate(`/service/${svc.id}`)}
                className={`flex items-center gap-1.5 text-[13px] font-semibold group transition-colors ${
                  svc.color === 'violet' ? 'text-violet-600 hover:text-violet-700' : 'text-amber-600 hover:text-amber-700'
                }`}
              >
                Explore
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTOR CARDS — unified amber-violet mesh gradient
   ══════════════════════════════════════════════════════════════ */
export function SectorCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {SECTORS.map((s, i) => {
        const meta    = SECTOR_STATS[i] || {};
        const isAmber = i % 2 === 0;

        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="sector-mesh-card p-5"
          >
            {/* Mesh gradient overlay — unique per card */}
            <div
              className="mesh-layer"
              style={{ backgroundImage: MESH[i % 8] }}
            />

            {/* Content — sits above the mesh */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Tag */}
              {meta.tag && (
                <span className={`sector-tag mb-3 self-start ${meta.tagClass || 'sector-tag-amber'}`}>
                  {meta.tag}
                </span>
              )}

              {/* Icon */}
              <div className="sector-icon-shell mb-4">{s.icon}</div>

              {/* Name + description */}
              <h4 className="font-bold text-slate-900 text-[15px] mb-1.5 leading-tight">{s.name}</h4>
              <p className="text-slate-500 text-[12px] leading-relaxed flex-1">{s.desc}</p>

              {/* Stat */}
              {meta.stat && (
                <div className="pt-3 mt-3 border-t border-black/[0.05]">
                  <div className={`text-[20px] font-bold leading-none mb-0.5 ${isAmber ? 'stat-gradient-amber' : 'stat-gradient-violet'}`}>
                    {meta.stat}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                    {meta.label}
                  </div>
                </div>
              )}
            </div>

            {/* Hover arrow */}
            <div
              className="sector-arrow absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(245,158,11,0.08)' }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
