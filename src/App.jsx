import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  LayoutGrid,
  UserCircle,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  Home,
  Bot,
  User,
  Box,
  Database,
  Terminal,
  Globe,
  Layers,
  Search,
  Key,
  Menu,
  X,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 lg:px-12 transition-all duration-700 ${scrolled ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 group cursor-pointer z-50"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.4)] group-hover:shadow-[0_0_50px_rgba(255,107,0,0.6)] transition-all duration-500">
          <LayoutGrid className="text-white w-6 h-6 md:w-7 md:h-7" />
        </div>
        <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white">TEVRIX<span className="text-primary italic">AI</span></span>
      </motion.div>

      {/* Desktop Links */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-8 lg:gap-12 text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400"
      >
        {["Infrastructure", "Protocol", "Vision"].map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-primary transition-all duration-300 relative group hidden md:block">
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <button className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-white text-slate-950 font-extrabold text-[10px] md:text-xs tracking-widest hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
          SYSTEM ON
        </button>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative flex flex-col items-center px-6 pt-40 md:pt-64 pb-20 overflow-hidden bg-midnight-liquid min-h-[80vh] md:min-h-screen">
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-20"></div>
      <div className="absolute inset-0 solar-radial opacity-40" />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [-30, 40, -30],
          y: [-20, 50, -20],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/10 blur-[120px] md:blur-[180px] rounded-full -z-10"
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: y1, opacity }}
        >
          <div className="flex justify-center mb-10 md:mb-12">
            <span className="inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-extrabold tracking-[0.4em] uppercase rounded-full border border-white/10 bg-white/5 text-primary shadow-2xl backdrop-blur-xl">
              <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(255,107,0,1)] animate-pulse" />
              Autonomy Engineered
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-display font-extrabold leading-[1.1] md:leading-[1.05] mb-10 md:mb-14 text-white tracking-[-0.05em] drop-shadow-2xl">
            Building Autonomous Systems <br className="hidden md:block" />
            <span className="text-shine">for Scale, Efficiency and Robustness</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-slate-400 max-w-5xl mx-auto mb-10 leading-[1.6] md:leading-[1.4] font-medium tracking-tight">
            The next generation of high-fidelity synthetic engineering. Multi-agentic protocols built to erase human friction.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const MarketVision = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      id="vision"
      className="relative pt-24 md:pt-40 pb-12 px-6 bg-black overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-midnight-liquid opacity-40 -z-10" />
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-extrabold uppercase tracking-[0.6em] text-[10px] md:text-[11px] mb-8 md:mb-10 block">STRATEGIC INFRASTRUCTURE</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-display font-extrabold mb-10 md:mb-12 leading-[1.1] md:leading-[1] text-white tracking-[-0.04em]">
            The Next Generation <br /><span className="text-shine">of AI BPO.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-left mb-16 md:20">
            <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-slate-custom border border-primary/10 bg-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h4 className="text-primary font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 md:6 relative z-10">MULTI-AGENTIC PROTOCOL</h4>
              <p className="text-white text-lg md:text-xl font-bold leading-relaxed relative z-10">
                Coordinated swarms of autonomous agents working in parallel to execute complex enterprise workflows with zero human friction.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-slate-custom border border-primary/10 bg-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h4 className="text-primary font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 md:6 relative z-10">UNIVERSAL LINGUISTICS</h4>
              <p className="text-white text-lg md:text-xl font-bold leading-relaxed relative z-10">
                High-fidelity multilingual processing across 100+ dialects, ensuring seamless global scaling and regional compliance.
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-slate-400 leading-[1.6] max-w-3xl mx-auto font-medium">
            We are moving beyond optimization. Tevrix AI architects a fully autonomous environment where intelligence is decentralized, multilingual, and infinitely scalable.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const EcosystemGrid = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      id="ecosystem"
      className="pt-24 md:pt-40 pb-12 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-40 gap-10 md:gap-16">
          <div className="max-w-2xl">
            <span className="text-primary font-extrabold uppercase tracking-[0.5em] text-[10px] mb-8 md:mb-12 block">V3 // UPCOMING SERVICES</span>
            <h2 className="text-5xl sm:text-6xl lg:text-[110px] font-display font-extrabold text-white leading-[1] md:leading-[0.85] tracking-[-0.05em]">
              <span className="text-shine">Launching</span> <br /><span className="text-shine">Soon.</span>
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-slate-500 max-w-xl font-medium leading-relaxed mb-4">
            The Tevrix ecosystem is expanding. We are building the next generation of autonomous enterprise services to redefine operational standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: Bot, title: "AI Receptionist", type: "NEURAL INTERFACE", desc: "High-fidelity linguistic orchestration. 100+ dialects processed with zero latency for a frictionless front-desk experience." },
            { icon: User, title: "AI HR", type: "HUMAN SYNTHESIS", desc: "Automating the talent lifecycle. From predictive recruiting to autonomous performance scaling, engineered for the modern workforce." },
            { icon: Database, title: "AI Financial Analyst", type: "QUANTUM AUDIT", desc: "Real-time fiscal intelligence. Autonomous auditing and deep-learning projections for high-stakes enterprise portfolios." },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group service-card-3d p-10 md:p-12 rounded-[40px] md:rounded-[56px] border border-white/10 hover:border-primary/25 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="service-card-3d__shine" />
              <div className="service-card-3d__edge" />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-950/70 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-8 md:mb-10 shadow-[0_30px_80px_rgba(0,0,0,0.65)] group-hover:bg-primary/90 transition-all duration-700">
                <service.icon className="text-white group-hover:scale-110 transition-transform w-7 h-7 md:w-8 md:h-8 service-card-3d__float" />
              </div>
              <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]">{service.type}</span>
              <h4 className="text-xl md:text-2xl font-extrabold text-white mb-4 md:6 tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">{service.title}</h4>
              <p className="text-base md:text-lg text-white leading-relaxed font-medium drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const JoinForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mwvrvovb", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="relative group">
      {/* Decorative Glow behind the form */}
      <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

      <div className="w-full bg-slate-900/40 backdrop-blur-3xl p-8 md:p-10 lg:p-14 rounded-[32px] md:rounded-[48px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 md:py-20"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl">
              <Zap className="text-primary w-10 h-10 md:w-12 md:h-12 animate-pulse-glow" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-4 italic tracking-tight">Sync Complete.</h3>
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">Your data has been integrated into the network. We will manifest soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/80 ml-1">Identity // 01</label>
                <input
                  required
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-slate-600 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all font-bold text-sm tracking-tight shadow-inner"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/80 ml-1">Secure Link // 02</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-slate-600 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all font-bold text-sm tracking-tight shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/80 ml-1">Sector // 03</label>
              <div className="relative">
                <select
                  required
                  name="service"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white outline-none transition-all font-bold text-sm appearance-none focus:border-primary/50 focus:bg-white/[0.05] shadow-inner"
                >
                  <option value="" disabled selected className="bg-slate-950">Target Service Focus</option>
                  <option value="AI Receptionist" className="bg-slate-950 text-white">AI Receptionist Multilingual</option>
                  <option value="AI HR" className="bg-slate-950 text-white">AI HR Autonomous</option>
                  <option value="AI Financial Analyst" className="bg-slate-950 text-white">AI Financial Analyst Neural</option>
                  <option value="Custom Enterprise" className="bg-slate-950 text-white">Custom Enterprise Scalability</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/80 ml-1">Payload // 04</label>
              <textarea
                name="message"
                placeholder="Scale requirements, vision, or technical constraints..."
                rows="4"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-slate-600 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all font-bold text-sm tracking-tight shadow-inner resize-none"
              />
            </div>

            <button
              disabled={status === "submitting"}
              className="group/btn relative w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-primary text-slate-950 font-black text-[10px] tracking-[0.5em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(255,107,0,0.2)] disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
              <span className="relative z-10">{status === "submitting" ? "TRANSMITTING..." : "JOIN THE REVOLUTION"}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
            </button>

            {status === "error" && (
              <p className="text-red-500 text-[9px] font-black text-center uppercase tracking-[0.4em] animate-pulse">Critical Error: Link Aborted. Retry.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

const VisionSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      id="manifesto"
      className="pt-24 md:pt-12 pb-24 md:pb-32 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/5 blur-[120px] md:blur-[160px] rounded-full opacity-30 animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[130px] md:blur-[180px] rounded-full opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <span className="text-primary font-black uppercase tracking-[0.6em] text-[10px] mb-8 md:mb-12 block">PROTOCOL // MANIFESTO</span>
            <h2 className="text-4xl sm:text-6xl lg:text-[92px] font-display font-extrabold mb-10 md:mb-14 leading-[1.1] md:leading-[0.98] text-white tracking-[-.05em]">
              <span className="block">Erase</span>
              <span className="block">Friction</span>
              <span className="text-shine italic block mt-3 whitespace-normal md:whitespace-nowrap">Scale System.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 md:16 leading-relaxed font-medium max-w-xl">
              We are moving from human labor to <span className="text-white font-bold">synthetic orchestration</span>. Our mission is to accelerate the transition to the Autonomous Era.
            </p>
            <div className="flex flex-wrap gap-6 md:gap-8 items-center border-l-2 border-primary/20 pl-6 md:pl-8">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">NETWORK STATUS</span>
                <span className="text-white font-black text-base md:text-lg tracking-tight">FULLY OPERATIONAL</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">LATENCY Protocol</span>
                <span className="text-white font-black text-base md:text-lg tracking-tight">&lt; 0.001 MS</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <JoinForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 pt-24 md:pt-32 pb-24 md:pb-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 md:gap-40 mb-24 md:mb-48">
        <div>
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl">
              <Zap className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter text-white">TEVRIX.AI</span>
          </div>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-[1.5] mb-12 md:mb-16 max-w-lg">
            Architecting the future of global enterprise autonomy. Built for high-fidelity execution at massive scale.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex gap-8 md:gap-12">
              {["TWITTER", "LINKEDIN", "GITHUB"].map((social) => (
                <span key={social} className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-slate-700 hover:text-primary transition-colors cursor-pointer">{social}</span>
              ))}
            </div>
            <div className="flex flex-col xl:flex-row flex-wrap gap-6 xl:gap-10">
              <a
                href="mailto:panshul@tevrixai.com"
                className="flex items-center gap-3 group w-fit relative"
              >
                <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse-glow" />
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(255,107,0,0.2)] relative z-10">
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-tight relative z-10">founder- panshul@tevrixai.com</span>
              </a>
              <a
                href="mailto:madhu@tevrixai.com"
                className="flex items-center gap-3 group w-fit relative"
              >
                <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse-glow" />
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(255,107,0,0.2)] relative z-10">
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-tight relative z-10">co founder - madhu@tevrixai.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-32">
          {[
            { title: "Layer", links: ["Protocol", "Security", "Scale"] },
            { title: "Core", links: ["Manifesto", "Network", "Vision"] },
            { title: "Legal", links: ["Privacy", "Standard", "Terms"] }
          ].map((col, i) => (
            <div key={i}>
              <h5 className="text-[10px] font-extrabold uppercase tracking-[0.6em] text-primary mb-8 md:mb-12">{col.title}</h5>
              <ul className="space-y-6 md:space-y-8">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base md:text-lg font-bold text-slate-600 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-16 md:pt-24 border-t border-white/5 gap-10 md:gap-16">
        <p className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-700 text-center md:text-left">
          &copy; {new Date().getFullYear()} TEVRIX AI PVT LTD. ENGINEERED FOR SUPREMACY.
        </p>
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(255,107,0,1)] animate-pulse" />
          <span className="text-[9px] font-extrabold uppercase tracking-[0.4em] md:tracking-[0.6em] text-slate-600">SYSTEM STATUS: OPTIMIZED</span>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 relative overflow-x-hidden">
        <Hero />
        <MarketVision />
        <EcosystemGrid />
        <VisionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
