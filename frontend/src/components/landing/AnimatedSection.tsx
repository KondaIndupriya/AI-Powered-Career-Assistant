import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
