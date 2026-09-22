-- Platform fee policy configuration
-- Versioned, currency-scoped, effective-dated fee policies
-- Historical payment intents retain the fee policy captured at creation

CREATE TYPE fee_type AS ENUM (
    'PERCENTAGE',
    'FIXED',
    'HYBRID'
);

CREATE TABLE platform_fee_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_version VARCHAR(20) NOT NULL UNIQUE,
    
    -- Fee structure
    fee_type fee_type NOT NULL,
    percentage_fee BIGINT, -- in basis points (10000 = 100%), NULL for FIXED
    fixed_fee BIGINT, -- in minor units (cents), NULL for PERCENTAGE
    
    -- Currency scope
    currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    
    -- Effective dates
    effective_from TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    effective_until TIMESTAMPTZ, -- NULL means currently active
    
    -- Metadata
    description TEXT,
    created_by UUID, -- admin who created the policy
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    
    CONSTRAINT platform_fee_policies_fee_type_check
        CHECK (fee_type IN ('PERCENTAGE', 'FIXED', 'HYBRID')),
    
    CONSTRAINT platform_fee_policies_percentage_check
        CHECK (
            (fee_type = 'PERCENTAGE' AND percentage_fee IS NOT NULL AND percentage_fee >= 0 AND percentage_fee <= 10000) OR
            (fee_type = 'FIXED' AND percentage_fee IS NULL) OR
            (fee_type = 'HYBRID' AND percentage_fee IS NOT NULL AND percentage_fee >= 0 AND percentage_fee <= 10000)
        ),
    
    CONSTRAINT platform_fee_policies_fixed_check
        CHECK (
            (fee_type = 'PERCENTAGE' AND fixed_fee IS NULL) OR
            (fee_type = 'FIXED' AND fixed_fee IS NOT NULL AND fixed_fee >= 0) OR
            (fee_type = 'HYBRID' AND fixed_fee IS NOT NULL AND fixed_fee >= 0)
        ),
    
    CONSTRAINT platform_fee_policies_effective_dates_check
        CHECK (effective_until IS NULL OR effective_until > effective_from),
    
    CONSTRAINT platform_fee_policies_currency_check
        CHECK (currency ~ '^[A-Z]{3}$')
);

CREATE INDEX idx_platform_fee_policies_version ON platform_fee_policies(policy_version);
CREATE INDEX idx_platform_fee_policies_currency ON platform_fee_policies(currency);
CREATE INDEX idx_platform_fee_policies_effective_dates ON platform_fee_policies(effective_from, effective_until);
CREATE INDEX idx_platform_fee_policies_active ON platform_fee_policies(effective_from, effective_until) 
    WHERE effective_until IS NULL;

-- Function to get active fee policy for a currency
CREATE OR REPLACE FUNCTION get_active_fee_policy(p_currency VARCHAR(3))
RETURNS TABLE (
    id UUID,
    policy_version VARCHAR(20),
    fee_type fee_type,
    percentage_fee BIGINT,
    fixed_fee BIGINT,
    currency VARCHAR(3)
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.policy_version, p.fee_type, p.percentage_fee, p.fixed_fee, p.currency
    FROM platform_fee_policies p
    WHERE p.currency = p_currency
      AND p.effective_from <= current_timestamp
      AND (p.effective_until IS NULL OR p.effective_until > current_timestamp)
    ORDER BY p.effective_from DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;
