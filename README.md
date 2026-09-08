# Wedding Tabs Studio — Full Project

Built per the architecture reference: React+Vite+Tailwind frontend, FastAPI+Supabase backend.

## Setup

### 1. Supabase (Database + Auth + Storage)
1. Create a free project at supabase.com
2. Go to SQL Editor → run `backend/schema.sql`
3. Go to Storage → create a new **public** bucket named `gallery`
4. Go to Authentication → Users → manually add one admin user (email + password) — no public signup
5. Go to Settings → API Keys → copy the **Project URL** and **Publishable key**

### 2. Backend (FastAPI on Render)
1. `cd backend`, create `.env` from `.env.example`, fill in Supabase URL/Key
2. Locally: `python -m venv venv && venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. `pip install -r requirements.txt`
4. Run locally: `uvicorn main:app --reload`
5. Deploy to Render: New Web Service → Root Directory `backend` → Build: `pip install -r requirements.txt` → Start: `uvicorn main:app --host 0.0.0.0 --port 10000` → add env vars → deploy
6. Note the live URL (e.g. `https://xxx.onrender.com`)

### 3. Frontend (React on Vercel)
1. `cd frontend`, create `.env` from `.env.example`, fill in Supabase URL/Key + the Render backend URL
2. `npm install`
3. Add real images: `public/logo.jpeg` (Wedding Tabs logo) and `public/hero-wedding.jpg` (hero banner)
4. Run locally: `npm run dev`
5. Deploy to Vercel: New Project → Root Directory `frontend` → Framework: Vite → add env vars → deploy
6. **Important:** update `backend/main.py`'s `allow_origins` list with the real Vercel URL, then redeploy the backend

### 4. Domain
Point your existing domain's DNS to Vercel, then add it in Vercel project settings.

## Notes
- Backend free tier (Render) sleeps after 15 min idle — first request after a break takes 30-60s to wake up. Normal, not a bug.
- Admin dashboard: `/admin/login` → log in with the Supabase user you created → `/admin/dashboard`
- Everything free-tier: Vercel (hosting), Render (backend), Supabase (DB/Auth/Storage) — fine for the current scale (10-20 concurrent users)
