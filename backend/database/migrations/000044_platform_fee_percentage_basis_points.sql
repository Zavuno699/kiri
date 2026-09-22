-- Convert platform fee percentage from DECIMAL to BIGINT (basis points)
-- 1.0 (100%) becomes 10000 basis points
-- 0.10 (10%) becomes 1000 basis points
-- This enables integer arithmetic for fee calculation

BEGIN;

-- 1. Add new column for basis points
ALTER TABLE platform_fee_policies ADD COLUMN percentage_fee_basis BIGINT;

-- 2. Convert existing DECIMAL values to basis points
UPDATE platform_fee_policies
SET percentage_fee_basis = CAST(percentage_fee * 10000 AS BIGINT)
WHERE percentage_fee IS NOT NULL;

-- 3. Drop old column
ALTER TABLE platform_fee_policies DROP COLUMN percentage_fee;

-- 4. Rename new column
ALTER TABLE platform_fee_policies RENAME COLUMN percentage_fee_basis TO percentage_fee;

-- 5. Update constraints to use BIGINT range (0-10000 for 0-100%)
ALTER TABLE platform_fee_policies
DROP CONSTRAINT IF EXISTS platform_fee_policies_percentage_check;

ALTER TABLE platform_fee_policies
ADD CONSTRAINT platform_fee_policies_percentage_check
CHECK (
    (fee_type = 'PERCENTAGE' AND percentage_fee IS NOT NULL AND percentage_fee >= 0 AND percentage_fee <= 10000) OR
    (fee_type = 'FIXED' AND percentage_fee IS NULL) OR
    (fee_type = 'HYBRID' AND percentage_fee IS NOT NULL AND percentage_fee >= 0 AND percentage_fee <= 10000)
);

-- 6. Update function return type
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

COMMIT;
