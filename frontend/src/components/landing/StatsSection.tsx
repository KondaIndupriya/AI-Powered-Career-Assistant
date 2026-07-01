import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '../../data/landing';
import AnimatedSection from './AnimatedSection';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => setDisplay(Math.round(latest)));
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <AnimatedSection className="section-shell">
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, suffix }) => (
          <motion.div
            key={label}
            className="border-b border-white/10 p-8 text-center sm:border-r lg:border-b-0"
            whileHover={{ y: -6 }}
          >
            <p className="text-4xl font-black text-white">
              <Counter value={value} suffix={suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
