-- Rename amount_ugx to amount_minor for consistency with minor-unit money representation
-- This aligns the database schema with the Go model's AmountMinor field (int64 minor units)

ALTER TABLE payments
RENAME COLUMN amount_ugx TO amount_minor;

-- Update constraint name to match new column
ALTER TABLE payments
DROP CONSTRAINT IF EXISTS payments_amount_positive;

ALTER TABLE payments
ADD CONSTRAINT payments_amount_positive
    CHECK (amount_minor > 0);
