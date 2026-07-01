import { BrainCircuit, Code2, Lightbulb, MessageCircleQuestion, UserRoundCheck } from 'lucide-react';
import type { InterviewPrepResponse } from '../../services/interviewPrep';
import InterviewSectionCard from './InterviewSectionCard';

type InterviewResultsProps = {
  results: InterviewPrepResponse;
};

export default function InterviewResults({ results }: InterviewResultsProps) {
  return (
    <section className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <InterviewSectionCard title="Technical Interview Questions" items={results.technical_questions} icon={BrainCircuit} />
        <InterviewSectionCard title="HR Interview Questions" items={results.hr_questions} icon={UserRoundCheck} />
      </div>
      <InterviewSectionCard title="Coding Questions" items={results.coding_questions} icon={Code2} />
      <InterviewSectionCard title="Sample Answers" items={results.sample_answers} icon={MessageCircleQuestion} />
      <InterviewSectionCard title="Interview Tips" items={results.interview_tips} icon={Lightbulb} />
    </section>
  );
}
