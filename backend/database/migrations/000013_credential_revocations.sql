CREATE TABLE IF NOT EXISTS identity_credential_revocations (
    id UUID PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    credential_id UUID REFERENCES identity_credentials(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    revoked_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,

    CONSTRAINT identity_credential_revocations_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS identity_credential_revocations_subject_id_idx
    ON identity_credential_revocations (subject_id);

CREATE INDEX IF NOT EXISTS identity_credential_revocations_credential_id_idx
    ON identity_credential_revocations (credential_id);

CREATE INDEX IF NOT EXISTS identity_credential_revocations_expires_idx
    ON identity_credential_revocations (expires_at);
