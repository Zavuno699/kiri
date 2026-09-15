-- Migrate payment_responsibilities from DECIMAL to integer minor units
-- Add currency column and convert existing DECIMAL(10,2) to BIGINT (cents)
-- Rounding policy: round to nearest cent (banker's rounding)

-- Add new columns
ALTER TABLE payment_responsibilities
ADD COLUMN monthly_rent_amount_cents BIGINT,
ADD COLUMN currency VARCHAR(3) DEFAULT 'USD';

-- Migrate existing data: convert DECIMAL to cents
-- Example: 1000.50 -> 100050 cents
UPDATE payment_responsibilities
SET monthly_rent_amount_cents = ROUND(monthly_rent_amount * 100)::BIGINT,
    currency = 'USD'
WHERE monthly_rent_amount IS NOT NULL;

-- Set NULL for zero amounts
UPDATE payment_responsibilities
SET monthly_rent_amount_cents = NULL
WHERE monthly_rent_amount = 0 OR monthly_rent_amount IS NULL;

-- Add constraints
ALTER TABLE payment_responsibilities
ADD CONSTRAINT payment_responsibilities_cents_check
    CHECK (monthly_rent_amount_cents IS NULL OR monthly_rent_amount_cents >= 0),
ADD CONSTRAINT payment_responsibilities_currency_check
    CHECK (currency ~ '^[A-Z]{3}$');

-- Drop old column (after verification in production)
-- ALTER TABLE payment_responsibilities DROP COLUMN monthly_rent_amount;

-- Rename new column to old name (after verification in production)
-- ALTER TABLE payment_responsibilities RENAME COLUMN monthly_rent_amount_cents TO monthly_rent_amount;

-- For now, keep both columns for safety during migration
-- Add index on new column
CREATE INDEX idx_payment_responsibilities_cents ON payment_responsibilities(monthly_rent_amount_cents);
CREATE INDEX idx_payment_responsibilities_currency ON payment_responsibilities(currency);
