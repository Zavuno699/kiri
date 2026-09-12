CREATE TABLE IF NOT EXISTS locks (
    id UUID PRIMARY KEY,
    lease_id UUID NOT NULL,
    device_id UUID NOT NULL,
    state STRING NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT locks_state_check
        CHECK (state IN ('ACTIVE', 'LOCKED', 'FROZEN')),

    CONSTRAINT locks_version_check
        CHECK (version >= 1),

    CONSTRAINT locks_lease_device_unique
        UNIQUE (lease_id, device_id)
);

CREATE INDEX IF NOT EXISTS locks_lease_id_idx
    ON locks (lease_id);
