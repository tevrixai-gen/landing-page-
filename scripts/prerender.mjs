import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir   = resolve(__dirname, '../dist');

const routes = [
  '/',
  '/about',
  '/ai-bpo',
  '/privacy',
  '/terms',
  '/service/customer-care',
  '/service/hr-automation',
  '/service/financial-analyst',
  '/service/document-intelligence',
  '/service/voice-ai',
  '/service/custom-process',
];

const PAGE_META = {
  '/': {
    title: 'Tevrix AI - Multilingual AI BPO for India, AI HR, and Enterprise Automation',
    description: 'Tevrix AI engineers autonomous systems that eradicate inefficiency and slash operational costs. Discover our multi-agentic AI BPO for the Indian market.',
    canonical: 'https://tevrixai.com/',
    ogTitle: 'Tevrix AI - Multilingual AI BPO & Enterprise Automation',
    ogDescription: 'Erase operational friction with autonomous AI agents built in Bharat. Discover our multi-agentic BPO solutions for India and the world.',
  },
  '/about': {
    title: 'About Tevrix AI - Founders, Team & Mission | India AI BPO Startup',
    description: 'Meet Panshul Sharma (CEO) and Vempalli Madhu Sai (COO), the founders disrupting India\'s $38B BPO industry with AI-native automation agents.',
    canonical: 'https://tevrixai.com/about',
    ogTitle: 'About Tevrix AI - Our Team & Mission',
    ogDescription: 'Meet the founders building India\'s AI-native BPO platform. Tevrix AI is rewriting outsourcing with autonomous AI agents.',
  },
  '/ai-bpo': {
    title: 'AI BPO Platform India - Replace Your BPO Department with AI | Tevrix AI',
    description: 'Tevrix AI\'s AI BPO platform replaces entire outsourcing departments with intelligent agents — 85% cheaper, 140× faster, 24/7 across 120+ languages.',
    canonical: 'https://tevrixai.com/ai-bpo',
    ogTitle: 'AI BPO Platform - Tevrix AI',
    ogDescription: 'Replace your BPO department with AI agents. 85% cost reduction, 140× speed, 24/7 availability across 120+ languages.',
  },
  '/service/customer-care': {
    title: 'AI Customer Care - 90% First Contact Resolution, 120+ Languages | Tevrix AI',
    description: 'Tevrix AI\'s AI Customer Care resolves 90% of queries on first contact across voice, chat and email — 24/7, 120+ languages, sub-1-second response.',
    canonical: 'https://tevrixai.com/service/customer-care',
    ogTitle: 'AI Customer Care - Tevrix AI',
    ogDescription: '90% first-contact resolution, 120+ languages, sub-1-second response. AI customer care for enterprise.',
  },
  '/service/hr-automation': {
    title: 'AI HR Automation - 10× Faster Hiring, Zero HR Headcount | Tevrix AI',
    description: 'Automate full-cycle recruitment and HR operations with Tevrix AI. AI sourcing, screening, scheduling, and onboarding — with zero HR headcount.',
    canonical: 'https://tevrixai.com/service/hr-automation',
    ogTitle: 'AI HR & Talent Ops - Tevrix AI',
    ogDescription: '10× faster hiring cycle. Full-cycle HR automation with AI — from sourcing to onboarding.',
  },
  '/service/financial-analyst': {
    title: 'AI Financial Analyst - 99.8% Accuracy, Automated Bookkeeping | Tevrix AI',
    description: 'Real-time bookkeeping, invoice processing, audit preparation and financial forecasting with Tevrix AI. 99.8% accuracy, 80% cost reduction.',
    canonical: 'https://tevrixai.com/service/financial-analyst',
    ogTitle: 'AI Financial Analyst - Tevrix AI',
    ogDescription: '99.8% accuracy. Automated bookkeeping, invoice processing, and financial forecasting for enterprise.',
  },
  '/service/document-intelligence': {
    title: 'Document Intelligence AI - Process 10M+ Documents Daily | Tevrix AI',
    description: 'Tevrix AI extracts, classifies and routes contracts, compliance docs and reports automatically. 99% extraction accuracy, 10M+ documents processed daily.',
    canonical: 'https://tevrixai.com/service/document-intelligence',
    ogTitle: 'Document Intelligence - Tevrix AI',
    ogDescription: 'Process 10M+ documents daily. AI-powered extraction, classification, and routing for enterprise.',
  },
  '/service/voice-ai': {
    title: 'AI Voice Reception - 10,000+ Simultaneous Calls, 120+ Languages | Tevrix AI',
    description: 'Tevrix AI Voice AI handles inbound and outbound calls with human-level empathy across 120+ languages, 24/7. Handle 10,000+ simultaneous calls.',
    canonical: 'https://tevrixai.com/service/voice-ai',
    ogTitle: 'AI Voice Reception - Tevrix AI',
    ogDescription: '10K+ simultaneous calls. AI voice agents with human-level empathy across 120+ languages.',
  },
  '/service/custom-process': {
    title: 'Custom AI Process Automation - Deploy in 6 Weeks, 3× ROI | Tevrix AI',
    description: 'Tevrix AI architects map and automate your unique business processes with custom AI agents. 6-week average deployment, 3× ROI in year one.',
    canonical: 'https://tevrixai.com/service/custom-process',
    ogTitle: 'Custom Process Design - Tevrix AI',
    ogDescription: 'Bespoke AI agents for your unique workflows. 6-week deployment, 3× ROI in year one.',
  },
  '/privacy': {
    title: 'Privacy Policy | Tevrix AI - India AI BPO Platform',
    description: 'Privacy Policy for Tevrix AI, India\'s AI-native BPO platform replacing business operations with autonomous AI agents.',
    canonical: 'https://tevrixai.com/privacy',
    ogTitle: 'Privacy Policy - Tevrix AI',
    ogDescription: 'Privacy Policy for Tevrix AI — India\'s AI-native BPO platform.',
  },
  '/terms': {
    title: 'Terms of Service | Tevrix AI - India AI BPO Platform',
    description: 'Terms of Service for Tevrix AI, India\'s AI-native BPO platform replacing business operations with autonomous AI agents.',
    canonical: 'https://tevrixai.com/terms',
    ogTitle: 'Terms of Service - Tevrix AI',
    ogDescription: 'Terms of Service for Tevrix AI — India\'s AI-native BPO platform.',
  },
};

function stripAnimationHiding(html) {
  // Framer-motion bakes opacity:0 / transform into SSR output.
  // Google's renderer sees blank content. Strip those initial-state styles
  // so all content is visible in the static HTML.
  return html
    .replace(/style="opacity:\s*0[^"]*"/g, '')
    .replace(/style="([^"]*?)opacity:\s*0;?\s*/g, 'style="$1')
    .replace(/style="([^"]*?)transform:\s*translateY\([^)]+\);?\s*/g, 'style="$1')
    .replace(/style="([^"]*?)transform:\s*translateX\([^)]+\);?\s*/g, 'style="$1')
    .replace(/style="([^"]*?)transform:\s*scale\([^)]+\);?\s*/g, 'style="$1')
    .replace(/style=""\s*/g, '');
}

function injectMeta(html, meta) {
  const { title, description, canonical, ogTitle, ogDescription } = meta;
  const url = canonical;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"[^>]*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"[^>]*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"[^>]*\/>/, `<meta property="og:title" content="${ogTitle}" />`)
    .replace(/<meta property="og:description" content="[^"]*"[^>]*\/>/, `<meta property="og:description" content="${ogDescription}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*"[^>]*\/>/, `<meta name="twitter:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"[^>]*\/>/, `<meta name="twitter:title" content="${ogTitle}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"[^>]*\/>/, `<meta name="twitter:description" content="${ogDescription}" />`);
}

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
const { render } = await import('../dist/server/entry-server.js');

for (const route of routes) {
  try {
    const meta   = PAGE_META[route] || PAGE_META['/'];
    const appHtml = render(route);

    const visibleHtml = stripAnimationHiding(appHtml);
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${visibleHtml}</div>`
    );
    html = injectMeta(html, meta);

    const outDir = route === '/'
      ? distDir
      : resolve(distDir, route.slice(1));

    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html);
    console.log(`  ✓ ${route}  →  ${meta.canonical}`);
  } catch (err) {
    console.error(`  ✗ ${route}: ${err.message}`);
  }
}

console.log('\nPre-render complete.');
