-- Add token hash for secure token storage
-- Stores SHA-256 hash of invitation token instead of plaintext
-- Unique index ensures one-time use
ALTER TABLE tenancies
ADD COLUMN invitation_token_hash TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS tenancies_token_hash_idx
    ON tenancies (invitation_token_hash)
    WHERE invitation_token_hash IS NOT NULL;

COMMENT ON COLUMN tenancies.invitation_token_hash IS 'SHA-256 hash of invitation token for secure lookup';
