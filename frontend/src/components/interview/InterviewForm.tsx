import { BriefcaseBusiness, ChevronRight, Layers3, Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import type { InterviewPrepRequest } from '../../services/interviewPrep';

type InterviewFormProps = {
  form: InterviewPrepRequest;
  loading: boolean;
  onChange: (field: keyof InterviewPrepRequest, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function InterviewForm({ form, loading, onChange, onSubmit }: InterviewFormProps) {
  return (
    <form className="glass-card h-fit p-5 sm:p-6" onSubmit={onSubmit}>
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
        <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Step 1 of 2</p><h2 className="mt-1 text-lg font-bold text-slate-950">Build your interview profile</h2></div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><BriefcaseBusiness className="h-5 w-5" /></span>
      </div>
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-semibold text-slate-500"><span className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white">Profile</span><ChevronRight className="h-4 w-4"/><span className="rounded-lg bg-slate-100 px-3 py-2 text-center">AI results</span></div>
      <div className="grid gap-5">
        <label className="block text-sm font-semibold text-slate-700">
          Job Role
          <input
            className="field"
            value={form.job_role}
            onChange={(event) => onChange('job_role', event.target.value)}
            placeholder="Frontend Developer, Data Analyst, Product Manager..."
            disabled={loading}
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Experience Level
          <select
            className="field"
            value={form.experience_level}
            onChange={(event) => onChange('experience_level', event.target.value)}
            disabled={loading}
            required
          >
            <option>Student</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior</option>
            <option>Career Switcher</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Skills
          <textarea
            className="field min-h-28 resize-y leading-6"
            value={form.skills}
            onChange={(event) => onChange('skills', event.target.value)}
            placeholder="React, TypeScript, REST APIs, SQL, system design..."
            disabled={loading}
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Job Description <span className="font-medium text-slate-400">(optional)</span>
          <textarea
            className="field min-h-36 resize-y leading-6"
            value={form.job_description ?? ''}
            onChange={(event) => onChange('job_description', event.target.value)}
            placeholder="Paste the job description for more targeted questions..."
            disabled={loading}
          />
        </label>
      </div>

      <button className="primary-button mt-6 w-full" type="submit" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers3 className="h-4 w-4" />}
        {loading ? 'Generating Prep...' : 'Generate Interview Prep'}
      </button>
    </form>
  );
}
