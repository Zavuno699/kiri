-- Fix money representation: change monthly_rent_amount from DECIMAL to BIGINT (minor units)
-- This aligns PaymentResponsibility with billing-service Payment.AmountMinor (int64)

-- First, convert existing DECIMAL values to BIGINT (multiply by 100 for cents)
-- Data migration: existing monthly_rent_amount values need to be converted to minor units
UPDATE payment_responsibilities
SET monthly_rent_amount = ROUND(monthly_rent_amount * 100)::BIGINT
WHERE monthly_rent_amount IS NOT NULL;

-- Alter column type from DECIMAL(10,2) to BIGINT
ALTER TABLE payment_responsibilities
ALTER COLUMN monthly_rent_amount TYPE BIGINT USING monthly_rent_amount::BIGINT;

-- Update the constraint to reflect the new type
ALTER TABLE payment_responsibilities
DROP CONSTRAINT IF EXISTS payment_responsibilities_monthly_rent_check;

ALTER TABLE payment_responsibilities
ADD CONSTRAINT payment_responsibilities_monthly_rent_check
    CHECK (monthly_rent_amount IS NULL OR monthly_rent_amount >= 0);

-- Add comment to clarify minor units
COMMENT ON COLUMN payment_responsibilities.monthly_rent_amount IS 'Monthly rent amount in minor units (cents), consistent with billing-service Payment.AmountMinor';
