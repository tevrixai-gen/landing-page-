import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Zap, ChevronRight, Globe } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../data';

/* ── Process Flow Visualization ── */
const ProcessFlow = ({ steps }) => (
  <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-0">
    {/* Mobile vertical connecting line */}
    <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-amber-400/60 to-violet-400/60 md:hidden" />

    {steps.map((step, i) => (
      <React.Fragment key={step}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          viewport={{ once: true }}
          className="flex flex-row md:flex-col items-center md:text-center gap-5 md:gap-3 z-10"
        >
          {/* Number Circle */}
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-[13px] shadow-[0_8px_24px_rgba(245,158,11,0.3)] flex-shrink-0">
            {String(i + 1).padStart(2, '0')}
          </div>
          {/* Label */}
          <div className="text-[14px] md:text-[13px] font-semibold text-slate-800 leading-tight md:w-32">{step}</div>
        </motion.div>

        {/* Desktop horizontal arrow/line */}
        {i < steps.length - 1 && (
          <div className="hidden md:flex items-center flex-1 min-w-[32px]">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-300 to-violet-300 opacity-60" />
            <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ── SERVICE PAGE ── */
export default function ServicePage({ onDemo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const svc = SERVICES.find(s => s.id === id);

  if (!svc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Module Not Found</h1>
          <Link to="/" className="btn-primary inline-flex">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = LucideIcons[svc.icon] || LucideIcons.Zap;
  const isViolet = svc.color === 'violet';
  const accentColor = isViolet ? '#7C3AED' : '#F59E0B';
  const accentClass = isViolet ? 'text-violet-600' : 'text-amber-600';
  const accentBg    = isViolet ? 'bg-violet-500/10 border-violet-500/20' : 'bg-amber-500/10 border-amber-500/20';

  // Other services for cross-links
  const otherServices = SERVICES.filter(s => s.id !== id).slice(0, 3);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-[68vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        <div className="warm-mesh-bg" />
        <div className="mesh-blob blob-amber" />
        <div className="mesh-blob blob-violet" />
        <div className="dot-grid" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className={`label-badge ${isViolet ? 'label-badge-violet' : ''}`}>
              {svc.tag} Module
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
            className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10 border shadow-2xl ${accentBg}`}
            style={{ boxShadow: `0 20px 60px ${accentColor}30` }}
          >
            <Icon className="w-9 h-9" style={{ color: accentColor }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tighter text-slate-950 mb-8"
          >
            {svc.hero}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {svc.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button onClick={onDemo} className="btn-primary text-[14px]">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary text-[14px]"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </motion.div>
        </div>
        <div className="aurora-hero-bottom" />
      </section>

      {/* ── HEADLINE STATS ── */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-divider mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[svc.stat1, svc.stat2,
              { n: '24/7', l: 'Always Available' },
              { n: '120+', l: 'Languages Supported' }
            ].map(s => (
              <div key={s.l} className="stat-card text-center">
                <div className="text-3xl font-bold text-slate-950 tracking-tight mb-1">{s.n}</div>
                <div className="text-[13px] text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="gradient-divider mt-12" />
        </div>
      </section>

      {/* ── PROCESS FLOW ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-badge mb-5 inline-flex"><Zap className="w-3.5 h-3.5" /> How It Works</span>
            <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">
              The {svc.title}<br /><span className="text-gradient-amber">Pipeline.</span>
            </h2>
          </div>
          <div className="card-3d p-8 md:p-12">
            <ProcessFlow steps={svc.flow} />
          </div>
        </div>
      </section>

      {/* ── WHY TEVRIX ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="label-badge mb-5 inline-flex">Why Choose Tevrix</span>
            <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">
              Why <span className="text-gradient-amber">{svc.title}?</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Built for enterprise scalability. Deployed in weeks. ROI from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {svc.why.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="card-3d p-7"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${accentBg}`}>
                  <CheckCircle className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2">{w.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-badge mb-5 inline-flex"><Globe className="w-3.5 h-3.5" /> Sectors</span>
            <h2 className="text-4xl text-slate-950 mb-4">Who Uses {svc.title}?</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {svc.sectors.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-full border border-black/[0.08] bg-white/70 text-slate-700 font-semibold text-[14px] backdrop-blur-sm hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-default"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card-3d card-bpo p-12 text-center">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8 border ${accentBg} shadow-2xl`}
              style={{ boxShadow: `0 20px 60px ${accentColor}25` }}
            >
              <Icon className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <h2 className="text-4xl font-bold text-slate-950 mb-4">Ready to Deploy?</h2>
            <p className="text-xl text-slate-500 mb-10 max-w-lg mx-auto">
              Get a personalized demo of {svc.title} built around your specific workflows and data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onDemo} className="btn-primary text-[15px] py-4 px-10">
                Request Deployment Demo <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/ai-bpo" className="btn-secondary text-[15px] py-4 px-10">
                Learn About AI BPO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER MODULES ── */}
      <section className="py-20 px-6 border-t border-black/[0.05]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center">Explore Other Modules</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {otherServices.map((s, i) => {
              const OtherIcon = LucideIcons[s.icon] || LucideIcons.Zap;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/service/${s.id}`)}
                  className="card-3d p-6 cursor-pointer"
                >
                  <div className={`icon-shell ${s.color === 'violet' ? 'icon-violet' : 'icon-amber'} mb-5`}>
                    <OtherIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-slate-500 text-[13px] mb-4">{s.short}</p>
                  <div className={`flex items-center gap-1 text-[13px] font-semibold ${s.color === 'violet' ? 'text-violet-600' : 'text-amber-600'}`}>
                    Explore <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
