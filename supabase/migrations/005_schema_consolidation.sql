-- =============================================================================
-- Schema Consolidation
--   * offerings   replaces courses + workshops
--   * sessions    replaces class_sessions
--   * enrollments replaces course_enrollments + workshop_registrations
--   * packages    renames student_packages; passes is removed
--   * payments / tasks / public_registrations get real FKs to the new tables
-- Data is dummy/seed only — old tables are dropped, not migrated.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. DROP OLD TABLES
-- ---------------------------------------------------------------------------
drop table if exists workshop_registrations cascade;
drop table if exists course_enrollments cascade;
drop table if exists class_sessions cascade;
drop table if exists workshops cascade;
drop table if exists courses cascade;
drop table if exists passes cascade;

-- attendance survives but its rows point at dropped class_sessions
delete from attendance;

-- these FK columns pointed at dropped tables; values are dummy
update payments set related_session_id = null,
                    related_private_lesson_id = null;
update private_lessons set pass_id = null;
-- public_registrations.event_id has no FK; old ids stay as raw form payload

-- ---------------------------------------------------------------------------
-- 2. PACKAGES (rename student_packages; single package system)
-- ---------------------------------------------------------------------------
alter table student_packages rename to packages;
-- FKs from package_bonuses / package_notifications and the updated_at trigger
-- follow the rename automatically. Rename indexes + policies for consistency:
alter index if exists student_packages_person_id_idx rename to packages_person_id_idx;

drop policy if exists "auth_select_student_packages" on packages;
drop policy if exists "auth_insert_student_packages" on packages;
drop policy if exists "auth_update_student_packages" on packages;
drop policy if exists "auth_delete_student_packages" on packages;
create policy "auth_select_packages" on packages for select to authenticated using (true);
create policy "auth_insert_packages" on packages for insert to authenticated with check (true);
create policy "auth_update_packages" on packages for update to authenticated using (true) with check (true);
create policy "auth_delete_packages" on packages for delete to authenticated using (true);

-- private lessons now draw from packages instead of passes
alter table private_lessons rename column pass_id to package_id;
alter table private_lessons
  add constraint private_lessons_package_id_fkey
  foreign key (package_id) references packages(id) on delete set null;

-- ---------------------------------------------------------------------------
-- 3. OFFERINGS (courses + workshops unified)
-- ---------------------------------------------------------------------------
create table offerings (
  id                 uuid primary key default gen_random_uuid(),
  offering_type      text not null check (offering_type in ('course','workshop')),
  name               text not null,
  style              text not null check (style in ('partnerwork','caleña','fusion','other')),
  level              text check (level in ('A1','A2','B1','B2','beginner','intermediate','advanced','open')),
  description        text,
  location           text,
  -- weekly recurring schedule (courses); null for one-off / multi-session offerings
  day_of_week        text check (day_of_week in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')),
  start_time         time,
  end_time           time,
  recurrence         text not null default 'weekly' check (recurrence in ('weekly','one-off','multi-session')),
  -- event category carried over from workshops.type (party, bbq, festival, ...)
  workshop_type      text check (workshop_type in ('colombian-workshop','caleña-workshop','social-practice','bbq','party','guest-teacher','festival','corporate','bachelorette','wedding','show','other')),
  season             text,
  start_date         date,
  end_date           date,
  capacity           int,
  default_price      int default 4000,
  monthly_pass_price int default 15000,
  status             text not null default 'active' check (status in ('planned','active','paused','finished','cancelled')),
  slug               text unique,
  thumbnail_url      text,
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger offerings_updated_at before update on offerings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- 4. SESSIONS (one row per class meeting, works for courses AND workshops)
-- ---------------------------------------------------------------------------
create table sessions (
  id            uuid primary key default gen_random_uuid(),
  offering_id   uuid not null references offerings(id) on delete cascade,
  date          date not null,
  start_time    time,
  end_time      time,
  location      text,
  topic         text,
  teacher_notes text,
  status        text not null default 'scheduled' check (status in ('scheduled','completed','cancelled')),
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. ENROLLMENTS (course enrollments + workshop registrations unified)
-- ---------------------------------------------------------------------------
create table enrollments (
  id                uuid primary key default gen_random_uuid(),
  person_id         uuid not null references people(id) on delete cascade,
  offering_id       uuid not null references offerings(id) on delete cascade,
  enrollment_status text not null default 'active' check (enrollment_status in ('active','paused','dropped','completed','trial','invited','registered','no-show')),
  package_id        uuid references packages(id) on delete set null,
  payment_status    text not null default 'unpaid' check (payment_status in ('unpaid','partial','paid','overdue','refunded')),
  start_date        date,
  end_date          date,
  notes             text,
  created_at        timestamptz not null default now(),
  unique(person_id, offering_id)
);

-- ---------------------------------------------------------------------------
-- 6. RE-POINT SURVIVING TABLES
-- ---------------------------------------------------------------------------
-- attendance → sessions
alter table attendance
  add constraint attendance_session_id_fkey
  foreign key (session_id) references sessions(id) on delete cascade;

-- payments: one offering FK instead of course + workshop, real FKs everywhere
alter table payments drop column if exists related_course_id;
alter table payments drop column if exists related_workshop_id;
alter table payments add column related_offering_id uuid references offerings(id) on delete set null;
alter table payments add column related_package_id uuid references packages(id) on delete set null;
alter table payments
  add constraint payments_related_session_id_fkey
  foreign key (related_session_id) references sessions(id) on delete set null;
alter table payments
  add constraint payments_related_private_lesson_id_fkey
  foreign key (related_private_lesson_id) references private_lessons(id) on delete set null;

-- tasks: single offering FK
alter table tasks drop column if exists related_course_id;
alter table tasks drop column if exists related_workshop_id;
alter table tasks add column related_offering_id uuid references offerings(id) on delete set null;

-- public_registrations: link to the offering once it exists
-- (event_type / event_id / event_name stay for the public form's raw payload)
alter table public_registrations
  add column offering_id uuid references offerings(id) on delete set null;

-- ---------------------------------------------------------------------------
-- 7. INDEXES
-- ---------------------------------------------------------------------------
create index offerings_type_idx        on offerings(offering_type);
create index offerings_status_idx      on offerings(status);
create index sessions_offering_idx     on sessions(offering_id);
create index sessions_date_idx         on sessions(date);
create index enrollments_person_idx    on enrollments(person_id);
create index enrollments_offering_idx  on enrollments(offering_id);
create index enrollments_package_idx   on enrollments(package_id);
create index payments_offering_idx     on payments(related_offering_id);
create index payments_session_idx      on payments(related_session_id);
create index payments_private_lesson_idx on payments(related_private_lesson_id);
create index payments_package_idx      on payments(related_package_id);
create index tasks_offering_idx        on tasks(related_offering_id);
create index public_registrations_offering_idx on public_registrations(offering_id);
create index private_lessons_package_idx on private_lessons(package_id);

-- ---------------------------------------------------------------------------
-- 8. RLS + GRANTS
--    (new tables are no longer auto-exposed to the Data API → explicit grants)
-- ---------------------------------------------------------------------------
alter table offerings enable row level security;
alter table sessions enable row level security;
alter table enrollments enable row level security;

grant select, insert, update, delete on offerings, sessions, enrollments to authenticated;
grant select on offerings, sessions to anon;

create policy "auth_all_offerings" on offerings for all to authenticated using (true) with check (true);
create policy "auth_all_sessions" on sessions for all to authenticated using (true) with check (true);
create policy "auth_all_enrollments" on enrollments for all to authenticated using (true) with check (true);

-- public event pages read offerings (and session dates) with the anon key,
-- same as the old "public read courses/workshops" policies
create policy "public_read_offerings" on offerings for select to anon using (true);
create policy "public_read_sessions" on sessions for select to anon using (true);
