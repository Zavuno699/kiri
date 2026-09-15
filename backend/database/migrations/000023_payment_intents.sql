-- Payment Intent / Invoice entity
-- Captures intent at creation time with fee policy snapshot
-- Historical intents retain fee policy even after policy changes

CREATE TYPE payment_intent_status AS ENUM (
    'PENDING',
    'CREATED',
    'CONFIRMED',
    'PROCESSING',
    'SETTLED',
    'FAILED',
    'CANCELLED',
    'RECONCILIATION_EXCEPTION'
);

CREATE TABLE payment_intents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_reference VARCHAR(50) NOT NULL UNIQUE,
    
    -- Links to identity-service entities
    payment_responsibility_id UUID NOT NULL REFERENCES payment_responsibilities(id) ON DELETE RESTRICT,
    
    -- Derived entities (for audit and reconciliation)
    tenant_subject_id UUID NOT NULL,
    tenancy_id UUID NOT NULL,
    unit_id UUID NOT NULL,
    property_id UUID NOT NULL,
    landlord_profile_id UUID NOT NULL,
    
    -- Financial details (all in integer minor units)
    gross_amount BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    
    -- Fee policy snapshot (immutable)
    fee_policy_id UUID NOT NULL REFERENCES platform_fee_policies(id),
    fee_policy_version VARCHAR(20) NOT NULL,
    expected_commission BIGINT NOT NULL,
    expected_settlement BIGINT NOT NULL,
    
    -- Billing period
    billing_period_start TIMESTAMPTZ NOT NULL,
    billing_period_end TIMESTAMPTZ NOT NULL,
    
    -- Status
    status payment_intent_status NOT NULL DEFAULT 'PENDING',
    
    -- Provider transaction (for reconciliation)
    provider_transaction_id VARCHAR(100) UNIQUE,
    provider VARCHAR(50),
    
    -- Metadata
    description TEXT,
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    settled_at TIMESTAMPTZ,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT payment_intents_status_check
        CHECK (status IN ('PENDING', 'CREATED', 'CONFIRMED', 'PROCESSING', 'SETTLED', 'FAILED', 'CANCELLED', 'RECONCILIATION_EXCEPTION')),
    
    CONSTRAINT payment_intents_amounts_check
        CHECK (
            gross_amount >= 0 AND
            expected_commission >= 0 AND
            expected_settlement >= 0 AND
            gross_amount = expected_commission + expected_settlement
        ),
    
    CONSTRAINT payment_intents_currency_check
        CHECK (currency ~ '^[A-Z]{3}$'),
    
    CONSTRAINT payment_intents_billing_period_check
        CHECK (billing_period_end > billing_period_start),
    
    CONSTRAINT payment_intents_version_check
        CHECK (version >= 1)
);

CREATE INDEX idx_payment_intents_reference ON payment_intents(payment_reference);
CREATE INDEX idx_payment_intents_responsibility ON payment_intents(payment_responsibility_id);
CREATE INDEX idx_payment_intents_tenant ON payment_intents(tenant_subject_id);
CREATE INDEX idx_payment_intents_tenancy ON payment_intents(tenancy_id);
CREATE INDEX idx_payment_intents_landlord ON payment_intents(landlord_profile_id);
CREATE INDEX idx_payment_intents_status ON payment_intents(status);
CREATE INDEX idx_payment_intents_provider_tx ON payment_intents(provider_transaction_id);
CREATE INDEX idx_payment_intents_billing_period ON payment_intents(billing_period_start, billing_period_end);
CREATE INDEX idx_payment_intents_fee_policy ON payment_intents(fee_policy_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER payment_intents_updated_at_trigger
    BEFORE UPDATE ON payment_intents
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
