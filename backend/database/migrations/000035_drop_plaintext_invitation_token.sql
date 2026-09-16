-- Drop plaintext invitation_token column, keep only invitation_token_hash
-- Tokens are now only stored as SHA-256 hashes for security
ALTER TABLE tenancies DROP COLUMN IF EXISTS invitation_token;
