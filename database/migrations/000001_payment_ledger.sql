-- KiriLock payment ledger
--
-- Financial state is authoritative in CockroachDB.
-- Kafka/webhooks are delivery mechanisms, not the source of truth.

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY,

    tenant_id UUID NOT NULL,

    reference STRING NOT NULL,

    provider STRING NOT NULL,

    provider_charge_id STRING NULL,

    amount_ugx INT8 NOT NULL,

    currency STRING NOT NULL,

    status STRING NOT NULL,

    idempotency_key STRING NOT NULL,

    correlation_id STRING NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    settled_at TIMESTAMPTZ NULL,

    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT payments_reference_unique
        UNIQUE (reference),

    CONSTRAINT payments_provider_charge_unique
        UNIQUE (provider, provider_charge_id),

    CONSTRAINT payments_idempotency_unique
        UNIQUE (provider, idempotency_key),

    CONSTRAINT payments_amount_positive
        CHECK (amount_ugx > 0),

    CONSTRAINT payments_currency_check
        CHECK (currency = 'UGX'),

    CONSTRAINT payments_status_check
        CHECK (
            status IN (
                'PENDING',
                'SETTLED',
                'FAILED',
                'CANCELLED'
            )
        )
);

CREATE INDEX IF NOT EXISTS payments_tenant_idx
    ON payments (tenant_id);

CREATE INDEX IF NOT EXISTS payments_status_idx
    ON payments (status);

CREATE INDEX IF NOT EXISTS payments_created_at_idx
    ON payments (created_at);

CREATE TABLE IF NOT EXISTS payment_webhook_receipts (
    id UUID PRIMARY KEY,

    provider STRING NOT NULL,

    provider_event_id STRING NOT NULL,

    payment_id UUID NOT NULL,

    provider_charge_id STRING NULL,

    payload_hash STRING NOT NULL,

    received_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    processed_at TIMESTAMPTZ NULL,

    status STRING NOT NULL,

    CONSTRAINT payment_webhook_payment_fk
        FOREIGN KEY (payment_id) REFERENCES payments (id),

    CONSTRAINT payment_webhook_provider_event_unique
        UNIQUE (provider, provider_event_id),

    CONSTRAINT payment_webhook_status_check
        CHECK (
            status IN (
                'RECEIVED',
                'PROCESSED',
                'REJECTED'
            )
        )
);

CREATE INDEX IF NOT EXISTS payment_webhook_payment_idx
    ON payment_webhook_receipts (payment_id);

CREATE INDEX IF NOT EXISTS payment_webhook_charge_idx
    ON payment_webhook_receipts (provider, provider_charge_id);
