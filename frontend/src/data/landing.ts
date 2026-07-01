import {
  Bot,
  BrainCircuit,
  ClipboardCheck,
  FileSearch,
  MessageSquareText,
  Mic,
  Sparkles,
  Target,
} from 'lucide-react';
import type { Feature, Stat, Testimonial } from '../types/content';

export const features: Feature[] = [
  {
    title: 'Resume Analysis',
    description: 'Get clear feedback on structure, impact, keywords, and role alignment.',
    icon: FileSearch,
  },
  {
    title: 'ATS Score Checker',
    description: 'Understand how your resume performs against modern screening systems.',
    icon: ClipboardCheck,
  },
  {
    title: 'Interview Preparation',
    description: 'Practice targeted questions, answer frameworks, and role-specific scenarios.',
    icon: Mic,
  },
  {
    title: 'Skill Gap Analysis',
    description: 'Identify the missing capabilities that matter most for your next role.',
    icon: BrainCircuit,
  },
  {
    title: 'Career Chat Assistant',
    description: 'Ask for guidance any time, from job search strategy to offer negotiation.',
    icon: MessageSquareText,
  },
];

export const stats: Stat[] = [
  { label: 'Resumes Reviewed', value: 1000, suffix: '+' },
  { label: 'ATS Improvement', value: 95, suffix: '%' },
  { label: 'AI Assistance', value: 24, suffix: '/7' },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Maya Chen',
    role: 'Product Analyst',
    feedback: 'The resume review helped me reposition my experience and land interviews within two weeks.',
  },
  {
    name: 'Jordan Ellis',
    role: 'Software Engineer',
    feedback: 'The interview prep made my next steps obvious. It felt personal, practical, and focused.',
  },
  {
    name: 'Priya Raman',
    role: 'MBA Candidate',
    feedback: 'Interview prep gave me stronger stories and the confidence to answer strategically.',
  },
];

export const aboutHighlights = [
  { title: 'Personalized Guidance', icon: Sparkles },
  { title: 'Resume Optimization', icon: Target },
  { title: 'Interview Readiness', icon: Bot },
];
