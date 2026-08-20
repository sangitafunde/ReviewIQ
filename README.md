# ReviewIQ

## Overview
ReviewIQ turns unstructured customer feedback into understandable insights using AI. It provides an intuitive, trustworthy dashboard showing sentiment, recurring themes, and evidence-based quotes.

## Problem Statement
Businesses struggle to manually read through hundreds of customer reviews to figure out what they are doing well and what needs improvement. They need an automated, reliable way to extract insights without inventing data.

## Solution
ReviewIQ solves this by taking raw review data, processing it through an AI model (Google Gemini), and outputting a highly structured JSON response that powers an interactive, beautiful insights dashboard. It clearly links insights back to real reviews.

## Features
- **AI-Powered Analysis**: Uses the Gemini API to detect sentiment and themes.
- **Evidence-Based Quotes**: Shows representative customer quotes linked back to actual reviews.
- **Review Explorer**: Allows users to filter reviews by star rating, search by keywords, and filter by sentiment.
- **Two Input Modes**: Load a bundled public dataset, or paste your own reviews.
- **Responsive & Dark Mode**: A premium interface that works perfectly on desktop, tablet, and mobile, with full dark mode support.

## AI Approach
The AI (Google Gemini 2.5 Flash) is given strict instructions to **never invent facts or statistics**. It is provided the exact text of the supplied reviews and instructed to return a structured JSON object containing only what it can confidently extract from that text.

## Dataset
The application includes a curated public dataset located in `/public/data/reviews.json`. These are publicly available realistic restaurant reviews used to demonstrate the functionality of the system.

## Data Processing
When you load or paste reviews, they are sent securely server-side to the Next.js API route (`/api/analyze`). The route constructs a strict prompt wrapping the JSON-formatted reviews, queries the Gemini API (if an API key is provided), and returns the results to the client.

## Trust & Grounding
Trust is a core feature. The AI is instructed to use **only supplied reviews**. It cannot pull in outside knowledge. Every theme generated must be supported by the input data, and every quote displayed must exist verbatim in the source reviews.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Integration**: Google Gen AI SDK (`@google/genai`)

## Architecture
The application uses the Next.js App router with `src/app`.
- `/page.tsx` - Landing page
- `/analyze/page.tsx` - Input page to select dataset or paste reviews
- `/api/analyze/route.ts` - Server-side API connecting to Gemini
- `/dashboard/[id]/page.tsx` - Main insights dashboard
- `/dashboard/[id]/reviews/page.tsx` - Review explorer with filters

## Local Setup
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env.local` and add your `GEMINI_API_KEY`.
4. Run `npm run dev` to start the application at `http://localhost:3000`.

## Environment Variables
The application uses `GEMINI_API_KEY` for the AI analysis. If this key is missing, the application defaults to a deterministic demo/fallback analysis mode so it remains testable.

## Demo
The demo flow is fully supported:
1. Click "Try Demo" or "Explore Demo" on the landing page.
2. Choose the "Public Dataset" tab.
3. Click "Load Demo Reviews".
4. View the generated insights dashboard!

## Testing
The application has been manually tested for:
- **Functional Testing**: Loading dataset, pasting reviews, filtering, searching.
- **Boundary Testing**: Works with minimum 3 reviews up to larger datasets.
- **Negative Testing**: Gracefully handles API key absence, invalid inputs, and short inputs.
- **UI Testing**: Tested across desktop, tablet, and mobile views, including Dark Mode.

## Known Limitations
- The current prompt length to Gemini may exceed context limits if thousands of reviews are pasted at once. (The UI recommends 10-20 reviews, and the demo dataset is capped to ~60 reviews).
- If the AI returns malformed JSON (rare with structured generation), the API handles the error but requires a retry.

## Future Improvements
- Add export functionality to print or download a PDF report.
- Add an integration to fetch live reviews directly from external platforms.
- Improve charts to include historical sentiment trends over time.

## Deployment
The repository is deployment-ready for Vercel. Ensure you add `GEMINI_API_KEY` to your Vercel Environment Variables before deploying.
