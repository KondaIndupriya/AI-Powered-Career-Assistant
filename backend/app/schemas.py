from pydantic import BaseModel, Field


class InterviewRequest(BaseModel):
    job_role: str = Field(..., min_length=2, max_length=120)
    experience_level: str = Field(..., min_length=2, max_length=80)
    skills: str = Field(..., min_length=2, max_length=1000)
    job_description: str | None = Field(default=None, max_length=5000)


class ResumeAnalysisResponse(BaseModel):
    overall_score: int = Field(..., ge=0, le=100)
    ats_score: int = Field(..., ge=0, le=100)
    strengths: list[str]
    weaknesses: list[str]
    suggested_improvements: list[str]


class InterviewPrepResponse(BaseModel):
    technical_questions: list[str]
    hr_questions: list[str]
    coding_questions: list[str]
    sample_answers: list[str]
    interview_tips: list[str]
