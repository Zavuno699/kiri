CREATE TABLE IF NOT EXISTS identity_sessions (
    id UUID PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    credential_id UUID NOT NULL REFERENCES identity_credentials(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL UNIQUE,
    revocation_id TEXT NOT NULL UNIQUE,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,

    CONSTRAINT identity_sessions_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS identity_sessions_subject_id_idx
    ON identity_sessions (subject_id);

CREATE INDEX IF NOT EXISTS identity_sessions_session_id_idx
    ON identity_sessions (session_id);

CREATE INDEX IF NOT EXISTS identity_sessions_revocation_id_idx
    ON identity_sessions (revocation_id);

CREATE INDEX IF NOT EXISTS identity_sessions_expires_idx
    ON identity_sessions (expires_at);
