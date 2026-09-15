-- Tenant to unit relationships (occupancy)
-- Preserves history, never hard-deletes
-- Tenant identity comes from identity_subjects

CREATE TYPE tenancy_status AS ENUM (
    'INVITED',
    'ACTIVE',
    'SUSPENDED',
    'TERMINATED',
    'EXPIRED'
);

CREATE TABLE IF NOT EXISTS tenancies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    
    -- Tenancy status
    status tenancy_status NOT NULL DEFAULT 'INVITED',
    
    -- Lease information
    lease_start_date DATE NOT NULL,
    lease_end_date DATE,
    
    -- Invitation metadata
    invited_by_landlord_profile_id UUID REFERENCES landlord_profiles(id) ON DELETE SET NULL,
    invitation_token TEXT, -- Temporary, expiring, never-logged credential
    invitation_expires_at TIMESTAMPTZ,
    invitation_accepted_at TIMESTAMPTZ,
    
    -- Termination metadata
    terminated_at TIMESTAMPTZ,
    termination_reason TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT tenancies_status_check
        CHECK (status IN ('INVITED', 'ACTIVE', 'SUSPENDED', 'TERMINATED', 'EXPIRED')),
    
    CONSTRAINT tenancies_date_check
        CHECK (lease_end_date IS NULL OR lease_end_date >= lease_start_date),
    
    CONSTRAINT tenancies_version_check
        CHECK (version >= 1),
    
    -- Ensure tenant has at most one active tenancy
    CONSTRAINT tenant_unique_active_tenancy
        EXCLUDE (USING gist (tenant_subject_id WITH =, status WITH =) WHERE (status = 'ACTIVE'))
);

CREATE INDEX IF NOT EXISTS tenancies_tenant_subject_id_idx
    ON tenancies (tenant_subject_id);

CREATE INDEX IF NOT EXISTS tenancies_unit_id_idx
    ON tenancies (unit_id);

CREATE INDEX IF NOT EXISTS tenancies_status_idx
    ON tenancies (status);

CREATE INDEX IF NOT EXISTS tenancies_invited_by_idx
    ON tenancies (invited_by_landlord_profile_id);

CREATE INDEX IF NOT EXISTS tenancies_lease_dates_idx
    ON tenancies (lease_start_date, lease_end_date);

-- Trigger to update updated_at timestamp
CREATE TRIGGER tenancies_updated_at_trigger
    BEFORE UPDATE ON tenancies
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
