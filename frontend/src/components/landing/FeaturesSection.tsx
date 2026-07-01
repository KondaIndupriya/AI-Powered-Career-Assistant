import { motion } from 'framer-motion';
import { features } from '../../data/landing';
import AnimatedSection from './AnimatedSection';

export default function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="section-shell">
      <p className="section-eyebrow">Features</p>
      <h2 className="section-title">Everything you need to move with clarity.</h2>
      <p className="section-copy">
        From application materials to interview confidence, CareerAI turns scattered career questions into focused
        action.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, icon: Icon }, index) => (
          <motion.article
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
}
