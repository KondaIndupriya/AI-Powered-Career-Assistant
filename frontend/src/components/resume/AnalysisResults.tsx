import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import type { ResumeAnalysis } from '../../services/resumeAnalysis';
import InsightCard from './InsightCard';
import ScoreCard from './ScoreCard';

type AnalysisResultsProps = {
  analysis: ResumeAnalysis;
};

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <section className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <ScoreCard label="Overall Score" score={analysis.overall_score} accent="from-blue-300 to-cyan-300" />
        <ScoreCard label="ATS Score" score={analysis.ats_score} accent="from-violet-300 to-fuchsia-300" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <InsightCard title="Strengths" items={analysis.strengths} icon={CheckCircle2} />
        <InsightCard title="Weaknesses" items={analysis.weaknesses} icon={AlertTriangle} />
        <InsightCard title="Suggested Improvements" items={analysis.suggested_improvements} icon={Lightbulb} />
      </div>
    </section>
  );
}
