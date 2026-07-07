# Salsita with Cris - website + student CRM

Before doing anything, read `MEMORY.md` (source of truth for current state, design rules, and decisions) and `HOW-WE-BUILT-THIS.md` (architecture walkthrough). Update `MEMORY.md` at every milestone, as it instructs.

Owner: Cris (Andrés), single operator of the salsa school. He is learning the flow: explain decisions briefly, use plan mode for non-trivial work, and keep scope small. Goal: production-ready before the autumn salsa season. Simplest thing that ships wins.

## Stack

Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS v4 · `motion/react` · Supabase (project ref `phcxyitwmeqblveeemyg`).

## Rules

- Migrations in `supabase/migrations/` are numbered and append-only: never edit an applied migration, add a new numbered one (009_..., 010_...).
- Check the LIVE schema (Supabase MCP: `list_tables` / `list_migrations`) before schema work.
- Any user-facing copy follows the voice rules in `~/Claude/CLAUDE.md`: no em dashes, never generic, English-first with Spanish greetings only.
- Secrets only in `.env.local` (git-ignored) and Vercel env vars. Never in code.

## Repo note

GitHub repo: `andevil/salsawithcris` (renamed from `andevil/andresgarzong.com` on 2026-07-07; old URLs redirect). This project is NOT the personal site (that one is `~/Claude/Projects/andresgarzong`, repo `andevil/andresgarzong`). Do not confuse the two.
