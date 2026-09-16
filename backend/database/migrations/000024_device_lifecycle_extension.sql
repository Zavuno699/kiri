-- Extended device lifecycle states
-- Extends from PROVISIONING/ACTIVE/SUSPENDED/RETIRED
-- To: UNREGISTERED → INVENTORIED → PROVISIONED → ASSIGNED → ACTIVE → SUSPENDED/MAINTENANCE → RETIRED

-- First, update the lifecycle state check constraints to include new states
ALTER TABLE devices 
DROP CONSTRAINT IF EXISTS devices_lifecycle_state_chk;

ALTER TABLE devices 
ADD CONSTRAINT devices_lifecycle_state_chk
    CHECK (lifecycle_state IN (
        'UNREGISTERED',
        'INVENTORIED', 
        'PROVISIONED',
        'ASSIGNED',
        'ACTIVE',
        'SUSPENDED',
        'MAINTENANCE',
        'RETIRED'
    ));

ALTER TABLE gateways 
DROP CONSTRAINT IF EXISTS gateways_lifecycle_state_chk;

ALTER TABLE gateways 
ADD CONSTRAINT gateways_lifecycle_state_chk
    CHECK (lifecycle_state IN (
        'UNREGISTERED',
        'INVENTORIED', 
        'PROVISIONED',
        'ASSIGNED',
        'ACTIVE',
        'SUSPENDED',
        'MAINTENANCE',
        'RETIRED'
    ));

-- Add credential reference fields (separate from device identity)
-- These store references to secrets, never the secrets themselves
ALTER TABLE devices 
ADD COLUMN IF NOT EXISTS credential_reference VARCHAR(255),
ADD COLUMN IF NOT EXISTS credential_status VARCHAR(50) DEFAULT 'NONE',
ADD COLUMN IF NOT EXISTS credential_provisioned_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS credential_provisioned_by UUID;

-- Add constraints for credential status
ALTER TABLE devices 
ADD CONSTRAINT devices_credential_status_chk
    CHECK (credential_status IN (
        'NONE',
        'PENDING',
        'ACTIVE',
        'REVOKED',
        'EXPIRED'
    ));

-- Add indexes for the new fields
CREATE INDEX IF NOT EXISTS devices_lifecycle_state_idx 
    ON devices (lifecycle_state);

CREATE INDEX IF NOT EXISTS devices_credential_status_idx 
    ON devices (credential_status);

-- Add comment to document the credential separation
COMMENT ON COLUMN devices.credential_reference IS 'Reference to externally stored device credentials (never the actual secret)';
COMMENT ON COLUMN devices.credential_status IS 'Status of credential provisioning (NONE/PENDING/ACTIVE/REVOKED/EXPIRED)';
COMMENT ON COLUMN devices.credential_provisioned_at IS 'Timestamp when credentials were provisioned';
COMMENT ON COLUMN devices.credential_provisioned_by IS 'Admin who provisioned the credentials';

-- Create a function to validate state transitions
CREATE OR REPLACE FUNCTION validate_device_lifecycle_transition(
    current_state VARCHAR(50),
    new_state VARCHAR(50)
) RETURNS BOOLEAN AS $$
BEGIN
    -- Allow staying in same state
    IF current_state = new_state THEN
        RETURN TRUE;
    END IF;
    
    -- Define valid transitions
    CASE current_state
        WHEN 'UNREGISTERED' THEN
            RETURN new_state IN ('INVENTORIED', 'RETIRED');
        WHEN 'INVENTORIED' THEN
            RETURN new_state IN ('PROVISIONED', 'RETIRED');
        WHEN 'PROVISIONED' THEN
            RETURN new_state IN ('ASSIGNED', 'MAINTENANCE', 'RETIRED');
        WHEN 'ASSIGNED' THEN
            RETURN new_state IN ('ACTIVE', 'MAINTENANCE', 'SUSPENDED', 'RETIRED');
        WHEN 'ACTIVE' THEN
            RETURN new_state IN ('SUSPENDED', 'MAINTENANCE', 'RETIRED');
        WHEN 'SUSPENDED' THEN
            RETURN new_state IN ('ACTIVE', 'MAINTENANCE', 'RETIRED');
        WHEN 'MAINTENANCE' THEN
            RETURN new_state IN ('ACTIVE', 'SUSPENDED', 'ASSIGNED', 'RETIRED');
        WHEN 'RETIRED' THEN
            RETURN FALSE; -- Terminal state
        ELSE
            RETURN FALSE;
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to enforce state transitions
CREATE OR REPLACE FUNCTION enforce_device_lifecycle_transition()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lifecycle_state IS DISTINCT FROM OLD.lifecycle_state THEN
        IF NOT validate_device_lifecycle_transition(OLD.lifecycle_state, NEW.lifecycle_state) THEN
            RAISE EXCEPTION 'Invalid device lifecycle transition from % to %', 
                OLD.lifecycle_state, NEW.lifecycle_state;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS device_lifecycle_transition_trigger ON devices;
CREATE TRIGGER device_lifecycle_transition_trigger
    BEFORE UPDATE OF lifecycle_state ON devices
    FOR EACH ROW
    EXECUTE FUNCTION enforce_device_lifecycle_transition();

-- Same for gateways
DROP TRIGGER IF EXISTS gateway_lifecycle_transition_trigger ON gateways;
CREATE TRIGGER gateway_lifecycle_transition_trigger
    BEFORE UPDATE OF lifecycle_state ON gateways
    FOR EACH ROW
    EXECUTE FUNCTION enforce_device_lifecycle_transition();
