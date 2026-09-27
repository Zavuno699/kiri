CREATE TABLE IF NOT EXISTS payment_idempotency_claims (
    id UUID PRIMARY KEY,
    provider TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    request_hash TEXT NOT NULL,
    payment_reference TEXT NOT NULL,
    status TEXT NOT NULL,
    payment_id UUID NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT payment_idempotency_claims_status_ck
        CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')),

    CONSTRAINT payment_idempotency_claims_unique_key
        UNIQUE (provider, idempotency_key)
);

CREATE INDEX payment_idempotency_claims_payment_idx
    ON payment_idempotency_claims (payment_id);
