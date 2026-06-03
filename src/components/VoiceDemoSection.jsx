import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark, ShoppingCart, Wifi, Stethoscope,
  Mic, MicOff, PhoneOff, Clock, MessageSquare, Zap, Volume2
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
  amber: {
    tab: 'bg-amber-500',
    tabHover: 'hover:bg-amber-50',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    btn: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
    btnGlow: 'shadow-amber-500/25',
    prompt: 'bg-amber-50/80 border-amber-200/60 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm',
    accent: 'from-amber-500 to-orange-500',
    accentLight: 'from-amber-50 to-orange-50',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    text: 'text-amber-600',
    dot: 'bg-amber-500',
  },
  violet: {
    tab: 'bg-violet-500',
    tabHover: 'hover:bg-violet-50',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    btn: 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700',
    btnGlow: 'shadow-violet-500/25',
    prompt: 'bg-violet-50/80 border-violet-200/60 text-violet-800 hover:bg-violet-100 hover:border-violet-300 hover:shadow-sm',
    accent: 'from-violet-500 to-purple-600',
    accentLight: 'from-violet-50 to-purple-50',
    iconBg: 'bg-gradient-to-br from-violet-400 to-purple-600',
    text: 'text-violet-600',
    dot: 'bg-violet-500',
  },
  emerald: {
    tab: 'bg-emerald-500',
    tabHover: 'hover:bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    btnGlow: 'shadow-emerald-500/25',
    prompt: 'bg-emerald-50/80 border-emerald-200/60 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm',
    accent: 'from-emerald-500 to-teal-500',
    accentLight: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    text: 'text-emerald-600',
    dot: 'bg-emerald-500',
  },
  rose: {
    tab: 'bg-rose-500',
    tabHover: 'hover:bg-rose-50',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    btn: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600',
    btnGlow: 'shadow-rose-500/25',
    prompt: 'bg-rose-50/80 border-rose-200/60 text-rose-800 hover:bg-rose-100 hover:border-rose-300 hover:shadow-sm',
    accent: 'from-rose-500 to-pink-500',
    accentLight: 'from-rose-50 to-pink-50',
    iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
    text: 'text-rose-600',
    dot: 'bg-rose-500',
  },
};

const SVG_COLORS = {
  amber:   { c1: '#f59e0b', c2: '#f97316', glow: 'rgba(245,158,11,0.3)' },
  violet:  { c1: '#8b5cf6', c2: '#7c3aed', glow: 'rgba(139,92,246,0.3)' },
  emerald: { c1: '#10b981', c2: '#14b8a6', glow: 'rgba(16,185,129,0.3)' },
  rose:    { c1: '#f43f5e', c2: '#ec4899', glow: 'rgba(244,63,94,0.3)' },
};

const CALL_LIMIT = 60;

/* ── Visualizer constants ────────────────────────────────── */
const AUDIO_BINS = 32;
const VIS = 200;
const CTR = VIS / 2;
const INNER_R = 24;
const BLOB_POINTS = 8;

/* ── Smooth blob path generator ──────────────────────────── */
function blobPath(cx, cy, baseR, offsets, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = baseR + offsets[i];
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  if (pts.length < 3) return '';
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

/* ── Audio capture hook ──────────────────────────────────── */
function useAudioCapture() {
  const analyzerRef = useRef(null);
  const levelsRef = useRef(new Float32Array(AUDIO_BINS).fill(0));
  const smoothedRef = useRef(new Float32Array(AUDIO_BINS).fill(0));
  const amplitudeRef = useRef(0);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const speakerRef = useRef('idle');
  const [speaker, setSpeaker] = useState('idle');
  const silenceStartRef = useRef(null);
  const lastSpeechRef = useRef(0);
  const hasMicRef = useRef(false);

  const updateSpeaker = useCallback((val) => {
    if (speakerRef.current !== val) {
      speakerRef.current = val;
      setSpeaker(val);
    }
  }, []);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = audioCtx;
      const src = audioCtx.createMediaStreamSource(stream);
      const analyzer = audioCtx.createAnalyser();
      analyzer.fftSize = 64;
      analyzer.smoothingTimeConstant = 0.8;
      src.connect(analyzer);
      analyzerRef.current = analyzer;
      hasMicRef.current = true;
    } catch {
      hasMicRef.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (ctxRef.current?.state !== 'closed') {
      ctxRef.current?.close().catch(() => {});
    }
    analyzerRef.current = null;
    streamRef.current = null;
    ctxRef.current = null;
    hasMicRef.current = false;
    smoothedRef.current.fill(0);
    levelsRef.current.fill(0);
    silenceStartRef.current = null;
    lastSpeechRef.current = 0;
    updateSpeaker('idle');
  }, [updateSpeaker]);

  const tick = useCallback(() => {
    if (!analyzerRef.current) {
      // No mic — generate fake voice data for demo feel
      const t = Date.now() / 1000;
      const fakeAmp = (Math.sin(t * 2.5) + 1) / 2 * 0.5 + 0.2;
      amplitudeRef.current += (fakeAmp - amplitudeRef.current) * 0.15;
      for (let i = 0; i < AUDIO_BINS; i++) {
        const fake = (Math.sin(t * 3 + i * 0.8) + 1) / 2 * 0.4 + Math.random() * 0.15;
        smoothedRef.current[i] += (fake - smoothedRef.current[i]) * 0.15;
      }
      return;
    }

    const raw = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(raw);

    let sum = 0;
    for (let i = 0; i < AUDIO_BINS; i++) {
      const v = (raw[i % raw.length] || 0) / 255;
      levelsRef.current[i] = v;
      smoothedRef.current[i] += (v - smoothedRef.current[i]) * 0.25;
      sum += v;
    }
    const targetAmp = Math.min(1, (sum / AUDIO_BINS) * 2.2);
    amplitudeRef.current += (targetAmp - amplitudeRef.current) * 0.3;

    const avg = raw.reduce((a, b) => a + b, 0) / raw.length;
    const now = Date.now();

    if (avg > 16) {
      lastSpeechRef.current = now;
      silenceStartRef.current = null;
      updateSpeaker('user');
    } else {
      if (!silenceStartRef.current) silenceStartRef.current = now;
      const silenceDur = now - silenceStartRef.current;
      if (silenceDur > 600 && lastSpeechRef.current > 0) {
        updateSpeaker('ai');
      }
      if (silenceDur > 12000) {
        updateSpeaker('idle');
        lastSpeechRef.current = 0;
      }
    }
  }, [updateSpeaker]);

  return { speaker, smoothedRef, amplitudeRef, start, stop, tick, hasMicRef };
}

/* ── Conversation Visualizer ─────────────────────────────── */
function ConversationVisualizer({ isConnected, colorKey, accentClass, speaker, amplitudeRef, tickAudio, timeLeft, agentName }) {
  const orbRef       = useRef(null);
  const haloRef      = useRef(null);
  const ring1Ref     = useRef(null);
  const ring2Ref     = useRef(null);
  const innerRef     = useRef(null);
  const rafRef       = useRef(null);
  const phaseRef     = useRef(0);
  const breathRef    = useRef(0);

  const sc = SVG_COLORS[colorKey];
  const progress = timeLeft / CALL_LIMIT;
  const SIZE = 240;
  const RING_R = (SIZE - 8) / 2;
  const CIRC = 2 * Math.PI * RING_R;

  const isUser     = speaker === 'user';
  const isAI       = speaker === 'ai';
  const isSpeaking = isUser || isAI;

  useEffect(() => {
    if (!isConnected) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      tickAudio();
      const amp = amplitudeRef.current; // 0..1
      const t   = Date.now() / 1000;

      // Phase advances faster when speaking
      phaseRef.current += isSpeaking ? 0.025 : 0.012;
      const phase = phaseRef.current;

      // Ambient "breath" — always alive, like a heartbeat
      const breath = (Math.sin(t * 1.4) + 1) / 2; // 0..1
      breathRef.current = breath;

      // Orb scale: user → amplitude-driven (spiky), AI → smooth breath (rhythmic), idle → gentle
      let orbScale, orbBrightness, haloScale, haloOpacity;
      if (isUser) {
        const punch = amp * 0.35;
        orbScale      = 1 + punch + breath * 0.04;
        orbBrightness = 1 + amp * 0.15;
        haloScale     = 1.05 + punch * 1.4 + breath * 0.05;
        haloOpacity   = 0.45 + amp * 0.35;
      } else if (isAI) {
        const wave    = (Math.sin(phase * 1.6) + 1) / 2;
        orbScale      = 1 + wave * 0.18 + breath * 0.04;
        orbBrightness = 1 + wave * 0.1;
        haloScale     = 1.1 + wave * 0.25;
        haloOpacity   = 0.4 + wave * 0.25;
      } else {
        orbScale      = 1 + breath * 0.04;
        orbBrightness = 1;
        haloScale     = 1 + breath * 0.04;
        haloOpacity   = 0.18;
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `scale(${orbScale.toFixed(3)})`;
        orbRef.current.style.filter    = `brightness(${orbBrightness.toFixed(3)}) saturate(${(1 + amp * 0.2).toFixed(3)})`;
      }
      if (innerRef.current) {
        // Inner highlight slowly rotates for a "live" feel
        const rot = (t * 18) % 360;
        innerRef.current.style.transform = `rotate(${rot.toFixed(1)}deg)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(-50%, -50%) scale(${haloScale.toFixed(3)})`;
        haloRef.current.style.opacity   = haloOpacity.toFixed(3);
      }
      // Outer rings: amplify when speaking
      if (ring1Ref.current) {
        ring1Ref.current.style.opacity = (isSpeaking ? 0.7 + amp * 0.3 : 0).toFixed(2);
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.opacity = (isSpeaking ? 0.5 + amp * 0.3 : 0).toFixed(2);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isConnected, isSpeaking, isUser, isAI, amplitudeRef, tickAudio]);

  // Ring animation duration — quicker when someone speaks
  const ringDur = isSpeaking ? '2.4s' : '4s';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Visualizer canvas */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Progress timer ring (outermost) */}
        <svg
          width={SIZE} height={SIZE}
          className="absolute inset-0 -rotate-90 pointer-events-none"
        >
          <defs>
            <linearGradient id={`progGrad-${colorKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={sc.c1} />
              <stop offset="100%" stopColor={sc.c2} />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RING_R}
            fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2.5"
          />
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RING_R}
            fill="none" stroke={`url(#progGrad-${colorKey})`} strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC - progress * CIRC}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Soft halo behind orb (driven by amplitude) */}
        <div
          ref={haloRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: '50%', top: '50%',
            width: 180, height: 180,
            background: `radial-gradient(circle, ${sc.c1}55 0%, ${sc.c1}00 70%)`,
            filter: 'blur(20px)',
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 0.18,
            transition: 'opacity 0.2s ease',
            willChange: 'transform, opacity',
          }}
        />

        {/* Continuous pulse rings — only render while speaking */}
        {isSpeaking && (
          <>
            <div
              ref={ring1Ref}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: '50%', top: '50%',
                width: 110, height: 110,
                marginLeft: -55, marginTop: -55,
                border: `2px solid ${sc.c1}`,
                animation: `voice-pulse ${ringDur} cubic-bezier(0.22, 1, 0.36, 1) infinite`,
                willChange: 'transform, opacity',
              }}
            />
            <div
              ref={ring2Ref}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: '50%', top: '50%',
                width: 110, height: 110,
                marginLeft: -55, marginTop: -55,
                border: `1.5px solid ${sc.c1}`,
                animation: `voice-pulse ${ringDur} cubic-bezier(0.22, 1, 0.36, 1) ${parseFloat(ringDur) / 2}s infinite`,
                willChange: 'transform, opacity',
              }}
            />
          </>
        )}

        {/* Main orb — gradient sphere that scales with voice */}
        <div
          ref={orbRef}
          className="relative rounded-full flex items-center justify-center overflow-hidden"
          style={{
            width: 110, height: 110,
            background: `radial-gradient(circle at 30% 25%, ${sc.c1}, ${sc.c2})`,
            boxShadow: `0 8px 32px ${sc.c1}55, 0 0 0 1px ${sc.c1}33, inset 0 -8px 24px ${sc.c2}66, inset 0 8px 24px rgba(255,255,255,0.25)`,
            transition: 'transform 0.06s linear, filter 0.12s linear',
            willChange: 'transform, filter',
          }}
        >
          {/* Rotating inner shimmer */}
          <div
            ref={innerRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.25) 90deg, transparent 180deg, rgba(255,255,255,0.15) 270deg, transparent 360deg)`,
              mixBlendMode: 'overlay',
              willChange: 'transform',
            }}
          />
          {/* Inner highlight (top-left glossy spot) */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: 12, left: 18, width: 26, height: 16,
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)',
              filter: 'blur(2px)',
            }}
          />
          {/* Mic icon */}
          <Mic className="w-8 h-8 text-white relative z-10 drop-shadow-md" strokeWidth={2.2} />
        </div>
      </div>

      {/* Speaker label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speaker}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: isSpeaking ? sc.c1 : '#cbd5e1' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: isSpeaking ? sc.c1 : '#cbd5e1' }}
            />
          </span>
          <span className="text-[13px] font-semibold text-slate-700">
            {isUser ? 'You' : isAI ? `${agentName} speaking` : 'Listening...'}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className={`text-[22px] font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-500' : 'text-slate-700'}`}>
          {fmtTime(timeLeft)}
        </span>
      </div>
    </div>
  );
}

const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;


/* ── Widget loader ───────────────────────────────────────── */
function loadDograhScript(token, onReady, onFail) {
  const prev = document.getElementById('dograh-widget');
  if (prev) prev.remove();

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
  script.src =
    `https://app.dograh.com/embed/dograh-widget.js` +
    `?token=${token}&environment=production&apiEndpoint=https://tevrixai.com/dograh-api`;

  script.onerror = () => { if (onFail) onFail(); };
  document.head.appendChild(script);

  let attempts = 0;
  const maxAttempts = 80;
  const poll = setInterval(() => {
    attempts++;
    if (window.DograhWidget) {
      clearInterval(poll);
      onReady(window.DograhWidget);
    } else if (attempts > maxAttempts) {
      clearInterval(poll);
      if (onFail) onFail();
    }
  }, 150);

  return () => clearInterval(poll);
}


/* ── Main component ──────────────────────────────────────── */
export default function VoiceDemoSection() {
  const [activeId, setActiveId]       = useState('banking');
  const [status, setStatus]           = useState('idle');
  const [timeLeft, setTimeLeft]       = useState(CALL_LIMIT);
  const timerRef  = useRef(null);
  const cleanupFn = useRef(null);

  const { speaker, amplitudeRef, start: startAudio, stop: stopAudio, tick: tickAudio } = useAudioCapture();

  const industry = INDUSTRIES.find(i => i.id === activeId);
  const colors   = COLOR_MAP[industry.color];
  const Icon     = industry.icon;

  const initWidget = useCallback((id) => {
    if (cleanupFn.current) cleanupFn.current();
    if (timerRef.current)  clearInterval(timerRef.current);
    stopAudio();
    setStatus('loading');
    setTimeLeft(CALL_LIMIT);

    const ind = INDUSTRIES.find(i => i.id === id);
    const cancel = loadDograhScript(
      ind.token,
      (widget) => {
        setStatus('ready');
        widget.onStatusChange?.((s) => {
          if (s === 'connecting') setStatus('connecting');
          else if (s === 'connected') setStatus('connected');
          else if (s === 'idle') {
            clearInterval(timerRef.current);
            stopAudio();
            setStatus('ready');
            setTimeLeft(CALL_LIMIT);
          } else if (s === 'failed') {
            clearInterval(timerRef.current);
            stopAudio();
            setStatus('failed');
          }
        });
        widget.onCallConnected?.(() => {
          startAudio();
          setTimeLeft(CALL_LIMIT);
          timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
              if (prev <= 1) {
                clearInterval(timerRef.current);
                stopAudio();
                try { window.DograhWidget?.end(); } catch {}
                setStatus('ended');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        });
        widget.onCallDisconnected?.(() => {
          clearInterval(timerRef.current);
          stopAudio();
          setStatus('ready');
          setTimeLeft(CALL_LIMIT);
        });
        widget.onError?.(() => {
          clearInterval(timerRef.current);
          stopAudio();
          setStatus('failed');
        });
      },
      () => { setStatus('failed'); }
    );
    cleanupFn.current = cancel;
  }, [startAudio, stopAudio]);

  useEffect(() => {
    initWidget(activeId);
    return () => {
      if (cleanupFn.current) cleanupFn.current();
      if (timerRef.current)  clearInterval(timerRef.current);
      stopAudio();
    };
  }, [activeId, initWidget]);

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

  // Inject ripple animation keyframes
  useEffect(() => {
    if (document.getElementById('voice-ripple-style')) return;
    const style = document.createElement('style');
    style.id = 'voice-ripple-style';
    style.textContent = `
      @keyframes voice-ripple {
        0%   { transform: scale(1); opacity: 0.35; }
        100% { transform: scale(3.2); opacity: 0; }
      }
      @keyframes voice-pulse {
        0%   { transform: scale(0.85); opacity: 0.9; }
        70%  { opacity: 0.15; }
        100% { transform: scale(2.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleTalk = async () => {
    if (status === 'connected' || status === 'connecting') {
      stopAudio();
      try { window.DograhWidget?.end(); } catch {}
    } else if (status === 'ready') {
      try {
        setStatus('connecting');
        await window.DograhWidget?.start();
      } catch {
        setStatus('failed');
      }
    } else if (status === 'ended' || status === 'failed') {
      initWidget(activeId);
    }
  };

  const handleTabChange = (id) => {
    if (id === activeId) return;
    stopAudio();
    try { window.DograhWidget?.end(); } catch {}
    clearInterval(timerRef.current);
    setActiveId(id);
  };

  const isLive    = status === 'connected' || status === 'connecting';
  const isLoading = status === 'loading';
  const isEnded   = status === 'ended';
  const isFailed  = status === 'failed';

  const btnLabel = status === 'connecting' ? 'Connecting...'
    : status === 'connected'  ? 'End Call'
    : status === 'ended'      ? 'Try Again'
    : status === 'failed'     ? 'Retry'
    : status === 'loading'    ? 'Loading...'
    : 'Talk to AI';

  return (
    <section id="live-demo" className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
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
          </motion.p>
        </div>

        {/* Industry Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
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
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold
                  border transition-all duration-300 cursor-pointer
                  ${isActive
                    ? `${c.tab} text-white border-transparent shadow-lg shadow-black/10`
                    : `bg-white border-black/[0.08] text-slate-600 ${c.tabHover} hover:border-black/15`}
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
            transition={{ duration: 0.35 }}
            className="card-3d overflow-hidden"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-0">

              {/* Left — info + prompts */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/[0.06]">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.iconBg} shadow-lg shadow-black/10`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-slate-900">{industry.agent}</span>
                      <span className={`w-2 h-2 rounded-full ${colors.dot} ${isLive ? 'animate-pulse' : ''}`} />
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.15em] border rounded-full px-2.5 py-0.5 inline-block mt-1 ${colors.badge}`}>
                      {industry.label} Agent
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-[14.5px] leading-relaxed mb-8">{industry.description}</p>

                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
                    <MessageSquare className="w-3 h-3" /> Try saying
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industry.prompts.map((p, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`text-[12px] font-medium px-3.5 py-2 rounded-xl border cursor-default
                          transition-all duration-200 ${colors.prompt}`}
                      >
                        &ldquo;{p}&rdquo;
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — call panel */}
              <div className={`relative p-6 md:p-8 flex flex-col items-center justify-center gap-4 min-w-[280px]
                bg-gradient-to-b ${colors.accentLight} md:bg-gradient-to-br`}>

                <div className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <AnimatePresence mode="wait">
                    {isLive ? (
                      <motion.div
                        key="live"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <ConversationVisualizer
                          isConnected={status === 'connected'}
                          colorKey={industry.color}
                          accentClass={colors.accent}
                          speaker={speaker}
                          amplitudeRef={amplitudeRef}
                          tickAudio={tickAudio}
                          timeLeft={timeLeft}
                          agentName={industry.agent}
                        />
                      </motion.div>
                    ) : isEnded ? (
                      <motion.div
                        key="ended"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-3 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
                          <PhoneOff className="w-7 h-7 text-slate-400" />
                        </div>
                        <div className="text-[14px] font-bold text-slate-700">Demo ended</div>
                        <div className="text-[12px] text-slate-400">1-min cap reached</div>
                      </motion.div>
                    ) : isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="relative w-16 h-16">
                          <div className={`absolute inset-0 rounded-full border-2 border-transparent
                            border-t-current ${colors.text} animate-spin`} />
                          <div className="absolute inset-2 rounded-full bg-white/60 flex items-center justify-center">
                            <Volume2 className="w-5 h-5 text-slate-300" />
                          </div>
                        </div>
                        <div className="text-[12px] text-slate-400 font-medium">Initialising agent...</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
                          <MicOff className="w-7 h-7 text-slate-300" />
                        </div>
                        <div className="text-[13px] text-slate-400 text-center font-medium">
                          {isFailed ? 'Connection failed' : 'Ready to talk'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Talk / End button */}
                  <motion.button
                    onClick={handleTalk}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                    whileTap={{ scale: isLoading ? 1 : 0.97 }}
                    className={`
                      relative flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[14px] font-bold text-white
                      transition-all duration-300 cursor-pointer
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${isLive
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20'
                        : `${colors.btn} shadow-lg ${colors.btnGlow}`}
                    `}
                  >
                    {isLive
                      ? <><PhoneOff className="w-4 h-4" /> {btnLabel}</>
                      : <><Mic className="w-4 h-4" /> {btnLabel}</>
                    }
                  </motion.button>

                  <p className="text-[10px] text-slate-400 text-center max-w-[180px] leading-relaxed">
                    Calls auto-end after 1 minute.<br />Microphone permission required.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }} viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-10 text-[12px] text-slate-400"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Powered by Tevrix AI · Real AI, not a recording
        </motion.div>

      </div>
    </section>
  );
}
