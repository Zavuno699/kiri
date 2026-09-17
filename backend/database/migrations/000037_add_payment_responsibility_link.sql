-- Add payment_responsibility_id to link billing-service payments to identity-service PaymentResponsibility
-- This establishes the canonical payment identity graph: Payment → PaymentResponsibility → Tenancy → Unit → Property → Landlord → PaymentAccount

ALTER TABLE payments
ADD COLUMN payment_responsibility_id UUID REFERENCES payment_responsibilities(id) ON DELETE SET NULL;

-- Add index for efficient lookups by responsibility
CREATE INDEX IF NOT EXISTS payments_payment_responsibility_id_idx
    ON payments (payment_responsibility_id);

-- Add comment explaining the relationship
COMMENT ON COLUMN payments.payment_responsibility_id IS 'Links to identity-service PaymentResponsibility for authoritative ownership tracing (Payment → Responsibility → Tenancy → Unit → Property → Landlord → PaymentAccount)';
