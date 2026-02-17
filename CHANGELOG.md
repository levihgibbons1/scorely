# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### Added

- **Homepage** — Landing page with hero section, animated background, trending agents showcase, features section, and CTA
- **Trending Agents** — Displays top 3 agents by community upvotes, fetched from Supabase in real-time
- **Agent Submission** — Full submit form with name, description, category, GitHub URL, and MCP endpoint fields, with Zod validation and live preview
- **Agent Detail Page** — Individual agent profiles with full description, ratings, vote counts, creation date, and external links
- **Voting System** — Upvote/downvote functionality on agent detail pages with instant UI updates via React Query mutations
- **Category System** — 8 categories (Development, Coding, Analytics, Research, Customer Service, Marketing, Productivity, Other) with color-coded badges
- **Score Calculation** — Dual scoring: uses `avg_rating` from database when available, falls back to upvote/downvote ratio on a 0-5 scale

### Backend

- **Express API** — 4 RESTful endpoints:
  - `GET /api/agents` — List all agents with optional category filter
  - `GET /api/agents/:id` — Get single agent by ID
  - `POST /api/agents` — Create new agent with Zod schema validation
  - `POST /api/agents/:id/vote` — Vote on an agent (up/down)
- **Supabase Integration** — Server-side Supabase client for secure database operations (anon key never exposed to browser)
- **Storage Layer** — `SupabaseStorage` class abstraction over Supabase queries for agents CRUD and voting

### Frontend

- **React 19** with Vite 7 and TypeScript
- **57 shadcn/ui components** — Full Radix UI component library (buttons, cards, dialogs, forms, etc.)
- **TanStack React Query** — Data fetching with automatic cache invalidation on mutations
- **Wouter** routing — Home, Submit, Agent Detail, and 404 pages
- **Framer Motion** animations — Staggered card entrances, hover effects, navbar animation
- **Animated Background** — Mouse-following gradient orbs with noise texture overlay
- **Glassmorphism Design** — Frosted glass card effects with backdrop-blur throughout
- **Dark Mode** — Full dark theme support via CSS custom properties
- **Responsive Design** — Mobile-first layout with hamburger nav and adaptive grids
- **Sonner Toasts** — Success/error notifications on form submission

### Infrastructure

- **Tailwind CSS 4** — Utility-first styling with `@theme inline` configuration
- **esbuild** production bundling — Minified server bundle with selective dependency bundling
- **Vite** dev server with HMR — Hot module replacement for instant feedback
- **Environment Variables** — `.env` file loaded via Node's `--env-file` flag (no dotenv dependency)
- **Single Port Architecture** — Express serves both API routes and static React build on port 3000

### Database

- **Supabase PostgreSQL** — Cloud-hosted database with `agents` table
- **Agent Schema** — Fields: id (UUID), name, description, category, github_url, mcp_endpoint, created_at, upvotes, downvotes, avg_rating, total_reviews
- **21 seeded agents** — Pre-populated with MCP servers and AI tools (Filesystem, GitHub, Slack, Brave Search, Google Maps, etc.)

### Seeded From

- Merged from two codebases:
  - **GitHub version** (Next.js) — Supabase backend, agent submission, voting, 20+ seeded agents
  - **Replit export** (Vite/Express) — New glassmorphism UI, shadcn/ui components, animated design
- Architecture: Replit folder structure as base, Supabase backend integrated via Express API routes
