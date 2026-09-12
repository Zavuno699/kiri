CREATE TABLE IF NOT EXISTS payment_idempotency_claims (
    id UUID PRIMARY KEY,
    provider STRING NOT NULL,
    idempotency_key STRING NOT NULL,
    request_hash STRING NOT NULL,
    payment_reference STRING NOT NULL,
    status STRING NOT NULL,
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
