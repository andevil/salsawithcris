# Salsita with Cris — Project Memory

> Updated each session and on every milestone. Source of truth for current state.

---

## Project

**Site:** andresgarzong.com  
**Repo:** https://github.com/andevil/andresgarzong.com  
**Stack:** Next.js 15.5.19 · React 19 · TypeScript · Tailwind CSS v4 · `motion/react` · `@mux/mux-video-react` · `@phosphor-icons/react` · MagicUI (hand-built)

---

## Design Rules (non-negotiable)

- **No border radius anywhere** — enforced globally via `* { border-radius: 0 !important; }` in `globals.css`
- **Fonts:** Cormorant Garamond (headings/display) · DM Sans (body/UI) — loaded via `next/font/google`
- **Gold `#C9A84C`** is the only accent color
- **Hero video** Mux playback ID: `LgNB00c7gLG4emTMep78OyYXPwcqcfcwqeth02oj8G5X8`
- All animations via `motion/react`; always respect `useReducedMotion()`
- Copy tone: warm, Colombian, soulful, social-dance-focused — NOT corporate, NOT Bachata-first

---

## File Structure

```
app/
  layout.tsx          — fonts + metadata
  page.tsx            — assembles all 9 sections
  globals.css         — @theme tokens, global rules, marquee keyframes

components/
  Navbar.tsx          — fixed, scroll-aware, mobile fullscreen overlay
  Hero.tsx            — Mux video bg, staggered editorial text
  StyleStrip.tsx      — continuous marquee with gold dot separators
  About.tsx           — two-column, portrait fallback, NumberTicker stats
  Services.tsx        — numbered editorial list rows
  Testimonials.tsx    — pull quote + 2-col supporting grid
  BookingCalendar.tsx — 3-step animated booking (calendar → form → success)
  Contact.tsx         — MagicUI Dock + social handle list
  Footer.tsx          — minimal single-row, dynamic year
  magicui/
    Marquee.tsx
    BlurFade.tsx
    NumberTicker.tsx
    Dock.tsx

lib/
  data.ts             — all copy, services, testimonials, social links, availability
  utils.ts            — cn() class helper
```

---

## CRM Structure (at `/crm`)

```
app/crm/
  login/          — Supabase email/password auth
  page.tsx        — Dashboard (stats, upcoming sessions, unpaid, expiring packages, tasks)
  people/         — List + detail + new + edit + log communication (+ waitlist as status filter)
  offerings/      — UNIFIED courses + workshops (tabs via ?type=course|workshop); detail + new + edit + enroll + sessions
  attendance/     — Mobile-first check-in sheet (table: sessions)
  payments/       — List + add payment + unpaid alerts (related_offering_id)
  packages/       — Single package system (table: packages, ex student_packages)
  promotions/     — Promotion CRUD, feeds packages
  notifications/  — Package notifications
  registrations/  — Public sign-up inbox → converts into People + Enrollments
  waitlist/       — Kept as tools page, reached from People filter (NOT in sidebar)
  private-lessons/— List + schedule (package_id instead of pass_id)
  settings/       — Business info, pricing, locations

components/crm/
  ui.tsx          — Badge, Card, Button, Table, Field, Input, Select, StatCard etc.
  CRMSidebar.tsx  — Nav: Dashboard, People, Offerings, Attendance, Payments, Packages,
                    Promotions, Notifications, Registrations, Private Lessons, Settings
  CRMTopbar.tsx   — Mobile toggle + sign out
  AttendanceSheet.tsx — Client check-in component
  PersonForm.tsx, OfferingForm.tsx (ex Course+WorkshopForm), PaymentForm.tsx,
  WaitlistForm.tsx, WaitlistEditForm.tsx, PrivateLessonForm.tsx,
  EnrollForm.tsx (package_id select), SessionActions.tsx (ex CourseSessionActions)

lib/supabase/
  client.ts, server.ts, middleware.ts, types.ts (hand-written; Offering/Session/Enrollment/Package)

supabase/migrations/
  001_crm_schema.sql          — original 13 tables (historical)
  002_seed.sql                — original seed; STILL NEEDED on fresh DB (people rows used by 006)
  003_packages_promotions.sql — packages/promotions module
  004_public_registrations.sql— public inbox
  005_schema_consolidation.sql— offerings/sessions/enrollments; drops courses, workshops,
                                class_sessions, course_enrollments, workshop_registrations, passes;
                                renames student_packages→packages; real FKs on payments/tasks/public_registrations
  006_seed_v2.sql             — seed for new schema incl. multi-session workshop
                                "Salsa Caleña Sessions | July" (4 sessions) — apply via SQL, data-only
  007_fk_indexes.sql          — FK covering indexes from performance advisor
```

**DB schema key facts (post-005):** `offerings.offering_type` 'course'|'workshop', `recurrence` 'weekly'|'one-off'|'multi-session', keeps `slug`/`thumbnail_url` (public event pages read offerings+sessions with anon key — policies `public_read_offerings`/`public_read_sessions`), `workshop_type` keeps old workshops.type values. New tables need explicit GRANTs (Supabase apr-2026 change: no auto Data-API exposure).

**Stack additions for CRM:** `@supabase/supabase-js`, `@supabase/ssr`, `react-hook-form`, `zod@3`, `@hookform/resolvers@3`, `date-fns`

**Note:** zod v3 + @hookform/resolvers v3 (NOT v4 — type inference incompatibility with react-hook-form)

---

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Node.js installed (v24.17.0, arm64 tarball → `~/bin`) | ✅ |
| 2 | Project scaffolded (package.json, tsconfig, next.config, postcss, eslint) | ✅ |
| 3 | `npm install` succeeded (Next 15.5.19 + all deps) | ✅ |
| 4 | `globals.css` with `@theme` tokens + sharp-corners rule | ✅ |
| 5 | `lib/data.ts` — all content centralised | ✅ |
| 6 | MagicUI components (Marquee, BlurFade, NumberTicker, Dock) | ✅ |
| 7 | All 9 section components written | ✅ |
| 8 | `npm run lint` + `npm run build` — 0 errors, 0 warnings | ✅ |
| 9 | Pushed to public GitHub repo | ✅ |
| 10 | Schema consolidation (2026-07-04): offerings/sessions/enrollments/packages; migration 005+006+007 applied to Supabase (phcxyitwmeqblveeemyg); CRM refactored to single Offerings module; build clean | ✅ |
| 11 | Audit & hardening (2026-07-04, commit f006ca9): 008 sessions unique constraint; attendance includes trial/registered; AddSessionForm for workshops; requireUser() on /api/crm/*; error/loading/404 pages; robots+sitemap+OG; next/image; ESLint CLI flat config; .env.example | ✅ |

**Pending (needs owner):** real YouTube channel URL + testimonials + booking availability in `lib/data.ts` (placeholders kept intentionally); enable leaked-password protection in Supabase Auth dashboard; npm audit shows 2 moderate (Next's bundled postcss — wait for Next patch); majors deferred on purpose (Next 16, zod 4, TS 6 — zod v3 + resolvers v3 required by react-hook-form typing).

---

## Placeholders to replace before launch

1. **Portrait** → add real photo at `/public/images/cristhian-portrait.jpg`
2. **YouTube URL** → update `href` in `lib/data.ts` `socialLinks`
3. **Instagram / TikTok handles** → verify in `lib/data.ts`
4. **Email** → `andresgarzong@gmail.com` (confirm this is correct)
5. **Booking availability** → replace `availability` in `lib/data.ts` with real backend

---

## Node.js (local dev)

Installed from official arm64 tarball (no Homebrew yet — needs sudo in a real terminal):
- `~/.local/node-v24.17.0-darwin-arm64/`
- Symlinked: `~/bin/node`, `~/bin/npm`, `~/bin/npx`

To install permanently: open Terminal → `brew install node`
