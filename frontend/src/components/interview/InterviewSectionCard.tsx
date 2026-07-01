import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type InterviewSectionCardProps = {
  title: string;
  items: string[];
  icon: LucideIcon;
};

export default function InterviewSectionCard({ title, items, icon: Icon }: InterviewSectionCardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function copyItem(item: string, index: number) {
    await navigator.clipboard.writeText(item);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1400);
  }

  const isAnswerSection = title === 'Sample Answers';
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
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      </div>

      <ol className="space-y-3">
        {items.map((item, index) => (
          <li key={`${title}-${item}`} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-white px-2 text-xs font-bold text-blue-600 shadow-sm">{index + 1}</span>
              <button type="button" className="flex-1 text-left" onClick={() => isAnswerSection && setOpenIndex(openIndex === index ? null : index)}>
                <p className={isAnswerSection && openIndex !== index ? 'line-clamp-2' : ''}>{item}</p>
              </button>
              <button type="button" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-blue-600" onClick={() => copyItem(item, index)} aria-label={`Copy item ${index + 1}`}>
                {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              {isAnswerSection && <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition ${openIndex === index ? 'rotate-180' : ''}`} />}
            </div>
            <AnimatePresence>{isAnswerSection && openIndex === index && <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500">Use this as a framework and personalize it with your own experience and outcomes.</motion.div>}</AnimatePresence>
          </li>
        ))}
      </ol>
    </motion.article>
  );
}
