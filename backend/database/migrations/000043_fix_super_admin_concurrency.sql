-- Migration 000043: Fix super admin concurrency with advisory lock
-- This migration replaces the unsafe partial unique index and trigger with a proper
-- concurrency-safe mechanism using PostgreSQL advisory locks in the application layer.
-- The application layer now uses pg_advisory_xact_lock to serialize super admin promotions.

-- Remove the useless partial unique index on (id) WHERE is_super_admin = true
-- This index enforced nothing because id is already unique
DROP INDEX IF EXISTS idx_identity_subjects_super_admin_limit;

-- Remove the unsafe trigger that used SELECT COUNT(*)
-- COUNT(*) is not safe under READ COMMITTED isolation - two concurrent transactions
-- could both see count < 2 and both commit, resulting in three super admins
DROP TRIGGER IF EXISTS trg_identity_subjects_insert_super_admin_check ON identity_subjects;
DROP TRIGGER IF EXISTS trg_identity_subjects_update_super_admin_check ON identity_subjects;
DROP FUNCTION IF EXISTS check_super_admin_count();

-- Add comment documenting the new concurrency approach
COMMENT ON TABLE identity_subjects IS 'Subject table with is_super_admin flag. Concurrency for super admin changes is enforced at application layer using PostgreSQL advisory locks (pg_advisory_xact_lock) to serialize promotions and enforce the max-two invariant. This is safe under all isolation levels and prevents concurrent promotions from creating more than two super admins.';
