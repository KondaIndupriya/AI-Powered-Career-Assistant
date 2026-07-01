import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-black">CareerAI</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            AI-powered career guidance for resumes, interviews, skill planning, and smarter job search decisions.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">About</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Built for ambitious professionals who want practical, personalized career support.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link to="/resume-review" className="hover:text-white">Resume Review</Link>
            <Link to="/interview-prep" className="hover:text-white">Interview Prep</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <a
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-slate-300 transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
              href="mailto:indupriyakonda1611@gmail.com"
            >
              <Mail className="h-4 w-4 shrink-0 text-blue-200 transition group-hover:text-white" />
              <span className="break-all">indupriyakonda1611@gmail.com</span>
            </a>
            <a
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-slate-300 transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
              href="https://linkedin.com/in/konda-indu-priya"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-blue-200 transition group-hover:text-white" />
              <span>LinkedIn</span>
            </a>
            <a
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-slate-300 transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
              href="https://github.com/KondaIndupriya"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4 shrink-0 text-blue-200 transition group-hover:text-white" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-slate-500">
        Copyright 2026 CareerAI. All rights reserved.
      </div>
    </footer>
  );
}
