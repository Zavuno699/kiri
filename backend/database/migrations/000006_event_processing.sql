CREATE TABLE IF NOT EXISTS event_processing (
    consumer_name STRING NOT NULL,
    event_id UUID NOT NULL,
    event_type STRING NOT NULL,
    status STRING NOT NULL,
    correlation_id UUID NULL,
    occurred_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ NULL,
    version INT8 NOT NULL DEFAULT 1,

    PRIMARY KEY (consumer_name, event_id),

    CONSTRAINT event_processing_status_check
        CHECK (status IN ('PROCESSING', 'COMPLETED')),

    CONSTRAINT event_processing_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS event_processing_status_idx
    ON event_processing (consumer_name, status);
