import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

export default function CtaSection() {
  return (
    <AnimatedSection className="section-shell">
      <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-8 text-center shadow-xl sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_35%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-normal text-white sm:text-5xl">Ready to Accelerate Your Career?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200">
            Start with a resume analysis and get immediate, practical recommendations for your next opportunity.
          </p>
          <Link to="/resume-review" className="secondary-button mt-8 border-white/30 bg-white text-blue-700">
            Start Resume Analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
