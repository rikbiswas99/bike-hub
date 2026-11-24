# Setup Guide

## Requirements
Python 3.10+, Node.js 18+, PostgreSQL (needed later; the health check works without it).

## Backend
```bash
cd backend
python -m venv venv
# Windows:   venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # Windows: copy .env.example .env
uvicorn app.main:app --reload
```
Open http://localhost:8000/docs

## Frontend
```bash
cd frontend
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev
```
Open http://localhost:5173
