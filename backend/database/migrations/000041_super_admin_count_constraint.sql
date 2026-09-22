-- Migration 000041: Enforce maximum two super admins invariant
-- This migration adds a partial unique index and trigger to ensure at most two
-- is_super_admin = true rows exist in identity_subjects table.

-- Partial unique index on is_super_admin flag to prevent duplicate enforcement
-- This allows at most 2 rows with is_super_admin = true by using a filtered index
CREATE UNIQUE INDEX IF NOT EXISTS idx_identity_subjects_super_admin_limit
ON identity_subjects (id)
WHERE is_super_admin = true;

-- Function to check super admin count before insert/update
CREATE OR REPLACE FUNCTION check_super_admin_count()
RETURNS TRIGGER AS $$
DECLARE
    super_admin_count INTEGER;
BEGIN
    -- Count current super admins (excluding the row being updated if this is an update)
    IF TG_OP = 'INSERT' THEN
        SELECT COUNT(*) INTO super_admin_count
        FROM identity_subjects
        WHERE is_super_admin = true;
    ELSE -- UPDATE
        SELECT COUNT(*) INTO super_admin_count
        FROM identity_subjects
        WHERE is_super_admin = true
        AND id != NEW.id;
    END IF;

    -- If this operation would set is_super_admin to true and we already have 2, reject
    IF NEW.is_super_admin = true AND super_admin_count >= 2 THEN
        RAISE EXCEPTION 'Maximum of two super admins allowed. Current count: %', super_admin_count
        USING ERRCODE = 'check_violation';
    END IF;

    -- Prevent demoting the last super admin (would leave zero)
    IF TG_OP = 'UPDATE' AND OLD.is_super_admin = true AND NEW.is_super_admin = false THEN
        SELECT COUNT(*) INTO super_admin_count
        FROM identity_subjects
        WHERE is_super_admin = true
        AND id != OLD.id;

        IF super_admin_count = 0 THEN
            RAISE EXCEPTION 'Cannot demote the last super admin. At least one super admin must remain.'
            USING ERRCODE = 'check_violation';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce the constraint on INSERT
DROP TRIGGER IF EXISTS trg_identity_subjects_insert_super_admin_check ON identity_subjects;
CREATE TRIGGER trg_identity_subjects_insert_super_admin_check
BEFORE INSERT ON identity_subjects
FOR EACH ROW
EXECUTE FUNCTION check_super_admin_count();

-- Trigger to enforce the constraint on UPDATE
DROP TRIGGER IF EXISTS trg_identity_subjects_update_super_admin_check ON identity_subjects;
CREATE TRIGGER trg_identity_subjects_update_super_admin_check
BEFORE UPDATE OF is_super_admin ON identity_subjects
FOR EACH ROW
EXECUTE FUNCTION check_super_admin_count();

-- Add comment documenting the invariant
COMMENT ON FUNCTION check_super_admin_count() IS 'Enforces the two-super-admin invariant: at most two super admins can exist, and at least one must remain. Prevents both creation of a third super admin and demotion of the last super admin.';
