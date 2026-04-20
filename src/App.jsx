import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, X } from 'lucide-react';
import './index.css';
import './App.css';
import Home        from './pages/Home';
import AIBPOPage   from './pages/AIBPOPage';
import ServicePage from './pages/ServicePage';
import AboutPage   from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage   from './pages/TermsPage';
import Navbar      from './Navbar';

/* ── Global Demo Modal (shared between Navbar + pages) ── */
const DemoModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('');
  const inp = "w-full bg-white/70 border border-black/[0.08] rounded-xl px-4 py-3.5 text-slate-900 text-[14px] placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] transition-all duration-200";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)' }}
          >
            {/* top colour stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-violet-500" />

            <div className="p-8 md:p-10">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'ok' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Zap className="text-amber-500 w-7 h-7 fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Demo Booked!</h3>
                  <p className="text-slate-500 mb-6">Our team will reach out within 24 hours to confirm your slot.</p>
                  <button onClick={onClose} className="btn-primary mx-auto">Close</button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-950 tracking-tight mb-1.5">Book a Live Demo</h2>
                    <p className="text-slate-500 text-[14px]">
                      See Tevrix AI in action — a 30-min walk-through tailored to your operations.
                    </p>
                  </div>

                  <form onSubmit={handle} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                        <input required name="name" placeholder="Your Name" className={inp} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Work Email</label>
                        <input required name="email" type="email" placeholder="you@company.com" className={inp} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Company</label>
                        <input name="company" placeholder="Your Company" className={inp} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Phone</label>
                        <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className={inp} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">I'm interested in</label>
                      <select required name="service" className={inp} defaultValue="">
                        <option value="" disabled>Choose a module...</option>
                        {['AI BPO — Full Platform', 'AI Customer Care', 'AI HR Automation', 'AI Financial Intelligence', 'Document Intelligence', 'Custom Process Design'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Anything specific? (Optional)</label>
                      <textarea name="message" rows={3} placeholder="Tell us the process you want to automate..." className={inp + ' resize-none'} />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center py-3.5 text-[14px] mt-1"
                    >
                      {status === 'sending' ? 'Scheduling...' : 'Schedule My Demo'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {status === 'err' && (
                      <p className="text-red-500 text-[13px] text-center">Something went wrong. Please email us directly.</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── ROUTER SHELL ── */
export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo  = () => setDemoOpen(true);
  const closeDemo = () => setDemoOpen(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAFAFA] text-slate-600 font-sans selection:bg-amber-200 selection:text-amber-900">
        <DemoModal isOpen={demoOpen} onClose={closeDemo} />
        <Navbar onDemo={openDemo} />
        <Routes>
          <Route path="/"            element={<Home        onDemo={openDemo} />} />
          <Route path="/ai-bpo"      element={<AIBPOPage   onDemo={openDemo} />} />
          <Route path="/service/:id" element={<ServicePage onDemo={openDemo} />} />
          <Route path="/about"       element={<AboutPage   onDemo={openDemo} />} />
          <Route path="/privacy"     element={<PrivacyPage />} />
          <Route path="/terms"       element={<TermsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
