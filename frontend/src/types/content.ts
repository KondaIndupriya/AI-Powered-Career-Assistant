import type { LucideIcon } from 'lucide-react';

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

export type Testimonial = {
  name: string;
  role: string;
  feedback: string;
};
