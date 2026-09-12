CREATE TABLE IF NOT EXISTS device_event_outbox (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL,
    event_type TEXT NOT NULL,
    event_version INT NOT NULL,
    aggregate_id UUID NOT NULL,
    correlation_id TEXT NOT NULL,
    causation_id TEXT,
    producer TEXT NOT NULL,
    payload JSONB NOT NULL,

    status TEXT NOT NULL DEFAULT 'PENDING',
    attempts INT NOT NULL DEFAULT 0,
    available_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    locked_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    last_error TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,

    CONSTRAINT device_event_outbox_event_id_unique
        UNIQUE (event_id),

    CONSTRAINT device_event_outbox_status_check
        CHECK (status IN ('PENDING', 'PROCESSING', 'PUBLISHED', 'FAILED')),

    CONSTRAINT device_event_outbox_event_version_check
        CHECK (event_version >= 1),

    CONSTRAINT device_event_outbox_attempts_check
        CHECK (attempts >= 0),

    CONSTRAINT device_event_outbox_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS device_event_outbox_publish_idx
    ON device_event_outbox (status, available_at, created_at);

CREATE INDEX IF NOT EXISTS device_event_outbox_aggregate_idx
    ON device_event_outbox (aggregate_id, created_at);
