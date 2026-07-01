import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type InsightCardProps = {
  title: string;
  items: string[];
  icon: LucideIcon;
};

export default function InsightCard({ title, items, icon: Icon }: InsightCardProps) {
  return (
    <motion.article
      className="glass-card p-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
