-- Payment account/subscription abstraction
-- Provider-reference fields only, NO raw secrets/card/bank data

CREATE TYPE payment_account_status AS ENUM (
    'PENDING',
    'ACTIVE',
    'PAUSED',
    'SUSPENDED',
    'CANCELLED',
    'FAILED'
);

CREATE TYPE payment_provider AS ENUM (
    'STRIPE',
    'PAYPAL',
    'BANK_TRANSFER',
    'CHECK',
    'OTHER'
);

CREATE TABLE IF NOT EXISTS payment_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landlord_profile_id UUID NOT NULL REFERENCES landlord_profiles(id) ON DELETE CASCADE,
    
    -- Account information
    account_name TEXT NOT NULL,
    provider payment_provider NOT NULL,
    provider_account_id TEXT, -- External provider reference, encrypted in production
    provider_customer_id TEXT, -- External customer reference, encrypted in production
    
    -- Status
    status payment_account_status NOT NULL DEFAULT 'PENDING',
    
    -- Metadata
    currency TEXT DEFAULT 'USD',
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT payment_accounts_status_check
        CHECK (status IN ('PENDING', 'ACTIVE', 'PAUSED', 'SUSPENDED', 'CANCELLED', 'FAILED')),
    
    CONSTRAINT payment_accounts_provider_check
        CHECK (provider IN ('STRIPE', 'PAYPAL', 'BANK_TRANSFER', 'CHECK', 'OTHER')),
    
    CONSTRAINT payment_accounts_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS payment_accounts_landlord_profile_id_idx
    ON payment_accounts (landlord_profile_id);

CREATE INDEX IF NOT EXISTS payment_accounts_status_idx
    ON payment_accounts (status);

CREATE INDEX IF NOT EXISTS payment_accounts_provider_idx
    ON payment_accounts (provider);

-- Trigger to update updated_at timestamp
CREATE TRIGGER payment_accounts_updated_at_trigger
    BEFORE UPDATE ON payment_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
