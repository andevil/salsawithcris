-- =============================================================================
-- Covering indexes for FKs flagged by the Supabase performance advisor
-- =============================================================================
create index if not exists communication_logs_person_idx on communication_logs(person_id);
create index if not exists package_notifications_package_idx on package_notifications(package_id);
create index if not exists package_notifications_rule_idx on package_notifications(rule_id);
create index if not exists packages_promotion_idx on packages(promotion_id);
create index if not exists private_lessons_person_idx on private_lessons(person_id);
create index if not exists private_lessons_partner_idx on private_lessons(partner_person_id);
create index if not exists tasks_person_idx on tasks(person_id);
create index if not exists waitlist_entries_person_idx on waitlist_entries(person_id);
