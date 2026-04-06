import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Platform',   href: '/',         section: '' },
  { label: 'AI BPO',    href: '/ai-bpo',    section: '' },
  { label: 'Solutions',  href: '/#solutions', section: 'solutions' },
  { label: 'India',      href: '/#india',    section: 'india' },
  { label: 'Contact',    href: '/#contact',  section: 'contact' },
];

export default function Navbar({ onDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      setMobileOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : ''}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[68px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[10px] bg-amber-500 flex items-center justify-center shadow-[0_4px_14px_rgba(245,158,11,0.4)] group-hover:shadow-[0_4px_24px_rgba(245,158,11,0.6)] transition-all duration-300">
            <Zap className="text-white w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-slate-900">
            TEVRIX<span className="text-amber-500">AI</span>
          </span>
        </Link>

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

        {/* Desktop CTA — just "Book a Demo" */}
        <div className="hidden md:flex items-center">
          <button onClick={onDemo} className="btn-primary text-[13px] py-2.5 px-6 rounded-[10px]">
            Book a Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-black/[0.05] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-black/[0.06] px-6 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            link.section ? (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleAnchor(e, link)}
                className="block px-4 py-3 text-[14px] font-medium text-slate-600 hover:text-slate-900 hover:bg-black/[0.03] rounded-xl transition-all duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-[14px] font-medium text-slate-600 hover:text-slate-900 hover:bg-black/[0.03] rounded-xl transition-all"
              >
                {link.label}
              </Link>
            )
          ))}
          <div className="pt-3">
            <button
              onClick={() => { setMobileOpen(false); onDemo(); }}
              className="btn-primary w-full justify-center text-[14px]"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
