ALTER TABLE payment_idempotency_claims
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ NOT NULL
        DEFAULT (current_timestamp + INTERVAL '2 minutes');

CREATE INDEX IF NOT EXISTS payment_idempotency_claims_expiry_idx
    ON payment_idempotency_claims (status, expires_at);
