# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-18

### Added

- **Discovery Page** — Browse and search AI agents with category pills, trending section, grid/list views, advanced filters (verified, price range), sort options, and empty state
- **Agent Detail Page (Redesign)** — Rich agent profile with banner header, large icon, verified badge, star ratings, developer info, Try/Upvote/Save buttons, about section, gallery placeholder, community review submission dialog, and sidebar info + developer cards
- **Reviews Page** — Community reviews feed with star ratings, sort by latest/highest/lowest/most helpful, helpful and reply counts, and Load More pagination
- **Community Page** — "Coming Soon" placeholder showcasing planned features (Discussions, Showcase, Events) with CTA buttons
- **Profile Page** — Public user profile with cover photo, avatar, user stats, social links, and tabs for Submissions, Favorites, and Activity
- **Settings Page** — Account settings with profile management (display name, username, bio), email display, theme toggle (light/dark/system with localStorage persistence), and danger zone (account deletion with confirmation dialog)
- **Username System** — Username availability checking with debounced Supabase query, visual indicators (spinner/check/X), input sanitization, and 30-day change lockout via `username_changed_at` metadata
- **Dashboard Analytics** — Daily/weekly/monthly timeframe selector with stats cards (New Agents, Upvotes, Downvotes, Approval Rate), per-agent performance breakdown with progress bars, and analytics summary
- **404 Page (Redesign)** — Branded 404 page with animated background, large gradient "404" text, glassmorphic overlay, and Return Home / Go Back buttons

### Changed

- **Navbar** — Updated navigation links to Discover, Reviews, Community; kept auth-aware action buttons (Sign In + List Your Agent / Sign Out + Dashboard) with hover animations
- **Routing** — Added 6 new routes: `/discover`, `/reviews`, `/community`, `/profile/:id?`, `/settings` (protected), plus updated `/agents/:id` to use new design
- **Popover Fix** — Added missing `--color-popover` and related CSS variable mappings in Tailwind v4 theme config, fixing transparent dropdown menus across all pages

## [1.1.0] - 2026-02-18

### Added

- **Authentication** — Supabase Auth with Google OAuth, GitHub OAuth, and magic link email (passwordless)
- **Auth Context** — React context provider (`useAuth` hook) managing session state, login, signup, and sign out
- **Login Page** — Email magic link + Google/GitHub OAuth sign-in with glassmorphism card design
- **Signup Page** — Full name + email registration with OAuth options, links to Terms and Privacy
- **Dashboard Page** — Protected route with profile sidebar (avatar, name, email, role, member since), My Agents tab with status badges (Approved/Pending/Rejected), Analytics tab with Recharts area chart, Saved agents tab, and stats cards
- **Terms of Service Page** — Styled legal page with section icons, scroll area, and full ToS content
- **Privacy Policy Page** — Styled legal page with section icons, scroll area, and full privacy policy content
- **Protected Routes** — Dashboard requires authentication, redirects to login if not signed in
- **Auth-Aware Navbar** — "Log In" button next to "List Your Agent" when logged out, swaps to "Dashboard" when logged in (desktop + mobile)
- **Footer Links** — Privacy and Terms links in homepage footer now route to actual pages

### Infrastructure

- **Client-Side Supabase Client** — Browser Supabase client using `VITE_` prefixed env vars for auth
- **Environment Variables** — Added `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for client-side auth

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
