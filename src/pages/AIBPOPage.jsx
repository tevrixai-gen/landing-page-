import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Cpu, Globe, CheckCircle, Sparkles,
  Zap, TrendingUp, Activity
} from 'lucide-react';
import { SERVICES, SECTORS } from '../data';
import { ServiceCards, SectorCards } from '../Cards';

/* ============================================================
   AI BPO PAGE
   — Deep-dive on AI BPO: what it is, CX focus,
     Finite State Machine visualization, sectors
   ============================================================ */

/* ── FSM Visualization ── */
const FSMViz = () => {
  const NODES = [
    { id: 'trigger',   label: 'Customer\nTrigger',   x: 50,  y: 10,  color: '#F59E0B' },
    { id: 'intake',    label: 'AI Intake\n& NLP',     x: 20,  y: 35,  color: '#8B5CF6' },
    { id: 'intent',    label: 'Intent\nClassifier',  x: 80,  y: 35,  color: '#8B5CF6' },
    { id: 'routing',   label: 'Smart\nRouting',       x: 50,  y: 55,  color: '#F59E0B' },
    { id: 'resolve',   label: 'Resolution\nEngine',   x: 20,  y: 75,  color: '#10B981' },
    { id: 'escalate',  label: 'Escalation\nHub',      x: 80,  y: 75,  color: '#EF4444' },
    { id: 'log',       label: 'CRM\nSync & Log',      x: 50,  y: 93,  color: '#3B82F6' },
  ];

  const EDGES = [
    ['trigger','intake'],['trigger','intent'],
    ['intake','routing'],['intent','routing'],
    ['routing','resolve'],['routing','escalate'],
    ['resolve','log'],['escalate','log'],
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: '1/1.1' }}>
      <svg
        viewBox="0 0 100 110"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Edges */}
        {EDGES.map(([from, to], i) => {
          const a = NODES.find(n => n.id === from);
          const b = NODES.find(n => n.id === to);
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y + 3}
              x2={b.x} y2={b.y - 3}
              stroke="url(#edgeGrad)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: i * 0.15, duration: 1 }}
            />
          );
        })}

        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.12, type: 'spring', stiffness: 300 }}
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
          className="absolute"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ delay: i * 0.3, duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-[10px] font-bold text-white text-center leading-tight shadow-lg cursor-default"
              style={{ background: n.color, boxShadow: `0 8px 24px ${n.color}40` }}
            >
              {n.label.split('\n').map((line, j) => <div key={j}>{line}</div>)}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── CX Journey ── */
const CXJourney = () => {
  const STEPS = [
    { n: '01', title: 'Customer Initiates',   desc: 'Via voice, chat, email or social — the AI detects intent in under 200ms.', color: 'amber' },
    { n: '02', title: 'Context is Retrieved',  desc: 'Full customer history, account details, and previous interactions loaded instantly.', color: 'violet' },
    { n: '03', title: 'Personalized Response', desc: 'AI generates a contextually accurate, empathetic response — not a script.', color: 'amber' },
    { n: '04', title: 'Resolution or Route',   desc: 'Query resolved on first contact, or intelligently escalated with full brief.', color: 'violet' },
    { n: '05', title: 'CRM Sync & Sentiment',  desc: 'Every interaction logged, sentiment scored, and action items created automatically.', color: 'amber' },
  ];
  return (
    <div className="max-w-2xl mx-auto space-y-4 relative">
      <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-amber-300 via-violet-300 to-amber-300 opacity-40" />
      {STEPS.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex gap-5 items-start pl-14 relative"
        >
          <div
            className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-[13px] font-bold shadow-lg"
            style={{ background: s.color === 'amber' ? '#F59E0B' : '#7C3AED' }}
          >
            {s.n}
          </div>
          <div className="card-3d p-5 flex-1">
            <h4 className="font-bold text-slate-900 mb-1">{s.title}</h4>
            <p className="text-slate-500 text-[14px]">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── HERO ── */
const Hero = ({ onDemo }) => (
  <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
    <div className="warm-mesh-bg" />
    <div className="mesh-blob blob-amber" />
    <div className="mesh-blob blob-violet" />
    <div className="dot-grid" />
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="label-badge mb-8 inline-flex"
      >
        <Sparkles className="w-3.5 h-3.5 fill-current opacity-70" />
        The Future of Business Operations
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-slate-950 mb-8"
      >
        AI-Powered BPO.<br />
        <span className="text-gradient-amber">Infinite Scale.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Tevrix AI replaces traditional outsourcing with AI agents that handle customer experience,
        HR, finance, and every repeatable business process — at a fraction of the cost, at 140× the speed.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a href="#cx" className="btn-primary text-[14px]">
          See CX Architecture <ArrowRight className="w-4 h-4" />
        </a>
        <button onClick={onDemo} className="btn-secondary text-[14px]">Book a Demo</button>
        <Link to="/" className="btn-secondary text-[14px]">← Back to Home</Link>
      </motion.div>
    </div>
    <div className="aurora-hero-bottom" />
  </section>
);

/* ── What is AI BPO ── */
const WhatIsBPO = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }} viewport={{ once: true }}
        >
          <span className="label-badge mb-6 inline-flex"><TrendingUp className="w-3.5 h-3.5" /> What is AI BPO</span>
          <h2 className="text-4xl md:text-5xl text-slate-950 mb-6">
            Business Processes,<br /><span className="text-gradient-amber">Fully Automated.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-6">
            Business Process Outsourcing (BPO) is a $280 billion industry that moves repetitive
            business operations — customer service, HR, finance, data entry — to offshore human teams.
          </p>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Tevrix AI replaces those human teams with AI agents. Not chatbots — intelligent, autonomous
            systems that handle edge cases, adapt over time, and integrate directly into your existing stack.
          </p>
          <div className="space-y-3">
            {[
              '73% of BPO tasks are fully automatable with current AI',
              '85% cost reduction vs. traditional offshore operations',
              '140× throughput — AI processes in milliseconds, not minutes',
              'Zero training time — deployed in weeks, not months',
            ].map(p => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-[15px]">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="card-3d card-bpo p-10"
        >
          <div className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-8">Market Disruption</div>
          {[
            { label: 'Global BPO Market',         value: '$280B', color: 'text-amber-500' },
            { label: 'AI Addressable Share',       value: '73%',   color: 'text-violet-500' },
            { label: 'Cost vs. Offshore',          value: '-85%',  color: 'text-emerald-500' },
            { label: 'Speed Multiplier',            value: '140×',  color: 'text-amber-500' },
            { label: 'First-Contact Resolution',   value: '90%',   color: 'text-violet-500' },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-center py-3 border-b border-black/[0.05] last:border-0">
              <span className="text-slate-500 text-[14px]">{r.label}</span>
              <span className={`text-2xl font-bold ${r.color}`}>{r.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── CX Section ── */
const CXSection = () => (
  <section id="cx" className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <span className="label-badge mb-5 inline-flex"><Activity className="w-3.5 h-3.5" /> Customer Experience</span>
        <h2 className="text-4xl md:text-6xl text-slate-950 mb-5">
          CX That Scales<br /><span className="text-gradient-amber">Without Limits.</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Traditional CX scales linearly — more customers means more agents. Tevrix AI breaks that constraint.
          Every customer gets instant, personalized, empathetic service regardless of volume.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* CX Journey */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center">The CX Interaction Journey</h3>
          <CXJourney />
        </div>

        {/* CX Stats + Pillars */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why AI CX Outperforms Humans</h3>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { n: '< 1s',  l: 'Response Time',         sub: 'vs. 6 min avg human' },
              { n: '90%',   l: 'First-Contact Rate',    sub: 'vs. 60% industry avg' },
              { n: '24/7',  l: 'Always Available',       sub: 'No holidays, no shifts' },
              { n: '120+',  l: 'Languages',              sub: 'Native, not translated' },
            ].map(s => (
              <div key={s.n} className="stat-card text-center">
                <div className="text-3xl font-bold text-slate-950 tracking-tight mb-1">{s.n}</div>
                <div className="text-[13px] text-slate-500 font-semibold mb-1">{s.l}</div>
                <div className="text-[11px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              { title: 'Emotional Intelligence',    desc: 'AI detects sentiment in real time, adjusting tone and approach for frustrated or confused customers.' },
              { title: 'Proactive Outreach',        desc: 'Doesn\'t wait for problems — reaches out when anomalies detected in customer behavior or account.' },
              { title: 'Hyper-Personalization',     desc: 'Every interaction informed by full customer history, preferences, and journey context.' },
            ].map(p => (
              <div key={p.title} className="card-3d p-5">
                <h4 className="font-bold text-slate-900 mb-1 text-[15px]">{p.title}</h4>
                <p className="text-slate-500 text-[14px]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── FSM Section ── */
const FSMSection = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="label-badge mb-5 inline-flex"><Cpu className="w-3.5 h-3.5" /> Architecture</span>
        <h2 className="text-4xl md:text-5xl text-slate-950 mb-5">
          Finite State Machine<br /><span className="text-gradient-amber">Architecture.</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Every AI agent is architected as a deterministic finite state machine — guaranteeing
          predictable, explainable, and auditable behavior at every decision point.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* FSM visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="card-3d p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Live State Graph — Customer Care Agent</span>
          </div>
          <FSMViz />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Finite State Machines?</h3>
          <div className="space-y-5">
            {[
              { title: 'Deterministic',       desc: 'Every state transition is explicit — no hallucinations, no unexpected behavior in production.' },
              { title: 'Explainable',         desc: 'Full audit log of every decision: why the AI said what it said, in what state, with what context.' },
              { title: 'Composable',          desc: 'FSMs can be nested and chained — simple agents for simple tasks, complex orchestrations for edge cases.' },
              { title: 'Compliant',           desc: 'Regulatory compliance (GDPR, HIPAA) is enforced at the state level — never an afterthought.' },
              { title: 'Continuously Learning', desc: 'State transition probabilities update with each interaction — the machine gets smarter over time.' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="text-amber-600 w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-[15px] mb-1">{p.title}</h4>
                  <p className="text-slate-500 text-[14px]">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Services on BPO Page ── */
const ServicesOnBPO = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="label-badge mb-5 inline-flex"><Globe className="w-3.5 h-3.5" /> AI Modules</span>
        <h2 className="text-4xl md:text-5xl text-slate-950 mb-5">
          Six Modules.<br /><span className="text-gradient-amber">One Platform.</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">
          Each module is a dedicated AI agent. Click to explore detailed ROI, technology, and deployment info.
        </p>
      </div>
      <ServiceCards />
    </div>
  </section>
);

/* ── Sectors ── */
const SectorsOnBPO = () => (
  <section className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="label-badge mb-5 inline-flex"><Globe className="w-3.5 h-3.5" /> Industries</span>
        <h2 className="text-4xl text-slate-950 mb-4">Every Sector. One AI.</h2>
      </div>
      <SectorCards />
    </div>
  </section>
);

/* ── AI BPO PAGE ROOT ── */
export default function AIBPOPage({ onDemo }) {
  return (
    <main>
      <Hero onDemo={onDemo} />
      <WhatIsBPO />
      <CXSection />
      <FSMSection />
      <ServicesOnBPO />
      <SectorsOnBPO />
    </main>
  );
}
