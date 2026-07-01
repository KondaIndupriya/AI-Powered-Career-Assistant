from io import BytesIO

from docx import Document
from fastapi import HTTPException, UploadFile
from pypdf import PdfReader

ALLOWED_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


async def extract_resume_text(file: UploadFile) -> str:
    content_type = file.content_type or ""
    filename = file.filename or "resume"
    extension = filename.lower().rsplit(".", 1)[-1] if "." in filename else ""

    if content_type not in ALLOWED_TYPES and extension not in {"pdf", "docx"}:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX resumes are supported.")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    if len(content) > 8 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Resume file is too large. Please upload a file under 8 MB.")

    try:
        if extension == "pdf" or content_type == "application/pdf":
            return _extract_pdf_text(content)
        return _extract_docx_text(content)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read resume content: {exc}") from exc


def _extract_pdf_text(content: bytes) -> str:
    reader = PdfReader(BytesIO(content))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return _clean_text(text)


def _extract_docx_text(content: bytes) -> str:
    document = Document(BytesIO(content))
    text = "\n".join(paragraph.text for paragraph in document.paragraphs)
    return _clean_text(text)


def _clean_text(text: str) -> str:
    cleaned = "\n".join(line.strip() for line in text.splitlines() if line.strip())
    if len(cleaned) < 100:
        raise HTTPException(
            status_code=400,
            detail="Could not extract enough text from the resume. Please upload a text-based PDF or DOCX.",
        )
    return cleaned[:12000]
