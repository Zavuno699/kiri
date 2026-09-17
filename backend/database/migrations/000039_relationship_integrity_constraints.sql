-- Enforce proper relationship integrity constraints
-- Prevents cross-landlord/cross-tenant access through DB-level constraints
-- Note: Basic FK constraints (units_property_fk, tenancies_unit_fk, lock_assignments_unit_fk) already exist in 000025

-- Ensure tenancies belong to valid landlord profiles (may not exist in 000025)
ALTER TABLE tenancies
ADD CONSTRAINT IF NOT EXISTS tenancies_landlord_fk
    FOREIGN KEY (landlord_profile_id) REFERENCES landlord_profiles(id) ON DELETE RESTRICT;

-- Ensure payment responsibilities belong to valid tenancies
ALTER TABLE payment_responsibilities
ADD CONSTRAINT IF NOT EXISTS payment_responsibilities_tenancy_fk
    FOREIGN KEY (tenancy_id) REFERENCES tenancies(id) ON DELETE RESTRICT;

-- Ensure payment accounts belong to valid landlord profiles
ALTER TABLE payment_accounts
ADD CONSTRAINT IF NOT EXISTS payment_accounts_landlord_fk
    FOREIGN KEY (landlord_profile_id) REFERENCES landlord_profiles(id) ON DELETE RESTRICT;

-- Ensure lock commands reference valid locks
ALTER TABLE lock_commands
ADD CONSTRAINT IF NOT EXISTS lock_commands_lock_fk
    FOREIGN KEY (lock_id) REFERENCES locks(id) ON DELETE RESTRICT;

-- Add unique constraint to prevent duplicate active tenancies per unit
-- This prevents multiple tenants from being assigned to the same unit simultaneously
CREATE UNIQUE INDEX IF NOT EXISTS tenancies_unit_active_unique
ON tenancies(unit_id)
WHERE status = 'ACTIVE';

-- Add unique constraint to prevent duplicate active payment responsibilities per tenancy
CREATE UNIQUE INDEX IF NOT EXISTS payment_responsibilities_tenancy_active_unique
ON payment_responsibilities(tenancy_id)
WHERE status = 'ACTIVE';

-- Add comments documenting integrity requirements
COMMENT ON TABLE tenancies IS 'Tenancies link tenants to units/properties/landlords. Cannot be orphaned.';
COMMENT ON TABLE lock_unit_assignments IS 'Lock assignments link locks to units. Cannot be orphaned.';
COMMENT ON TABLE payment_responsibilities IS 'Payment responsibilities link to tenancies. Cannot be orphaned.';
COMMENT ON TABLE payment_accounts IS 'Payment accounts belong to landlord profiles. Cannot be orphaned.';
COMMENT ON TABLE lock_commands IS 'Lock commands reference locks. Cannot be orphaned.';
