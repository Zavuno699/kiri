ALTER TABLE payments
    ADD COLUMN request_hash STRING NOT NULL DEFAULT '';

CREATE INDEX payments_provider_idempotency_idx
    ON payments (provider, idempotency_key);

CREATE INDEX payments_request_hash_idx
    ON payments (request_hash);
