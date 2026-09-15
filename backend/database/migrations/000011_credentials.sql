CREATE TABLE IF NOT EXISTS identity_credentials (
    id UUID PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    credential_type TEXT NOT NULL,
    fingerprint TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL DEFAULT 'active',
    issued_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,

    CONSTRAINT identity_credentials_type_check
        CHECK (credential_type IN ('webauthn', 'device', 'service', 'session')),

    CONSTRAINT identity_credentials_state_check
        CHECK (state IN ('active', 'suspended', 'revoked', 'expired')),

    CONSTRAINT identity_credentials_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS identity_credentials_subject_id_idx
    ON identity_credentials (subject_id);

CREATE INDEX IF NOT EXISTS identity_credentials_fingerprint_idx
    ON identity_credentials (fingerprint);

CREATE INDEX IF NOT EXISTS identity_credentials_state_expires_idx
    ON identity_credentials (state, expires_at);
