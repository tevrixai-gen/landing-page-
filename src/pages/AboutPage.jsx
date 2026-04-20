import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Flag, Zap, Target, Users } from 'lucide-react';

const TEAM = [
  {
    name: 'Panshul Sharma',
    role: 'Founder & CEO',
    init: 'PS',
    color: 'bg-amber-100 text-amber-700',
    linkedin: 'https://www.linkedin.com/in/panshulsharma777/',
    bio: "Conceived Tevrix AI after identifying that India's $38B BPO industry was ready for an AI-native disruption. Building the platform that replaces repetitive outsourced work with intelligent agents that operate 24/7 across 120+ languages.",
  },
  {
    name: 'Vempalli Madhu Sai',
    role: 'Co-Founder & COO',
    init: 'MS',
    color: 'bg-violet-100 text-violet-700',
    linkedin: 'https://www.linkedin.com/in/madhu-sai-vempalli-72205a3b9/',
    bio: "Joined as Co-Founder in January 2026 to lead operations and product strategy. Focused on building the systems, processes, and partnerships that will scale Tevrix AI from MVP to global enterprise deployments.",
  },
];

const TIMELINE = [
  {
    date: 'October 2025',
    title: 'The Idea',
    desc: "Panshul identifies the opportunity — India's massive BPO workforce is doing work that AI can do better, faster, and cheaper. The concept of an AI-native BPO platform takes shape.",
    color: 'amber',
  },
  {
    date: 'January 2026',
    title: 'Team Forms',
    desc: "Madhu Sai joins as Co-Founder. The founding team commits full-time to building Tevrix AI — India's first AI-native BPO platform.",
    color: 'violet',
  },
  {
    date: 'April 2026',
    title: 'Building MVP',
    desc: 'Actively developing the core AI modules — Customer Care, HR Automation, and Financial Intelligence. Accepting early access enterprise partners to shape the product.',
    color: 'amber',
  },
  {
    date: 'Coming Soon',
    title: 'First Deployments',
    desc: "Our first enterprise pilots. We're currently speaking with businesses who want to be first movers in AI-native BPO — reach out to join.",
    color: 'violet',
  },
];

export default function AboutPage({ onDemo }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        <div className="warm-mesh-bg" />
        <div className="mesh-blob blob-amber" />
        <div className="mesh-blob blob-violet" />
        <div className="dot-grid" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="label-badge mb-8 inline-flex"
          >
            <Users className="w-3.5 h-3.5" /> About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tighter text-slate-950 mb-8"
          >
            Built by Builders.<br />
            <span className="text-gradient-amber">For Enterprises.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Tevrix AI is a two-person founding team based in India, building the platform that replaces
            repetitive business processes with intelligent AI agents — starting with India's $38B BPO market.
          </motion.p>
        </div>
        <div className="aurora-hero-bottom" />
      </section>

      {/* Stage Banner */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-3d card-bpo p-6 text-center">
            <div className="flex items-center justify-center gap-4 flex-wrap text-[14px]">
              <span className="flex items-center gap-2 text-amber-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Currently Building MVP
              </span>
              <span className="text-slate-300 hidden sm:block">·</span>
              <span className="text-slate-600 font-medium">Founded January 2026</span>
              <span className="text-slate-300 hidden sm:block">·</span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Flag className="w-3.5 h-3.5" /> Built in India
              </span>
              <span className="text-slate-300 hidden sm:block">·</span>
              <button
                onClick={onDemo}
                className="text-amber-600 font-semibold hover:text-amber-700 transition-colors inline-flex items-center gap-1"
              >
                Apply for Early Access <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-badge mb-5 inline-flex"><Users className="w-3.5 h-3.5" /> Founding Team</span>
            <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">The People Building It.</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Two founders. One mission — replace repetitive human labor in BPO with AI that works
              better, faster, and at a fraction of the cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TEAM.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-3d p-8"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 ${person.color}`}>
                  {person.init}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-[13px] font-bold uppercase tracking-widest mb-4 text-amber-600">{person.role}</p>
                <p className="text-slate-500 text-[14px] leading-relaxed mb-6">{person.bio}</p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-amber-600 transition-colors border border-black/[0.08] rounded-lg px-4 py-2 hover:border-amber-300 hover:bg-amber-50 duration-200"
                >
                  <Linkedin className="w-4 h-4" /> View LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="label-badge mb-5 inline-flex"><Target className="w-3.5 h-3.5" /> Our Journey</span>
            <h2 className="text-4xl md:text-5xl text-slate-950 mb-4">How We Got Here.</h2>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-amber-300 to-violet-300 opacity-40" />
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start pl-16 relative"
              >
                <div
                  className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shadow-lg flex-shrink-0 text-center leading-tight"
                  style={{ background: item.color === 'amber' ? '#F59E0B' : '#7C3AED' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="card-3d p-5 flex-1">
                  <div
                    className="text-[11px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: item.color === 'amber' ? '#D97706' : '#7C3AED' }}
                  >
                    {item.date}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card-3d card-bpo p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8">
              <Zap className="text-amber-600 w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">
              We're at the beginning.<br />
              <span className="text-gradient-amber">We want you with us.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              We're actively seeking early access enterprises who want to be the first to deploy
              AI-native BPO — and help shape what it looks like. If that's you, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onDemo} className="btn-primary text-[15px] py-4 px-10">
                Apply for Early Access <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:panshul@tevrixai.com"
                className="btn-secondary text-[15px] py-4 px-10"
              >
                Email the Founders
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
