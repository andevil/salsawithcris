-- =============================================================================
-- The app upserts sessions with onConflict 'offering_id,date'; Postgres
-- requires a matching unique constraint or every upsert fails at runtime.
-- =============================================================================
alter table sessions
  add constraint sessions_offering_id_date_key unique (offering_id, date);
