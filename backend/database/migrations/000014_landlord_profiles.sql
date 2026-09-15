-- Landlord profiles with verification lifecycle
-- Extends identity_subjects for landlord-specific data and verification state

CREATE TYPE landlord_verification_status AS ENUM (
    'PENDING',
    'INFORMATION_SUBMITTED',
    'UNDER_REVIEW',
    'VERIFIED',
    'REJECTED',
    'NEEDS_MORE_INFORMATION',
    'SUSPENDED'
);

CREATE TYPE landlord_authorization_state AS ENUM (
    'ACCOUNT_CREATED',
    'IDENTITY_VERIFIED',
    'OWNERSHIP_VERIFIED',
    'PAYMENT_VERIFIED',
    'OPERATIONAL_ACCESS_ENABLED'
);

CREATE TABLE IF NOT EXISTS landlord_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL UNIQUE REFERENCES identity_subjects(id) ON DELETE CASCADE,
    
    -- Verification state
    verification_status landlord_verification_status NOT NULL DEFAULT 'PENDING',
    authorization_state landlord_authorization_state NOT NULL DEFAULT 'ACCOUNT_CREATED',
    
    -- Profile information (never store raw identity documents)
    legal_name TEXT,
    business_name TEXT,
    tax_id TEXT, -- Encrypted in production
    
    -- Contact information
    phone TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT,
    
    -- Verification metadata
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT landlord_profiles_verification_status_check
        CHECK (verification_status IN ('PENDING', 'INFORMATION_SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'NEEDS_MORE_INFORMATION', 'SUSPENDED')),
    
    CONSTRAINT landlord_profiles_authorization_state_check
        CHECK (authorization_state IN ('ACCOUNT_CREATED', 'IDENTITY_VERIFIED', 'OWNERSHIP_VERIFIED', 'PAYMENT_VERIFIED', 'OPERATIONAL_ACCESS_ENABLED')),
    
    CONSTRAINT landlord_profiles_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS landlord_profiles_subject_id_idx
    ON landlord_profiles (subject_id);

CREATE INDEX IF NOT EXISTS landlord_profiles_verification_status_idx
    ON landlord_profiles (verification_status);

CREATE INDEX IF NOT EXISTS landlord_profiles_authorization_state_idx
    ON landlord_profiles (authorization_state);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_landlord_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER landlord_profiles_updated_at_trigger
    BEFORE UPDATE ON landlord_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
