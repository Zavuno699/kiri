-- Ensure one active tenancy per unit
-- Partial unique index on unit_id where status = ACTIVE
CREATE UNIQUE INDEX IF NOT EXISTS tenancies_unit_active_unique_idx
    ON tenancies (unit_id)
    WHERE status = 'ACTIVE';

COMMENT ON INDEX tenancies_unit_active_unique_idx IS 'Ensures at most one active tenancy per unit';
