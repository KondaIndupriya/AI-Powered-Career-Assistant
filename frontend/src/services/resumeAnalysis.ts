export type ResumeAnalysis = {
  overall_score: number;
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  suggested_improvements: string[];
};

const API_URL = 'https://ai-powered-career-assistant-lrpl.onrender.com/api/resume-review';

export async function analyzeResume(file: File, targetRole: string): Promise<ResumeAnalysis> {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('target_role', targetRole || 'General professional role');

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = typeof payload?.detail === 'string' ? payload.detail : 'Resume analysis failed. Please try again.';
    throw new Error(detail);
  }

  return payload as ResumeAnalysis;
}
