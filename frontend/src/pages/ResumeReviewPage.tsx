import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, FileUp } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import AnalysisProgress from '../components/resume/AnalysisProgress';
import AnalysisResults from '../components/resume/AnalysisResults';
import FileDropzone from '../components/resume/FileDropzone';
import { analyzeResume, type ResumeAnalysis } from '../services/resumeAnalysis';

export default function ResumeReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    setProgress(12);
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 11, 88));
    }, 650);
    return () => window.clearInterval(timer);
  }, [loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('Please choose a PDF or DOCX resume before analyzing.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setAnalysis(null);

    try {
      const result = await analyzeResume(file, targetRole);
      setProgress(100);
      setAnalysis(result);
      setSuccess('Resume analysis completed successfully.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to analyze resume.');
      setProgress(0);
    } finally {
      window.setTimeout(() => setLoading(false), 350);
    }
  }

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,_rgba(219,234,254,0.8),_transparent_32%),linear-gradient(180deg,_#f8fafc,_#ffffff)]">
      <section className="section-shell min-h-[calc(100vh-80px)]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-soft">
            <FileUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">AI Resume Analysis</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Upload your resume to receive AI-powered scoring, ATS feedback, strengths, weaknesses, and practical
            improvements.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card h-fit p-5 sm:p-6"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="mb-5 block text-sm font-semibold text-slate-700">
              Target role
              <input
                className="field"
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder="Frontend Developer, Data Analyst, Product Manager..."
                disabled={loading}
              />
            </label>

            <FileDropzone file={file} onFileChange={setFile} disabled={loading} />

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

            {loading && <div className="mt-5"><AnalysisProgress progress={progress} /></div>}

            <button type="submit" className="primary-button mt-6 w-full" disabled={loading}>
              {loading ? 'Analyzing...' : 'Upload & Analyze'}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {analysis ? (
              <AnalysisResults analysis={analysis} />
            ) : (
              <div className="glass-card flex min-h-[420px] items-center justify-center border-dashed p-8 text-center">
                <div>
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100"><FileUp className="h-6 w-6 text-slate-400" /></div>
                  <h2 className="text-xl font-bold text-slate-900">Your analysis will appear here</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                    The results are generated from your uploaded resume by the FastAPI and Gemini backend.
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
