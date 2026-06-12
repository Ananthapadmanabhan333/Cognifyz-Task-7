# InternHub Registration Portal - Task 7 Upgrade

This is a complete full-stack application built for Cognifyz Technologies Full Stack Development Internship - Task 7. It demonstrates advanced API usage, external API integrations, and modern enterprise-grade architecture.

## Features Included

- **OAuth Authentication:** Sign in securely using Google or GitHub.
- **External API Integration:**
  - **GitHub API:** Search profiles, view analytics, top languages, and repositories.
  - **OpenAI/Gemini API:** AI-powered Resume Analyzer that extracts skills and scores your resume.
- **Internship Recommendation Engine:** Rule-based career suggestions based on user skills.
- **Advanced API Features:** Rate limiting (max 100 reqs/15m), global error handling.
- **Caching System:** Redis-based API response caching for lightning-fast subsequent loads.
- **API Monitoring Dashboard:** Visualizes total requests, cache hits, errors, and average response times.
- **Swagger Documentation:** Auto-generated API docs available at `/api-docs`.

## Technology Stack

**Frontend:**
- React.js (Vite)
- Bootstrap 5 & React-Bootstrap
- Axios
- Chart.js

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose)
- Redis
- Passport.js (OAuth 2.0)
- JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Redis Server (Local or Cloud)
- API Keys: GitHub OAuth Apps, Google OAuth Credentials, OpenAI/Gemini API Key.

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Open `backend/.env` and fill in your connection strings and API keys.

4. Start the server:
   ```bash
   npm run dev
   ```
   (Server runs on http://localhost:5000)

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```
   (App runs on http://localhost:5173)

## API Documentation

Once the backend is running, you can access the interactive Swagger documentation at:
`http://localhost:5000/api-docs`

Built by Ananthapadmanabhan 

