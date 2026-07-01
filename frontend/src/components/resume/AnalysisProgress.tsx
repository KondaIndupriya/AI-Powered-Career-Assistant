import { Loader2 } from 'lucide-react';

type AnalysisProgressProps = {
  progress: number;
};

export default function AnalysisProgress({ progress }: AnalysisProgressProps) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <div>
          <p className="text-sm font-bold text-slate-900">Analyzing resume</p>
          <p className="text-xs text-slate-600">Extracting content, checking ATS signals, and generating guidance.</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
