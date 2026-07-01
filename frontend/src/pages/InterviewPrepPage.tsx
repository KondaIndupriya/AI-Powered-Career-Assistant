import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Mic } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import InterviewForm from '../components/interview/InterviewForm';
import InterviewResults from '../components/interview/InterviewResults';
import { generateInterviewPrep, type InterviewPrepRequest, type InterviewPrepResponse } from '../services/interviewPrep';

const initialForm: InterviewPrepRequest = {
  job_role: '',
  experience_level: 'Entry Level',
  skills: '',
  job_description: '',
};

export default function InterviewPrepPage() {
  const [form, setForm] = useState<InterviewPrepRequest>(initialForm);
  const [results, setResults] = useState<InterviewPrepResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function updateForm(field: keyof InterviewPrepRequest, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setResults(null);

    try {
      const response = await generateInterviewPrep({
        ...form,
        job_description: form.job_description?.trim() || undefined,
      });
      setResults(response);
      setSuccess('Interview preparation generated successfully.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to generate interview prep.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,_rgba(219,234,254,0.8),_transparent_32%),linear-gradient(180deg,_#f8fafc,_#ffffff)]">
      <section className="section-shell min-h-[calc(100vh-80px)]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-soft">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">AI Interview Prep</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Generate targeted technical, HR, coding, and strategy questions with sample answers and practical tips for
            your next interview.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <InterviewForm form={form} loading={loading} onChange={updateForm} onSubmit={handleSubmit} />

            {error && (
              <div role="alert" className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div role="status" className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                {success}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {loading && (
              <div className="glass-card min-h-[420px] p-8">
                <div>
                  <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
                  <h2 className="mt-5 text-center text-xl font-bold text-slate-950">Generating tailored questions</h2>
                  <p className="mx-auto mt-3 max-w-md text-center text-sm leading-7 text-slate-500">
                    Gemini 2.5 Flash is preparing role-specific interview material.
                  </p>
                  <div className="mt-8 grid gap-3">{[1,2,3,4].map((item) => <div key={item} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
                </div>
              </div>
            )}

            {!loading && results && <InterviewResults results={results} />}

            {!loading && !results && (
              <div className="glass-card flex min-h-[420px] items-center justify-center border-dashed p-8 text-center">
                <div>
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100"><Mic className="h-6 w-6 text-slate-400" /></div>
                  <h2 className="text-xl font-bold text-slate-950">Your prep plan will appear here</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                    Add your role, level, skills, and optional job description to generate a complete interview prep
                    guide.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
