-- Device credentials table for storing encrypted device API secrets
-- Uses envelope encryption: secret is encrypted with a data encryption key (DEK),
-- the DEK is encrypted with a master key (KMS/Vault) for production.
-- For development, uses AES-GCM with a static key (NOT production-safe).

CREATE TABLE IF NOT EXISTS device_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    credential_type TEXT NOT NULL,
    
    -- Encrypted secret (never plaintext)
    encrypted_secret BYTEA NOT NULL,
    
    -- Encryption metadata
    encryption_algorithm TEXT NOT NULL DEFAULT 'AES-GCM-256',
    key_id TEXT, -- KMS key ID for production
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    provisioned_by UUID NOT NULL REFERENCES identity_subjects(id),
    provisioned_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    revoked_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT device_credentials_type_check
        CHECK (credential_type IN ('API_KEY', 'API_SECRET', 'ACCESS_TOKEN', 'CERTIFICATE')),
    
    CONSTRAINT device_credentials_status_check
        CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
    
    CONSTRAINT device_credentials_version_check
        CHECK (version >= 1),
    
    -- Ensure one active credential per device per type
    CONSTRAINT device_credentials_unique_active
        EXCLUDE (device_id WITH =, credential_type WITH =)
        WHERE (status = 'ACTIVE')
);

CREATE INDEX IF NOT EXISTS device_credentials_device_id_idx
    ON device_credentials (device_id);

CREATE INDEX IF NOT EXISTS device_credentials_status_idx
    ON device_credentials (status);

CREATE INDEX IF NOT EXISTS device_credentials_provisioned_by_idx
    ON device_credentials (provisioned_by);
