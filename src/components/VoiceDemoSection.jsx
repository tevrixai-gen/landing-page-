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
    description: 'Ask Neha anything about banking — FD rates, loans, card rules, transfers, and more.',
    prompts: [
      'Mera balance check karo',
      'FD rates kya hain?',
      'Home loan ke baare mein batao',
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
    description: 'Ask Kavya about returns, refunds, shipping, payments — anything about online shopping.',
    prompts: [
      'Mera order kahan hai?',
      'Return karna hai, wrong size aaya',
      'Refund kitne din mein aata hai?',
      'Return policy kya hai?',
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
      'Sabse best plan kaunsa hai?',
      'US ja raha hoon — roaming kaise karoon?',
      'Number port karna hai',
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
      'Book me a dental cleaning appointment',
      'What are your clinic timings?',
      'How much does an eye checkup cost?',
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

/* ── ElevenLabs-style orb color config per industry ───────
   base = the orb's overall tone; blobs = soft color clouds that
   drift around INSIDE the fixed circle (like the ElevenLabs orb).
   Each blob: light highlight, deeper shade, and a shifted accent hue. */
const ORB_COLORS = {
  amber: {
    base: '#f59e0b',
    blobs: ['#fffbeb', '#ea580c', '#fde047'],
    haloColor: 'rgba(251,191,36,0.55)',
    shadowColor: 'rgba(249,115,22,0.35)',
  },
  violet: {
    base: '#7c3aed',
    blobs: ['#ede9fe', '#4c1d95', '#d946ef'],
    haloColor: 'rgba(139,92,246,0.5)',
    shadowColor: 'rgba(109,40,217,0.3)',
  },
  emerald: {
    base: '#059669',
    blobs: ['#d1fae5', '#065f46', '#22d3ee'],
    haloColor: 'rgba(16,185,129,0.5)',
    shadowColor: 'rgba(6,95,70,0.3)',
  },
  rose: {
    base: '#e11d48',
    blobs: ['#ffe4e6', '#9f1239', '#fb923c'],
    haloColor: 'rgba(244,63,94,0.5)',
    shadowColor: 'rgba(159,18,57,0.3)',
  },
};

/* ── Unique filter IDs to avoid DOM conflicts ────────────── */
let _filterId = 0;
const nextFilterId = () => `grain-${++_filterId}`;

/* ── Orb — ElevenLabs-style: fixed circle, color blobs flow inside ──
   Three soft radial-gradient "color clouds" drift around inside a
   circular clip on lissajous paths. When the user/AI speaks they drift
   faster and wider; idle is a slow gentle swirl. A grayscale grain
   overlay gives the signature ElevenLabs texture. */
function GrainOrb({ colorKey, size, scale, opacity = 1, amplitudeRef, speaker }) {
  const oc = ORB_COLORS[colorKey];
  const filterId = useRef(nextFilterId()).current;
  const svgRef = useRef(null);
  const blobRefs = useRef([null, null, null]);
  const rafRef = useRef(null);
  const ampSmoothRef = useRef(0);

  const half = size / 2;
  const [b0, b1, b2] = oc.blobs;

  // Each blob: home position (fraction of size), motion freq, phase, radius.
  const blobCfg = useRef([
    { hx: 0.40, hy: 0.36, fx: 0.50, fy: 0.37, ph: 0.0, r: 0.62 },
    { hx: 0.62, hy: 0.64, fx: 0.41, fy: 0.55, ph: 2.1, r: 0.58 },
    { hx: 0.52, hy: 0.50, fx: 0.63, fy: 0.45, ph: 4.0, r: 0.55 },
  ]).current;

  useEffect(() => {
    const animate = () => {
      const t = Date.now() / 1000;
      const isSpeaking = speaker === 'user' || speaker === 'ai';

      // Smooth the amplitude so motion eases in/out (slow easing = calm)
      const targetAmp = isSpeaking ? (amplitudeRef?.current ?? 0.3) : 0;
      ampSmoothRef.current += (targetAmp - ampSmoothRef.current) * 0.05;
      const amp = ampSmoothRef.current;

      // Gentle ambient swirl; speaking adds only a subtle lift in pace/range.
      const speed  = 0.7 + amp * 0.9;
      const driftR = (0.08 + amp * 0.06) * size;   // how far blob centers roam

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = blobCfg[i];
        const cx = c.hx * size + Math.sin(t * c.fx * speed + c.ph) * driftR;
        const cy = c.hy * size + Math.cos(t * c.fy * speed + c.ph * 1.3) * driftR;
        el.setAttribute('cx', cx.toFixed(2));
        el.setAttribute('cy', cy.toFixed(2));
        // Blobs swell very slightly with voice
        el.setAttribute('r', ((c.r + amp * 0.05) * half).toFixed(2));
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [amplitudeRef, speaker, size, half, blobCfg]);

  return (
    <div
      style={{
        width: size, height: size,
        transform: `scale(${scale})`,
        willChange: 'transform',
        position: 'relative',
        flexShrink: 0,
        // soft colored glow — no heavy drop shadow, so it reads as light
        filter: `drop-shadow(0 0 ${size * 0.18}px ${oc.haloColor}) drop-shadow(0 8px 26px ${oc.shadowColor})`,
        opacity,
      }}
    >
      <svg
        ref={svgRef}
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Edge-fade mask — orb melts softly into the page, no hard rim */}
          <radialGradient id={`mg-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half} cy={half} r={half}>
            <stop offset="0%"   stopColor="#fff" />
            <stop offset="58%"  stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id={`mask-${filterId}`}>
            <rect x="0" y="0" width={size} height={size} fill={`url(#mg-${filterId})`} />
          </mask>

          {/* Base glow — translucent colored light, page shows through */}
          <radialGradient id={`bg-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half * 0.85} cy={half * 0.78} r={half * 1.2}>
            <stop offset="0%"   stopColor={b0}      stopOpacity="0.65" />
            <stop offset="45%"  stopColor={oc.base} stopOpacity="0.5" />
            <stop offset="100%" stopColor={oc.base} stopOpacity="0.08" />
          </radialGradient>

          {/* Drifting color clouds — translucent, blend like light */}
          <radialGradient id={`b0-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half} cy={half} r={half}>
            <stop offset="0%"  stopColor={b0} stopOpacity="0.7" />
            <stop offset="55%" stopColor={b0} stopOpacity="0.2" />
            <stop offset="100%" stopColor={b0} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`b1-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half} cy={half} r={half}>
            <stop offset="0%"  stopColor={b1} stopOpacity="0.6" />
            <stop offset="55%" stopColor={b1} stopOpacity="0.18" />
            <stop offset="100%" stopColor={b1} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`b2-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half} cy={half} r={half}>
            <stop offset="0%"  stopColor={b2} stopOpacity="0.6" />
            <stop offset="55%" stopColor={b2} stopOpacity="0.18" />
            <stop offset="100%" stopColor={b2} stopOpacity="0" />
          </radialGradient>
          {/* Top-left glassy sheen */}
          <radialGradient id={`hi-${filterId}`} gradientUnits="userSpaceOnUse"
            cx={half * 0.62} cy={half * 0.5} r={half * 0.8}>
            <stop offset="0%"   stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {/* Soft blur so the color clouds melt together like fluid */}
          <filter id={`blur-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={size * 0.05} />
          </filter>
          {/* Light grayscale grain for subtle texture */}
          <filter id={`gf-${filterId}`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
            <feComponentTransfer in="grey" result="solid">
              <feFuncA type="linear" slope="0" intercept="1" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Everything fades out at the edge via the mask → translucent glow */}
        <g mask={`url(#mask-${filterId})`}>
          {/* Translucent base glow (no solid fill) */}
          <rect x="0" y="0" width={size} height={size} fill={`url(#bg-${filterId})`} />
          {/* Flowing color clouds (cx/cy animated via RAF), blurred to blend */}
          <g filter={`url(#blur-${filterId})`}>
            <circle ref={el => blobRefs.current[0] = el} cx={half} cy={half} r={half * 0.62} fill={`url(#b0-${filterId})`} />
            <circle ref={el => blobRefs.current[1] = el} cx={half} cy={half} r={half * 0.58} fill={`url(#b1-${filterId})`} />
            <circle ref={el => blobRefs.current[2] = el} cx={half} cy={half} r={half * 0.55} fill={`url(#b2-${filterId})`} />
          </g>
          {/* Glassy sheen */}
          <rect x="0" y="0" width={size} height={size} fill={`url(#hi-${filterId})`} />
          {/* Subtle grain */}
          <rect x="0" y="0" width={size} height={size} fill="#fff"
            filter={`url(#gf-${filterId})`} style={{ mixBlendMode: 'overlay' }} opacity="0.18" />
        </g>
      </svg>
    </div>
  );
}

/* ── Conversation Visualizer — ElevenLabs style ──────────── */
function ConversationVisualizer({ isConnected, colorKey, speaker, amplitudeRef, tickAudio, timeLeft, agentName }) {
  const orbWrapRef = useRef(null);
  const haloRef    = useRef(null);
  const rafRef     = useRef(null);

  const sc       = SVG_COLORS[colorKey];
  const oc       = ORB_COLORS[colorKey];
  const progress = timeLeft / CALL_LIMIT;
  const SIZE     = 280;
  const ORB_SIZE = 180;
  const RING_R   = (SIZE - 10) / 2;
  const CIRC     = 2 * Math.PI * RING_R;

  const isUser     = speaker === 'user';
  const isAI       = speaker === 'ai';
  const isSpeaking = isUser || isAI;

  useEffect(() => {
    if (!isConnected) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      tickAudio();                       // feeds amplitude → orb's internal flow
      const amp = amplitudeRef.current;

      // No size throbbing. Voice only gently brightens the surrounding glow.
      const targetHalo = isSpeaking ? 0.22 + Math.min(0.2, amp * 0.25) : 0.12;
      if (haloRef.current) {
        const cur = parseFloat(haloRef.current.style.opacity) || 0.12;
        haloRef.current.style.opacity = (cur + (targetHalo - cur) * 0.06).toFixed(4);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isConnected, isUser, isAI, amplitudeRef, tickAudio]);

  return (
    <div className="flex flex-col items-center gap-5">

      {/* Canvas */}
      <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>

        {/* Countdown ring */}
        <svg width={SIZE} height={SIZE} className="absolute inset-0 -rotate-90 pointer-events-none">
          <defs>
            <linearGradient id={`pg-${colorKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={sc.c1} />
              <stop offset="100%" stopColor={sc.c2} />
            </linearGradient>
          </defs>
          <circle cx={SIZE/2} cy={SIZE/2} r={RING_R} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
          <circle cx={SIZE/2} cy={SIZE/2} r={RING_R} fill="none"
            stroke={`url(#pg-${colorKey})`} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={CIRC} strokeDashoffset={CIRC - progress * CIRC}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>

        {/* Outer glow halo */}
        <div
          ref={haloRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ORB_SIZE + 80, height: ORB_SIZE + 80,
            background: `radial-gradient(circle, ${oc.haloColor} 0%, transparent 70%)`,
            filter: 'blur(28px)',
            opacity: 0.18,
            willChange: 'transform, opacity',
          }}
        />

        {/* Orb wrapper (scale driven by RAF) */}
        <div
          ref={orbWrapRef}
          style={{ willChange: 'transform' }}
        >
          <GrainOrb colorKey={colorKey} size={ORB_SIZE} scale={1} amplitudeRef={amplitudeRef} speaker={speaker} />
        </div>
      </div>

      {/* Speaker label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speaker}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
              style={{ backgroundColor: isSpeaking ? sc.c1 : '#cbd5e1' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: isSpeaking ? sc.c1 : '#cbd5e1' }} />
          </span>
          <span className="text-[14px] font-semibold text-slate-700 tracking-tight">
            {isUser ? 'You are speaking' : isAI ? `${agentName} is speaking` : 'Listening…'}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className={`text-[20px] font-bold tabular-nums tracking-tight ${timeLeft <= 10 ? 'text-red-500' : 'text-slate-600'}`}>
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
    `?token=${token}&environment=production&apiEndpoint=https://api.dograh.com`;

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
      body > [data-dograh] {
        position: fixed !important;
        left: -9999px !important;
        top: -9999px !important;
        pointer-events: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
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
      @keyframes idle-breathe {
        0%, 100% { transform: scale(1);    opacity: 1; }
        50%       { transform: scale(1.04); opacity: 0.88; }
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
              <div className="p-8 md:p-10">
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

              {/* Right — call panel (unified with card, no heavy tint) */}
              <div className="relative p-6 md:p-8 flex flex-col items-center justify-center gap-4 min-w-[300px]">
                {/* Very subtle radial tint from the orb's color, fading to transparent */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${SVG_COLORS[industry.color].c1}0d, transparent 70%)`,
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
                        className="flex flex-col items-center gap-5"
                      >
                        {/* Idle orb — same GrainOrb, gentle breathing via CSS */}
                        <GrainOrb
                          colorKey={industry.color}
                          size={175}
                          scale={1}
                          opacity={isFailed ? 0.45 : 1}
                          amplitudeRef={amplitudeRef}
                          speaker="idle"
                        />
                        <div className="text-[14px] text-slate-500 text-center font-medium tracking-tight">
                          {isFailed ? 'Connection failed — retry' : 'Ready to talk'}
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
