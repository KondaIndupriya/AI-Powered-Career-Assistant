import { Quote } from 'lucide-react';
import { testimonials } from '../../data/landing';
import AnimatedSection from './AnimatedSection';

export default function TestimonialsSection() {
  return (
    <AnimatedSection className="section-shell">
      <p className="section-eyebrow">Testimonials</p>
      <h2 className="section-title">Career support that feels specific.</h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map(({ name, role, feedback }) => (
          <article key={name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Quote className="h-7 w-7 text-blue-600" />
            <p className="mt-5 text-sm leading-7 text-slate-600">"{feedback}"</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {name.split(' ').map((part) => part[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-slate-950">{name}</h3>
                <p className="text-sm text-slate-500">{role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
