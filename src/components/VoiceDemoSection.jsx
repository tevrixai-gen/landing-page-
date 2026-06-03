import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark, ShoppingCart, Wifi, Stethoscope,
  Mic, MicOff, PhoneOff, Clock, MessageSquare, Zap
} from 'lucide-react';

/* ── Industry config ─────────────────────────────────────── */
const INDUSTRIES = [
  {
    id: 'banking',
    icon: Landmark,
    label: 'Banking',
    agent: 'Neha',
    token: 'emb_M1iKGuA9BQprzd7vN_kqr7jVEBSehf6UHGp6X7P9R8A',
    color: 'amber',
    description: 'AI banking support — balance, transactions, loans, card issues & more.',
    prompts: [
      'Mera balance check karna hai',
      'Last 5 transactions bata do',
      'FD rates kya hain 2 saal ke liye?',
      'Mera card block karna hai',
    ],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    label: 'E-Commerce',
    agent: 'Kavya',
    token: 'emb_Y4x_agMPXG9BSqlSmqzE82oN6HzcyaJueHrlknQ2ZP0',
    color: 'violet',
    description: 'AI order support — tracking, returns, refunds, cancellations & more.',
    prompts: [
      'Mera order kahan hai?',
      'Wrong size aaya, return karna hai',
      'Order cancel karna hai',
      'Refund kitne din mein aata hai?',
    ],
  },
  {
    id: 'telecom',
    icon: Wifi,
    label: 'Telecom',
    agent: 'Priya',
    token: 'emb_VKHpGTAjM9f1ZUEcc0AEjdXK0xl-QMxUaA3YtRVi93M',
    color: 'emerald',
    description: 'AI telecom care — data balance, plans, roaming, network issues & more.',
    prompts: [
      'Mera data kitna bacha hai?',
      'Best unlimited plan kaunsa hai?',
      'US trip ke liye roaming kaise karein?',
      'Network slow kyun hai?',
    ],
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    label: 'Healthcare',
    agent: 'Priya',
    token: 'emb_5Y06RXNjT0xjYX5WKk9BhkIsO69Rxv0_GAvTFmiqXq4',
    color: 'rose',
    description: 'AI clinic receptionist — appointments, pricing, doctors & insurance.',
    prompts: [
      'I want to book a dental cleaning',
      'What are your clinic hours?',
      'How much does an eye exam cost?',
      'Do you accept Star Health insurance?',
    ],
  },
];

const COLOR_MAP = {
  amber:   { tab: 'bg-amber-500',   badge: 'bg-amber-50 text-amber-700 border-amber-200',  ring: 'ring-amber-400',  btn: 'bg-amber-500 hover:bg-amber-600',  prompt: 'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100' },
  violet:  { tab: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-700 border-violet-200', ring: 'ring-violet-400', btn: 'bg-violet-500 hover:bg-violet-600', prompt: 'bg-violet-50 border-violet-100 text-violet-800 hover:bg-violet-100' },
  emerald: { tab: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', ring: 'ring-emerald-400', btn: 'bg-emerald-500 hover:bg-emerald-600', prompt: 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100' },
  rose:    { tab: 'bg-rose-500',    badge: 'bg-rose-50 text-rose-700 border-rose-200',     ring: 'ring-rose-400',   btn: 'bg-rose-500 hover:bg-rose-600',    prompt: 'bg-rose-50 border-rose-100 text-rose-800 hover:bg-rose-100' },
};

const CALL_LIMIT = 60; // 1-minute cap

/* ── Widget loader ───────────────────────────────────────── */
function loadDograhScript(token, onReady) {
  // Remove previous script + any widget DOM nodes Dograh injected
  const prev = document.getElementById('dograh-widget');
  if (prev) prev.remove();

  // Remove floating widget container Dograh injects into <body>
  document.querySelectorAll(
    'body > div[id*="dograh"], body > div[class*="dograh"], ' +
    'body > div[data-dograh], body > #dograh-root, body > #dograh-widget-root'
  ).forEach(el => el.remove());

  if (window.DograhWidget) {
    try { window.DograhWidget.end(); } catch {}
    delete window.DograhWidget;
  }

  const script = document.createElement('script');
  script.id = 'dograh-widget';
  script.async = true;
  script.src = `https://app.dograh.com/embed/dograh-widget.js?token=${token}`;
  document.head.appendChild(script);

  // Poll until window.DograhWidget is available
  let attempts = 0;
  const poll = setInterval(() => {
    attempts++;
    if (window.DograhWidget) {
      clearInterval(poll);
      onReady(window.DograhWidget);
    } else if (attempts > 100) {
      clearInterval(poll);
    }
  }, 150);

  return () => clearInterval(poll);
}

/* ── Main component ──────────────────────────────────────── */
export default function VoiceDemoSection() {
  const [activeId, setActiveId]       = useState('banking');
  const [status, setStatus]           = useState('idle');   // idle | loading | ready | connecting | connected | ended | failed
  const [timeLeft, setTimeLeft]       = useState(CALL_LIMIT);
  const timerRef  = useRef(null);
  const cleanupFn = useRef(null);

  const industry = INDUSTRIES.find(i => i.id === activeId);
  const colors   = COLOR_MAP[industry.color];
  const Icon     = industry.icon;

  /* Load widget whenever tab changes */
  const initWidget = useCallback((id) => {
    // Cancel previous loader
    if (cleanupFn.current) cleanupFn.current();
    if (timerRef.current)  clearInterval(timerRef.current);
    setStatus('loading');
    setTimeLeft(CALL_LIMIT);

    const ind = INDUSTRIES.find(i => i.id === id);
    const cancel = loadDograhScript(ind.token, (widget) => {
      setStatus('ready');

      widget.onStatusChange((s) => {
        if (s === 'connecting') setStatus('connecting');
        else if (s === 'connected') setStatus('connected');
        else if (s === 'idle') {
          clearInterval(timerRef.current);
          setStatus('ready');
          setTimeLeft(CALL_LIMIT);
        } else if (s === 'failed') {
          clearInterval(timerRef.current);
          setStatus('failed');
        }
      });

      widget.onCallConnected(() => {
        setTimeLeft(CALL_LIMIT);
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              try { window.DograhWidget?.end(); } catch {}
              setStatus('ended');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      });

      widget.onCallDisconnected(() => {
        clearInterval(timerRef.current);
        setStatus('ready');
        setTimeLeft(CALL_LIMIT);
      });

      widget.onError(() => {
        clearInterval(timerRef.current);
        setStatus('failed');
      });
    });

    cleanupFn.current = cancel;
  }, []);

  useEffect(() => {
    initWidget(activeId);
    return () => {
      if (cleanupFn.current) cleanupFn.current();
      if (timerRef.current)  clearInterval(timerRef.current);
    };
  }, [activeId, initWidget]);

  /* Inject CSS to hide Dograh's default floating button */
  useEffect(() => {
    if (document.getElementById('dograh-hide-style')) return;
    const style = document.createElement('style');
    style.id = 'dograh-hide-style';
    style.textContent = `
      body > div[id*="dograh"]:not([id="root"]),
      body > div[class*="dograh"],
      body > [data-dograh] { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleTalk = () => {
    if (status === 'connected' || status === 'connecting') {
      try { window.DograhWidget?.end(); } catch {}
    } else if (status === 'ready') {
      try { window.DograhWidget?.start(); } catch {}
    } else if (status === 'ended' || status === 'failed') {
      initWidget(activeId);
    }
  };

  const handleTabChange = (id) => {
    if (id === activeId) return;
    try { window.DograhWidget?.end(); } catch {}
    clearInterval(timerRef.current);
    setActiveId(id);
  };

  /* Derived UI state */
  const isLive      = status === 'connected' || status === 'connecting';
  const isLoading   = status === 'loading';
  const isEnded     = status === 'ended';
  const isFailed    = status === 'failed';
  const canTalk     = status === 'ready' || isLive || isEnded || isFailed;

  const btnLabel = status === 'connecting' ? 'Connecting…'
    : status === 'connected'  ? 'End Call'
    : status === 'ended'      ? 'Try Again'
    : status === 'failed'     ? 'Retry'
    : status === 'loading'    ? 'Loading…'
    : 'Talk to AI';

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <section
      id="live-demo"
      className="relative py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* bg glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="label-badge mb-5 inline-flex"
          >
            <Mic className="w-3.5 h-3.5" /> Live AI Voice Demo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl text-slate-950 mb-4"
          >
            Talk to Our AI.<br />
            <span className="text-gradient-amber">Experience It Live.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            Pick an industry, hit Talk, and have a real conversation with our AI agent.
            Each demo is capped at 1 minute.
          </motion.p>
        </div>

        {/* Industry Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {INDUSTRIES.map(ind => {
            const IIcon = ind.icon;
            const c = COLOR_MAP[ind.color];
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                onClick={() => handleTabChange(ind.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold
                  border transition-all duration-200 cursor-pointer
                  ${isActive
                    ? `${c.tab} text-white border-transparent shadow-md`
                    : 'bg-white border-black/[0.08] text-slate-600 hover:border-black/20'}
                `}
              >
                <IIcon className="w-3.5 h-3.5" />
                {ind.label}
              </button>
            );
          })}
        </motion.div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card-3d overflow-hidden"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-0">

              {/* Left — info + prompts */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/[0.06]">

                {/* Agent badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.tab}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-900">{industry.agent}</div>
                    <div className={`text-[11px] font-semibold uppercase tracking-widest border rounded-full px-2 py-0.5 inline-block mt-0.5 ${colors.badge}`}>
                      {industry.label} Agent
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-[14px] leading-relaxed mb-6">{industry.description}</p>

                {/* Try saying prompts */}
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <MessageSquare className="w-3 h-3" /> Try saying
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industry.prompts.map((p, i) => (
                      <span
                        key={i}
                        className={`text-[12px] font-medium px-3 py-1.5 rounded-full border cursor-default transition-colors duration-150 ${colors.prompt}`}
                      >
                        "{p}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — call panel */}
              <div className="p-8 md:p-10 flex flex-col items-center justify-center gap-6 min-w-[200px]">

                {/* Status indicator */}
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    {isLive ? (
                      <motion.div
                        key="live"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-3"
                      >
                        {/* Pulsing mic */}
                        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${colors.tab} shadow-lg`}>
                          <span className={`absolute inset-0 rounded-full ${colors.tab} opacity-30 animate-ping`} />
                          <Mic className="w-7 h-7 text-white relative z-10" />
                        </div>
                        {/* Countdown */}
                        <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : ''}>{fmtTime(timeLeft)}</span>
                          <span className="text-slate-400 text-[11px]">remaining</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">
                          {status === 'connecting' ? 'Connecting…' : 'Live'}
                        </div>
                      </motion.div>
                    ) : isEnded ? (
                      <motion.div
                        key="ended"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 text-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                          <PhoneOff className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="text-[13px] font-semibold text-slate-700">Demo ended</div>
                        <div className="text-[11px] text-slate-400">1-min cap reached</div>
                      </motion.div>
                    ) : isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full border-2 border-amber-200 border-t-amber-500 animate-spin" />
                        <div className="text-[12px] text-slate-400">Initialising agent…</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                          <MicOff className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="text-[12px] text-slate-400 text-center">
                          {isFailed ? 'Connection failed. Retry?' : 'Ready to talk'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Talk button */}
                <button
                  onClick={handleTalk}
                  disabled={isLoading}
                  className={`
                    relative flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white
                    transition-all duration-200 shadow-md cursor-pointer
                    disabled:opacity-40 disabled:cursor-not-allowed
                    ${isLive ? 'bg-red-500 hover:bg-red-600' : colors.btn}
                  `}
                >
                  {isLive
                    ? <><PhoneOff className="w-4 h-4" /> {btnLabel}</>
                    : <><Mic className="w-4 h-4" /> {btnLabel}</>
                  }
                </button>

                {/* Disclaimer */}
                <p className="text-[10px] text-slate-400 text-center max-w-[160px] leading-relaxed">
                  Calls auto-end after 1 minute. Microphone permission required.
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }} viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-400"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Powered by Tevrix AI · Real AI, not a recording
        </motion.div>

      </div>
    </section>
  );
}
