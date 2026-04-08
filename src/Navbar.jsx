import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const logo = '/logo.png';

const NAV_LINKS = [
  { label: 'Platform',   href: '/',         section: '' },
  { label: 'AI BPO',    href: '/ai-bpo',    section: '' },
  { label: 'Solutions',  href: '/#solutions', section: 'solutions' },
  { label: 'India',      href: '/#india',    section: 'india' },
  { label: 'Contact',    href: '/#contact',  section: 'contact' },
];

export default function Navbar({ onDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleAnchor = (e, link) => {
    if (link.section) {
      e.preventDefault();
      if (location.pathname !== '/') {
        window.location.href = link.href;
        return;
      }
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 overflow-hidden ${scrolled ? 'glass-nav' : ''}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[68px]">
        {/* Logo Spacer */}
        <div className="w-[32px] md:w-[80px]" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            link.section ? (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleAnchor(e, link)}
                className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-black/[0.03] rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA — ALWAYS VISIBLE */}
        <div className="flex items-center">
          <button onClick={onDemo} className="btn-primary text-[12px] md:text-[13px] py-2 md:py-2.5 px-4 md:px-6 rounded-[10px]">
            Book a Demo
          </button>
        </div>
      </nav>
    </header>
  );
}
