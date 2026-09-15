-- Lock to unit assignments
-- Each lock can be assigned to one unit at a time (unique-active-assignment constraint)
-- Links existing lock/device model to units

CREATE TYPE lock_assignment_status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'REPLACED'
);

CREATE TABLE IF NOT EXISTS lock_unit_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lock_id UUID NOT NULL REFERENCES locks(id) ON DELETE CASCADE,
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    
    -- Assignment status
    status lock_assignment_status NOT NULL DEFAULT 'ACTIVE',
    
    -- Assignment metadata
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    deactivated_at TIMESTAMPTZ,
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT lock_assignment_status_check
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'REPLACED')),
    
    CONSTRAINT lock_assignment_version_check
        CHECK (version >= 1),
    
    -- Ensure only one ACTIVE assignment per lock
    CONSTRAINT lock_unique_active_assignment
        EXCLUDE (USING gist (lock_id WITH =, status WITH =) WHERE (status = 'ACTIVE'))
);

CREATE INDEX IF NOT EXISTS lock_unit_assignments_lock_id_idx
    ON lock_unit_assignments (lock_id);

CREATE INDEX IF NOT EXISTS lock_unit_assignments_unit_id_idx
    ON lock_unit_assignments (unit_id);

CREATE INDEX IF NOT EXISTS lock_unit_assignments_status_idx
    ON lock_unit_assignments (status);

-- Ensure unit has at most one active lock assignment
CREATE UNIQUE INDEX IF NOT EXISTS lock_unit_assignments_unit_active_unique
    ON lock_unit_assignments (unit_id)
    WHERE status = 'ACTIVE';

-- Trigger to update updated_at timestamp
CREATE TRIGGER lock_unit_assignments_updated_at_trigger
    BEFORE UPDATE ON lock_unit_assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
