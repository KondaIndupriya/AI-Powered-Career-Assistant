import { ArrowRight, Menu, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'About', to: '/#about' },
  { label: 'Resume Review', to: '/resume-review' },
  { label: 'Interview Prep', to: '/interview-prep' },
  { label: 'Contact', to: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleAnchor(to: string) {
    setOpen(false);
    if (to.includes('#')) {
      const id = to.split('#')[1];
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-soft">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="text-base font-bold tracking-normal text-slate-950">CareerAI</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => handleAnchor(item.to)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 hover:text-slate-950 ${
                  isActive && !item.to.includes('#') ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link to="/resume-review" className="primary-button hidden min-h-10 px-4 py-2 lg:inline-flex">
          Get started <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => handleAnchor(item.to)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
