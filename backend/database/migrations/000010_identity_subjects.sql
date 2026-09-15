CREATE TABLE IF NOT EXISTS identity_subjects (
    id UUID PRIMARY KEY,
    subject_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    roles TEXT[] NOT NULL DEFAULT '{}',
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,

    CONSTRAINT identity_subjects_email_check
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),

    CONSTRAINT identity_subjects_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS identity_subjects_subject_id_idx
    ON identity_subjects (subject_id);

CREATE INDEX IF NOT EXISTS identity_subjects_email_idx
    ON identity_subjects (email);
