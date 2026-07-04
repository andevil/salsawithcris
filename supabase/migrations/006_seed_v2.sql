-- =============================================================================
-- Seed data v2 — offerings/sessions/enrollments/packages world (post 005)
-- Run AFTER 005_schema_consolidation.sql
--
-- People, waitlist_entries, tasks, promotions, notification_rules and
-- public_registrations already have rows in this database — we do NOT
-- re-insert those (promotions/notification_rules already seeded in 003).
-- This file only (re)builds: offerings, sessions, enrollments, packages,
-- package_bonuses, payments, attendance, private_lessons, and it updates
-- the 2 existing public_registrations rows to point at real offerings.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. CLEAN SLATE (FK-safe order) — safe to re-run
-- ---------------------------------------------------------------------------
delete from enrollments;
delete from attendance;
delete from payments where related_offering_id is not null
                        or related_package_id is not null;
delete from private_lessons where package_id is not null;
delete from sessions;
delete from package_bonuses;
delete from packages;
delete from offerings;

-- ---------------------------------------------------------------------------
-- 1. OFFERINGS — weekly courses (equivalent to old courses table)
-- ---------------------------------------------------------------------------
insert into offerings (offering_type, name, style, level, description, location, day_of_week, start_time, end_time, recurrence, season, default_price, monthly_pass_price, status, slug)
values
  ('course', 'A1 Partnerwork',       'partnerwork', 'A1',           'Foundations of Cuban-style partnerwork for absolute beginners.', 'BackStage Studio, Dohány u. 5b', 'monday',    '19:00', '20:15', 'weekly', 'Summer 2026', 4000, 15000, 'active', 'partnerwork-a1-monday'),
  ('course', 'A2 Partnerwork',       'partnerwork', 'A2',           'Building on A1 basics with turn patterns and lead/follow connection.', 'BackStage Studio, Dohány u. 5b', 'monday',    '20:30', '21:45', 'weekly', 'Summer 2026', 4000, 15000, 'active', 'partnerwork-a2-monday'),
  ('course', 'B1 Partnerwork',       'partnerwork', 'B1',           'Intermediate partnerwork with more complex combinations.',        'Roxy Studio, Tátra u. 4',        'wednesday', '19:00', '20:15', 'weekly', 'Summer 2026', 4000, 15000, 'active', 'partnerwork-b1-wednesday'),
  ('course', 'B2 Partnerwork',       'partnerwork', 'B2',           'Advanced partnerwork and musicality integration.',                'Roxy Studio, Tátra u. 4',        'wednesday', '20:30', '21:45', 'weekly', 'Summer 2026', 4000, 15000, 'active', null),
  ('course', 'Salsa Fusion',         'fusion',      'open',         'Open-level fusion class blending styling and partnerwork.',       'BackStage Studio, Dohány u. 5b', 'thursday',  '19:00', '20:15', 'weekly', 'Summer 2026', 4000, 15000, 'active', null),
  ('course', 'Caleña Beginners',     'caleña',      'beginner',     'Introduction to Colombian-style salsa footwork.',                 'BackStage Studio, Dohány u. 5b', 'tuesday',   '18:30', '19:45', 'weekly', 'Summer 2026', 4000, 15000, 'active', null),
  ('course', 'Caleña Intermediates', 'caleña',      'intermediate', 'Faster footwork and Colombian-style partnerwork.',                'BackStage Studio, Dohány u. 5b', 'tuesday',   '20:00', '21:15', 'weekly', 'Summer 2026', 4000, 15000, 'active', null);

-- ---------------------------------------------------------------------------
-- 2. OFFERINGS — one-off workshops (each gets exactly ONE session row)
-- ---------------------------------------------------------------------------
insert into offerings (offering_type, name, style, level, description, location, recurrence, workshop_type, start_date, end_date, capacity, default_price, status, slug)
values
  ('workshop', 'Sunday Social Practice',  'other',  'open', 'Casual social dancing practice session, all levels welcome.', 'BackStage Studio, Dohány u. 5b', 'one-off', 'social-practice', '2026-07-12', '2026-07-12', 30, 3000, 'active', 'sunday-social-practice-july'),
  ('workshop', 'Mid-Summer Salsa Party',  'caleña', 'open', 'Live DJ, welcome drink and a short Caleña warm-up before the social.', 'Roxy Studio, Tátra u. 4', 'one-off', 'party', '2026-07-18', '2026-07-18', 60, 5000, 'active', 'mid-summer-salsa-party');

with ss as (select id, start_date from offerings where slug = 'sunday-social-practice-july'),
     mp as (select id, start_date from offerings where slug = 'mid-summer-salsa-party')
insert into sessions (offering_id, date, start_time, end_time, location, topic, status)
select id, start_date, '18:00'::time, '20:00'::time, 'BackStage Studio, Dohány u. 5b', 'Open social practice', 'scheduled' from ss
union all
select id, start_date, '20:00'::time, '23:30'::time, 'Roxy Studio, Tátra u. 4', 'Warm-up class + social party', 'scheduled' from mp;

-- ---------------------------------------------------------------------------
-- 3. KEY TEST CASE — multi-session workshop with FOUR sessions
-- ---------------------------------------------------------------------------
insert into offerings (offering_type, name, style, level, description, location, recurrence, workshop_type, season, start_date, end_date, capacity, default_price, status, slug)
values
  ('workshop', 'Salsa Caleña Sessions | July', 'caleña', 'open',
   'Four-week deep dive into Colombian-style salsa: footwork foundations, musicality, partnerwork and social practice.',
   'BackStage Studio, Dohány u. 5b', 'multi-session', 'caleña-workshop', 'Summer 2026',
   '2026-07-07', '2026-07-28', 14, 16000, 'active', 'salsa-calena-sessions-july');

with w as (select id from offerings where slug = 'salsa-calena-sessions-july')
insert into sessions (offering_id, date, start_time, end_time, location, topic, status)
select id, d.date, '19:00'::time, '20:30'::time, 'BackStage Studio, Dohány u. 5b', d.topic, 'scheduled'
from w, (values
  ('2026-07-07'::date, 'Foundations & basic steps'),
  ('2026-07-14'::date, 'Musicality'),
  ('2026-07-21'::date, 'Partnerwork caleño'),
  ('2026-07-28'::date, 'Choreography & social practice')
) as d(date, topic);

-- ---------------------------------------------------------------------------
-- 4. UPCOMING SESSIONS for weekly courses (next ~3 weeks from 2026-07-04)
--    Mondays: 07-06, 07-13, 07-20 · Tuesdays: 07-07, 07-14, 07-21 ·
--    Wednesdays: 07-08, 07-15, 07-22
-- ---------------------------------------------------------------------------
with o as (
  select id, name, location, start_time, end_time from offerings
  where name in ('A1 Partnerwork', 'A2 Partnerwork', 'Caleña Beginners', 'B1 Partnerwork')
)
insert into sessions (offering_id, date, start_time, end_time, location, status)
select id, d.date, start_time, end_time, location, 'scheduled'
from o, (values ('2026-07-06'::date), ('2026-07-13'::date), ('2026-07-20'::date)) as d(date)
where o.name = 'A1 Partnerwork'
union all
select id, d.date, start_time, end_time, location, 'scheduled'
from o, (values ('2026-07-06'::date), ('2026-07-13'::date), ('2026-07-20'::date)) as d(date)
where o.name = 'A2 Partnerwork'
union all
select id, d.date, start_time, end_time, location, 'scheduled'
from o, (values ('2026-07-07'::date), ('2026-07-14'::date), ('2026-07-21'::date)) as d(date)
where o.name = 'Caleña Beginners'
union all
select id, d.date, start_time, end_time, location, 'scheduled'
from o, (values ('2026-07-08'::date), ('2026-07-15'::date), ('2026-07-22'::date)) as d(date)
where o.name = 'B1 Partnerwork';

-- ---------------------------------------------------------------------------
-- 5. ENROLLMENTS — courses + the multi-session workshop
--    (people already exist from 002_seed.sql — matched by email)
-- ---------------------------------------------------------------------------
insert into enrollments (person_id, offering_id, enrollment_status, payment_status, start_date)
select p.id, o.id, e.enrollment_status, e.payment_status, e.start_date::date
from (values
  ('anna.kovacs@email.com',    'A1 Partnerwork',               'active',     'paid',    '2026-01-13'),
  ('mateo.rivas@email.com',    'A1 Partnerwork',               'active',     'paid',    '2026-01-13'),
  ('peter.szabo@email.com',    'A1 Partnerwork',               'active',     'paid',    '2026-02-03'),
  ('sofia.molnar@email.com',   'A1 Partnerwork',               'trial',      'unpaid',  '2026-02-10'),
  ('reka.nagy@email.com',      'A1 Partnerwork',               'active',     'paid',    '2026-03-02'),
  ('dora.varga@email.com',     'A2 Partnerwork',               'active',     'paid',    '2026-01-20'),
  ('bence.toth@email.com',     'A2 Partnerwork',               'active',     'paid',    '2026-01-20'),
  ('adam.kiss@email.com',      'B1 Partnerwork',               'active',     'paid',    '2026-01-15'),
  ('nora.fekete@email.com',    'B1 Partnerwork',               'active',     'paid',    '2026-01-15'),
  ('tamas.horvath@email.com',  'A1 Partnerwork',               'active',     'paid',    '2026-04-07'),
  ('zsofi.pinter@email.com',   'A2 Partnerwork',               'active',     'partial', '2026-04-07'),
  ('dora.varga@email.com',     'Salsa Caleña Sessions | July', 'registered', 'paid',    '2026-07-07')
) as e(email, offering_name, enrollment_status, payment_status, start_date)
join people p on p.email = e.email
join offerings o on o.name = e.offering_name;

-- ---------------------------------------------------------------------------
-- 6. PACKAGES for enrolled people (linked to promotions where applicable)
-- ---------------------------------------------------------------------------
insert into packages (person_id, promotion_id, name, price, classes_included, classes_attended, start_date, expiry_date, payment_status)
select p.id, pr.id, pk.promo_name, pk.price, pk.classes_included, pk.classes_attended, pk.start_date::date, pk.expiry_date::date, pk.payment_status
from (values
  ('anna.kovacs@email.com',   'Standard Monthly Pass',          15000, 4, 2, '2026-07-01', '2026-08-05', 'paid'),
  ('mateo.rivas@email.com',   'Returning Student First Month',  14000, 4, 1, '2026-07-01', '2026-08-05', 'paid'),
  ('dora.varga@email.com',    '2-Month Commitment Package',     28000, 8, 3, '2026-06-16', '2026-08-25', 'partial'),
  ('zsofi.pinter@email.com',  'Standard Monthly Pass',          15000, 4, 0, '2026-07-04', '2026-08-08', 'unpaid')
) as pk(email, promo_name, price, classes_included, classes_attended, start_date, expiry_date, payment_status)
join people p on p.email = pk.email
left join promotions pr on pr.name = pk.promo_name;

-- link package_id back onto a couple of enrollments
update enrollments e
set package_id = pk.id
from people p, offerings o, packages pk2, packages pk
where e.person_id = p.id
  and e.offering_id = o.id
  and pk.person_id = p.id
  and pk2.id = pk.id
  and (
    (p.email = 'anna.kovacs@email.com' and o.name = 'A1 Partnerwork' and pk.name = 'Standard Monthly Pass')
    or (p.email = 'mateo.rivas@email.com' and o.name = 'A1 Partnerwork' and pk.name = 'Returning Student First Month')
    or (p.email = 'dora.varga@email.com' and o.name = 'Salsa Caleña Sessions | July' and pk.name = '2-Month Commitment Package')
  );

-- package bonuses on the 2-month commitment package
insert into package_bonuses (package_id, bonus_type, label, used)
select pk.id, b.bonus_type, b.label, b.used
from packages pk
join people p on p.id = pk.person_id
cross join (values
  ('half_price_private', '50% off one private lesson', false),
  ('free_workshop',      '1 free Salsa Fusion / Colombian Salsa / workshop class', true)
) as b(bonus_type, label, used)
where p.email = 'dora.varga@email.com' and pk.name = '2-Month Commitment Package';

-- ---------------------------------------------------------------------------
-- 7. PAYMENTS
-- ---------------------------------------------------------------------------
insert into payments (person_id, amount, currency, payment_method, payment_type, related_offering_id, related_package_id, payment_date, period_start, period_end, status)
select p.id, pay.amount, 'HUF', pay.payment_method, pay.payment_type, o.id, pk.id, pay.payment_date::date, pay.period_start::date, pay.period_end::date, pay.status
from (values
  ('anna.kovacs@email.com',   4000,  'cash',    'single-class',    null,                               'Standard Monthly Pass',         '2026-07-01', null,          null,          'paid'),
  ('anna.kovacs@email.com',   15000, 'revolut', 'monthly-pass',    'A1 Partnerwork',                    'Standard Monthly Pass',         '2026-07-01', '2026-07-01',  '2026-08-05',  'paid'),
  ('mateo.rivas@email.com',   14000, 'cash',    'monthly-pass',    'A1 Partnerwork',                    'Returning Student First Month', '2026-07-01', '2026-07-01',  '2026-08-05',  'paid'),
  ('dora.varga@email.com',    28000, 'revolut', 'two-month-pass',  'Salsa Caleña Sessions | July',       '2-Month Commitment Package',    '2026-06-16', '2026-06-16',  '2026-08-25',  'paid'),
  ('zsofi.pinter@email.com',  4000,  'cash',    'single-class',    'A2 Partnerwork',                    null,                             '2026-07-04', null,          null,          'pending'),
  ('sofia.molnar@email.com',  4000,  'revolut', 'single-class',    'A1 Partnerwork',                    null,                             '2026-06-24', null,          null,          'paid')
) as pay(email, amount, payment_method, payment_type, offering_name, package_name, payment_date, period_start, period_end, status)
join people p on p.email = pay.email
left join offerings o on o.name = pay.offering_name
left join packages pk on pk.person_id = p.id and pk.name = pay.package_name;

-- ---------------------------------------------------------------------------
-- 8. ATTENDANCE — past session of a weekly course (A1 Partnerwork, 2026-06-29)
-- ---------------------------------------------------------------------------
with past_session as (
  insert into sessions (offering_id, date, start_time, end_time, location, status)
  select id, '2026-06-29'::date, start_time, end_time, location, 'completed'
  from offerings where name = 'A1 Partnerwork'
  returning id
)
insert into attendance (session_id, person_id, status)
select ps.id, p.id, a.status
from past_session ps, (values
  ('anna.kovacs@email.com',  'present'),
  ('mateo.rivas@email.com',  'present'),
  ('peter.szabo@email.com',  'late'),
  ('reka.nagy@email.com',    'no-show')
) as a(email, status)
join people p on p.email = a.email;

-- ---------------------------------------------------------------------------
-- 9. PUBLIC REGISTRATIONS — point existing rows at real offerings
-- ---------------------------------------------------------------------------
with ranked as (
  select id, row_number() over (order by created_at) as rn
  from public_registrations
)
update public_registrations pr
set offering_id = (select id from offerings where slug = 'salsa-calena-sessions-july'),
    event_id    = (select id from offerings where slug = 'salsa-calena-sessions-july'),
    event_name  = 'Salsa Caleña Sessions | July'
from ranked
where pr.id = ranked.id and ranked.rn = 1;

with ranked as (
  select id, row_number() over (order by created_at) as rn
  from public_registrations
)
update public_registrations pr
set offering_id = (select id from offerings where name = 'A1 Partnerwork'),
    event_id    = (select id from offerings where name = 'A1 Partnerwork'),
    event_name  = 'A1 Partnerwork'
from ranked
where pr.id = ranked.id and ranked.rn = 2;

-- ---------------------------------------------------------------------------
-- 10. PRIVATE LESSONS
-- ---------------------------------------------------------------------------
insert into private_lessons (person_id, partner_person_id, date, start_time, end_time, location, focus_area, price, payment_status, package_id, status)
select p.id, partner.id, '2026-07-09', '17:00', '18:00', 'BackStage Studio, Dohány u. 5b', 'Turn patterns & connection', 14000, 'paid', null, 'scheduled'
from people p, people partner
where p.email = 'adam.kiss@email.com' and partner.email = 'nora.fekete@email.com'
union all
select p.id, null, '2026-07-16', '18:00', '19:00', 'Roxy Studio, Tátra u. 4', 'Caleña footwork drilling', 14000, 'paid', pk.id, 'scheduled'
from people p
join packages pk on pk.person_id = p.id and pk.name = '2-Month Commitment Package'
where p.email = 'dora.varga@email.com';
