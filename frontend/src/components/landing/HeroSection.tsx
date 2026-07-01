import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Brain, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  function scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_15%_15%,_rgba(219,234,254,0.95),_transparent_35%),radial-gradient(circle_at_85%_20%,_rgba(224,231,255,0.8),_transparent_32%),linear-gradient(180deg,_#ffffff,_#f8fafc)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="section-shell relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            AI guidance for every career move
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Build a Smarter Path to Your Dream Career
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CareerAI combines resume intelligence, interview coaching, and personalized roadmaps to help you make
            confident moves toward better opportunities.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/resume-review" className="primary-button">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button type="button" className="secondary-button" onClick={scrollToFeatures}>
              Learn More
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl animate-float"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85 }}
        >
          <div className="glass-card relative p-3 sm:p-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-300">AI Career Console</p>
                  <p className="mt-1 text-xs text-slate-400">Live guidance preview</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">Active</span>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: FileText, title: 'Resume Score', value: '92%', color: 'from-blue-400 to-cyan-300' },
                  { icon: Brain, title: 'Skill Match', value: '8.7/10', color: 'from-violet-400 to-fuchsia-300' },
                  { icon: CheckCircle2, title: 'Next Best Step', value: 'Portfolio Story', color: 'from-indigo-400 to-blue-300' },
                ].map(({ icon: Icon, title, value, color }) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                        <span className="text-sm font-semibold text-slate-200">{title}</span>
                      </div>
                      <span className="text-lg font-black text-white">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
