import AboutSection from '../components/landing/AboutSection';
import CtaSection from '../components/landing/CtaSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <div className="bg-white">
        <FeaturesSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </>
  );
}
