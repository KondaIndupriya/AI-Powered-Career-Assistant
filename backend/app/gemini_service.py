import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import HTTPException
from google import genai
from google.genai import errors as genai_errors

load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")


def create_gemini_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=503,
            detail="Gemini API key is not configured. Add GEMINI_API_KEY to backend/.env.",
        )
    return genai.Client(api_key=api_key)


def generate_career_content(client: genai.Client, prompt: str) -> str:
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
        )
    except genai_errors.APIError as exc:
        status_code = 401 if getattr(exc, "code", None) in {400, 401, 403} else 502
        raise HTTPException(status_code=status_code, detail=f"Gemini API error: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Gemini request failed: {exc}") from exc

    text = getattr(response, "text", None)
    if not text:
        raise HTTPException(status_code=502, detail="Gemini returned an empty response.")
    return text.strip()



