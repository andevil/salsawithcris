# Salsita with Cris — Project Memory

> Updated each session and on every milestone. Source of truth for current state.

---

## Project

**Site:** andresgarzong.com  
**Repo:** https://github.com/andevil/salsawithcris  
**Stack:** Next.js 15.5.19 · React 19 · TypeScript · Tailwind CSS v4 · `motion/react` · `@mux/mux-video-react` · `@phosphor-icons/react` · MagicUI (hand-built)

---

## Design Rules (non-negotiable — v2, "glow-up" 2026-07-05)

> v1 rules (sharp corners, gold-only) were REPLACED by the UI-audit glow-up, approved by owner.

- **Rounded corners + glassmorphism**: radius tokens `--radius-sm/md/lg/xl/pill` (10/16/24/32/999px). Cards `rounded-lg`, buttons/badges pill. Utilities in `globals.css`: `.glass-card`, `.premium-card`, `.primary-cta`, `.page-bg`, `.animate-float-drift`
- **Palette (brief)**: cream base `#FFF6E8` (+`cream-soft #FFF9F0`), espresso text `#1B120D`, **salsa-red `#B91C1C` = primary CTA**, gold `#D4A017` = highlights/available states, tropical-green/colombian-blue/coral ONLY as tiny accents. Legacy tokens (`ink`, `divider`, `warm-white`) remapped to warm values — CRM/events pages inherit them
- **Fonts:** Cormorant Garamond (headings/display) · DM Sans (body/UI) — loaded via `next/font/google`
- **Hero video** Mux playback ID: `LgNB00c7gLG4emTMep78OyYXPwcqcfcwqeth02oj8G5X8` (warm red/espresso scrim, fades to cream)
- All animations via `motion/react`; always respect `useReducedMotion()`; shared ease `[0.22, 1, 0.36, 1]`
- Copy tone: warm, Colombian, soulful, social-dance-focused — NOT corporate, NOT Bachata-first. Spanish microcopy welcome ("con sabor")
- ALL landing copy lives in `lib/data.ts` (incl. `hero`, `sectionCopy`, `choosePath`, `weeklySchedule`, `faqItems`, `galleryItems`, `reels`, `philosophyCards`)

---

## File Structure

```
app/
  layout.tsx          — fonts + metadata
  page.tsx            — assembles all 9 sections
  globals.css         — @theme tokens, global rules, marquee keyframes

components/           (landing order: Navbar → Hero → StyleStrip → About → ChoosePath →
                       Services → WeeklySchedule → BookingCalendar → Testimonials →
                       CommunityGallery → VideoReels → FAQAccordion → Contact → Footer)
  Navbar.tsx          — fixed floating glass PILL (top-4), dark tint over hero → cream glass on scroll, mobile fullscreen overlay
  Hero.tsx            — Mux video bg, warm scrim, pill badge, floating reassurance badges, 2 CTAs
  StyleStrip.tsx      — marquee, serif/sans alternating, MusicNote separators (server component, SSR icon import)
  About.tsx           — editorial 2-col, rounded portrait + fallback, philosophy chips, NumberTicker stats (300+/174/8+/3)
  ChoosePath.tsx      — 4 "Not sure where to begin?" glass cards, accent per card
  Services.tsx        — 5 premium-cards (2+2+1), ghost number, icon, benefit, price, CTA
  WeeklySchedule.tsx  — 5 schedule cards, snap-scroll mobile (data: weeklySchedule)
  BookingCalendar.tsx — 3-step booking (calendar → form → success); glass reskin, LOGIC UNTOUCHED; gold=available, red=selected
  Testimonials.tsx    — featured glass quote + grid, initials avatars w/ accent, classBadge pills
  CommunityGallery.tsx— 6-tile editorial grid, warm gradient placeholders until real photos land
  VideoReels.tsx      — 3 vertical 9:16 reel cards, decorative (non-interactive) play overlay
  FAQAccordion.tsx    — 9 items, accessible (aria-expanded/controls, role=region)
  Contact.tsx         — "Let's dance together.", Dock in glass pill, 3 CTAs
  Footer.tsx          — deep espresso bg, cream text, gold hover, dynamic year
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
| 12 | **UI glow-up (2026-07-05/06)**: full landing redesign per UI-audit brief (`salsa_with_cris_ui_glowup_summary.md`) — rounded+glass design system, brief palette, 5 new sections (ChoosePath, WeeklySchedule, CommunityGallery, VideoReels, FAQAccordion), all copy in data.ts, booking logic untouched. Orchestrated: 1 foundation agent (Sonnet) → 5 parallel section agents (Opus/Sonnet×3/Haiku) → integration+QA. lint+build clean; QA via DOM (hidden preview tab freezes rAF → animations/screenshots not testable there, verified structurally). NOT committed yet | ✅ |

**Pending (needs owner):** real YouTube channel URL + testimonials + booking availability in `lib/data.ts` (placeholders kept intentionally); npm audit shows 2 moderate (Next's bundled postcss — wait for Next patch); majors deferred on purpose (Next 16, zod 4, TS 6 — zod v3 + resolvers v3 required by react-hook-form typing).

**Supabase plan:** FREE tier — leaked-password protection (HaveIBeenPwned) is a paid (Pro) Auth feature; advisor will keep flagging it. Revisit if the project upgrades plans.

---

## Placeholders to replace before launch

1. **Portrait** → add real photo at `/public/images/cristhian-portrait.jpg`
2. **YouTube URL** → update `href` in `lib/data.ts` `socialLinks`
3. **Instagram / TikTok handles** → verify in `lib/data.ts`
4. **Email** → `andresgarzong@gmail.com` (confirm this is correct)
5. **Booking availability** → replace `availability` in `lib/data.ts` with real backend
6. **Gallery photos** → drop 6 real community photos at `/public/images/gallery/*.jpg` (paths in `galleryItems`, warm gradient placeholders shown meanwhile; missing files = expected 400s from next/image in dev)
7. **Reel thumbnails** → `/public/images/reels/*.jpg` (paths in `reels`); wire real video embeds later
8. **Schedule gaps** → Wednesday location, Thursday & Saturday times are empty strings in `weeklySchedule` (brief didn't specify) — fill when confirmed

---

## Node.js (local dev)

Installed from official arm64 tarball (no Homebrew yet — needs sudo in a real terminal):
- `~/.local/node-v24.17.0-darwin-arm64/`
- Symlinked: `~/bin/node`, `~/bin/npm`, `~/bin/npx`

To install permanently: open Terminal → `brew install node`
