# AI-Powered Career Assistant

A professional career assistant web application built with React, Vite, Tailwind CSS, FastAPI, and Google Gemini.

## Project Structure

```text
frontend/
backend/
```

## Features

- Career path recommendations based on goals, skills, and experience
- Resume feedback with actionable improvements
- Interview question generation
- Clean blue and white responsive UI
- FastAPI backend with Gemini integration

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Add your Gemini API key to `backend/.env`.

```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and expects the API at `http://localhost:8000`.

