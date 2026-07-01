import json
from contextlib import asynccontextmanager
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .gemini_service import create_gemini_client, generate_career_content
from .resume_parser import extract_resume_text
from .schemas import InterviewPrepResponse, InterviewRequest, ResumeAnalysisResponse

load_dotenv()

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "https://ai-powered-career-assistant-two.vercel.app",
]


@asynccontextmanager
async def lifespan(app_instance: FastAPI):
    try:
        app_instance.state.gemini_client = create_gemini_client()
        app_instance.state.gemini_ready = True
    except HTTPException as exc:
        app_instance.state.gemini_client = None
        app_instance.state.gemini_ready = False
        app_instance.state.gemini_error = exc.detail
    yield


app = FastAPI(
    title="AI-Powered Career Assistant API",
    description="Career guidance, resume review, and interview preparation powered by Gemini.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


def get_gemini_client(request: Request) -> Any:
    client = getattr(request.app.state, "gemini_client", None)
    if client is None:
        detail = getattr(
            request.app.state,
            "gemini_error",
            "Gemini client is not available. Check GEMINI_API_KEY in backend/.env.",
        )
        raise HTTPException(status_code=503, detail=detail)
    return client


@app.post("/api/resume-review", response_model=ResumeAnalysisResponse)
async def resume_review(
    request: Request,
    resume: UploadFile = File(...),
    target_role: str = Form("General professional role"),
) -> ResumeAnalysisResponse:
    resume_text = await extract_resume_text(resume)
    prompt = f"""
You are an expert resume reviewer for modern technology and business roles.
Review this resume for the target role: {target_role}

Resume:
{resume_text}

Return only valid JSON with this exact shape:
{{
  "overall_score": 0,
  "ats_score": 0,
  "strengths": ["short strength"],
  "weaknesses": ["short weakness"],
  "suggested_improvements": ["short improvement"]
}}

Score from 0 to 100. Include 3 to 5 items in each list. Do not wrap the JSON in markdown.
"""
    raw_result = generate_career_content(get_gemini_client(request), prompt)
    try:
        parsed = json.loads(raw_result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip())
        return ResumeAnalysisResponse(**parsed)
    except Exception as exc:
        raise HTTPException(status_code=502, detail="AI response could not be parsed as resume analysis JSON.") from exc


@app.post("/api/interview-prep", response_model=InterviewPrepResponse)
def interview_prep(payload: InterviewRequest, request: Request) -> InterviewPrepResponse:
    prompt = f"""
You are a senior interview coach and hiring manager.
Generate practical interview preparation material for:

Job role: {payload.job_role}
Experience level: {payload.experience_level}
Skills: {payload.skills}
Optional job description: {payload.job_description or "Not provided"}

Return only valid JSON with this exact shape:
{{
  "technical_questions": ["short technical question"],
  "hr_questions": ["short HR or behavioral question"],
  "coding_questions": ["short coding question, or practical technical exercise if coding is not applicable"],
  "sample_answers": ["sample answer with STAR or structured reasoning"],
  "interview_tips": ["short actionable interview tip"]
}}

Include 5 technical questions, 5 HR questions, 3 coding questions if the role is technical.
If coding is not applicable, include 2 practical scenario exercises instead.
Include 4 sample answers and 5 interview tips.
Do not wrap the JSON in markdown.
"""
    raw_result = generate_career_content(get_gemini_client(request), prompt)
    try:
        parsed = json.loads(raw_result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip())
        return InterviewPrepResponse(**parsed)
    except Exception as exc:
        raise HTTPException(status_code=502, detail="AI response could not be parsed as interview prep JSON.") from exc
