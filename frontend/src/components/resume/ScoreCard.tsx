import { motion } from 'framer-motion';

type ScoreCardProps = {
  label: string;
  score: number;
  accent: string;
};

export default function ScoreCard({ label, score, accent }: ScoreCardProps) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  return (
    <motion.div className="glass-card flex items-center justify-between gap-5 p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-lg font-bold text-slate-950">{score >= 80 ? 'Excellent' : score >= 60 ? 'Good foundation' : 'Needs attention'}</p>
        <p className="mt-1 text-xs text-slate-500">AI assessment score</p>
      </div>
      <div className="relative h-28 w-28 shrink-0">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="7" />
          <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="7" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference * (1 - score / 100) }} transition={{ duration: 1.1 }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-950">{score}<span className="text-xs text-slate-400">%</span></div>
      </div>
    </motion.div>
  );
}
