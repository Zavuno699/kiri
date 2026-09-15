-- Payment responsibility links tenants to payment accounts
-- Active uniqueness enforcement to prevent conflicting payment responsibility

CREATE TYPE payment_responsibility_status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'TRANSFERRED'
);

CREATE TABLE IF NOT EXISTS payment_responsibilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    payment_account_id UUID NOT NULL REFERENCES payment_accounts(id) ON DELETE CASCADE,
    tenancy_id UUID NOT NULL REFERENCES tenancies(id) ON DELETE CASCADE,
    
    -- Responsibility status
    status payment_responsibility_status NOT NULL DEFAULT 'ACTIVE',
    
    -- Responsibility details
    responsible_for_rent BOOLEAN DEFAULT TRUE,
    responsible_for_utilities BOOLEAN DEFAULT FALSE,
    responsible_for_fees BOOLEAN DEFAULT FALSE,
    
    -- Amount details
    monthly_rent_amount DECIMAL(10, 2),
    
    -- Metadata
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT payment_responsibilities_status_check
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'TRANSFERRED')),
    
    CONSTRAINT payment_responsibilities_monthly_rent_check
        CHECK (monthly_rent_amount IS NULL OR monthly_rent_amount >= 0),
    
    CONSTRAINT payment_responsibilities_version_check
        CHECK (version >= 1),
    
    -- Ensure tenant has at most one active payment responsibility
    CONSTRAINT tenant_unique_active_payment_responsibility
        EXCLUDE (USING gist (tenant_subject_id WITH =, status WITH =) WHERE (status = 'ACTIVE'))
);

CREATE INDEX IF NOT EXISTS payment_responsibilities_tenant_subject_id_idx
    ON payment_responsibilities (tenant_subject_id);

CREATE INDEX IF NOT EXISTS payment_responsibilities_payment_account_id_idx
    ON payment_responsibilities (payment_account_id);

CREATE INDEX IF NOT EXISTS payment_responsibilities_tenancy_id_idx
    ON payment_responsibilities (tenancy_id);

CREATE INDEX IF NOT EXISTS payment_responsibilities_status_idx
    ON payment_responsibilities (status);

-- Trigger to update updated_at timestamp
CREATE TRIGGER payment_responsibilities_updated_at_trigger
    BEFORE UPDATE ON payment_responsibilities
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
