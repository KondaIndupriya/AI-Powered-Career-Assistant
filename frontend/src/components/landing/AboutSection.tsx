import { aboutHighlights } from '../../data/landing';
import AnimatedSection from './AnimatedSection';

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="section-eyebrow">About</p>
        <h2 className="section-title">A smarter mission for modern career growth.</h2>
        <p className="section-copy">
          Our mission is to make high-quality career coaching accessible, actionable, and deeply personal. The platform
          helps professionals understand where they stand, what to improve, and how to present their value with
          confidence.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {aboutHighlights.map(({ title, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 text-blue-600" />
              <h3 className="mt-4 text-base font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clear recommendations powered by AI and shaped around your goals, role, and current experience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
