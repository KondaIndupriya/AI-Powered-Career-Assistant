export type InterviewPrepRequest = {
  job_role: string;
  experience_level: string;
  skills: string;
  job_description?: string;
};

export type InterviewPrepResponse = {
  technical_questions: string[];
  hr_questions: string[];
  coding_questions: string[];
  sample_answers: string[];
  interview_tips: string[];
};

const API_URL = 'https://ai-powered-career-assistant-lrpl.onrender.com/api/interview-prep';

export async function generateInterviewPrep(payload: InterviewPrepRequest): Promise<InterviewPrepResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = typeof data?.detail === 'string' ? data.detail : 'Unable to generate interview prep.';
    throw new Error(detail);
  }

  return data as InterviewPrepResponse;
}
