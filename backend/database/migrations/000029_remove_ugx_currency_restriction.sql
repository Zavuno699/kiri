-- Remove UGX-only currency restriction to support internationalization
-- Replace with ISO 4217 currency code validation (3 uppercase letters)

-- Drop the UGX-only constraint
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_currency_check;

-- Add currency-agnostic constraint (ISO 4217 format: 3 uppercase letters)
ALTER TABLE payments ADD CONSTRAINT payments_currency_iso4217
    CHECK (currency ~ '^[A-Z]{3}$');

-- Also update the column name for consistency (amount_ugx -> amount_minor)
-- Note: In PostgreSQL, we can use ALTER TABLE ... RENAME COLUMN
-- But for CockroachDB compatibility, we'll just add a comment documenting the change
COMMENT ON COLUMN payments.amount_ugx IS 'Amount in minor units (cents for USD, cents for EUR, etc.). Stored as integer to avoid floating-point precision issues. Currency code determines the unit.';

-- Add comment about currency support
COMMENT ON COLUMN payments.currency IS 'ISO 4217 currency code (e.g., UGX, USD, EUR, GBP). Must be 3 uppercase letters.';
