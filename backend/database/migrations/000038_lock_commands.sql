-- Lock command entity with explicit state machine
-- Commands are distinct from device status and have their own lifecycle
-- Requested → Authorized → Dispatched → Acknowledged/Executed
-- Plus Denied/Failed/Expired/Timeout/Cancelled paths

CREATE TYPE lock_command_status AS ENUM (
    'REQUESTED',
    'AUTHORIZED',
    'DENIED',
    'DISPATCHED',
    'ACKNOWLEDGED',
    'EXECUTED',
    'FAILED',
    'EXPIRED',
    'TIMEOUT',
    'CANCELLED'
);

CREATE TABLE lock_commands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Command details
    lock_id UUID NOT NULL,
    operation VARCHAR(20) NOT NULL, -- 'lock', 'unlock'
    status lock_command_status NOT NULL DEFAULT 'REQUESTED',
    
    -- Authorization
    tenant_subject_id UUID,
    tenancy_id UUID,
    unit_id UUID,
    authorization_reason TEXT,
    
    -- Idempotency
    idempotency_key VARCHAR(255) NOT NULL,
    
    -- Dispatch
    dispatched_at TIMESTAMPTZ,
    device_acknowledged_at TIMESTAMPTZ,
    executed_at TIMESTAMPTZ,
    
    -- Failure/cancellation
    failure_reason TEXT,
    cancelled_by UUID,
    cancelled_at TIMESTAMPTZ,
    
    -- Audit
    correlation_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    -- Constraints
    CONSTRAINT lock_commands_operation_check
        CHECK (operation IN ('lock', 'unlock')),
    
    CONSTRAINT lock_commands_status_check
        CHECK (status IN ('REQUESTED', 'AUTHORIZED', 'DENIED', 'DISPATCHED', 'ACKNOWLEDGED', 'EXECUTED', 'FAILED', 'EXPIRED', 'TIMEOUT', 'CANCELLED')),
    
    CONSTRAINT lock_commands_idempotency_unique
        UNIQUE (idempotency_key),
    
    -- Foreign key to locks (when table exists)
    -- CONSTRAINT lock_commands_lock_fk
    --     FOREIGN KEY (lock_id) REFERENCES locks(id) ON DELETE CASCADE
);

CREATE INDEX idx_lock_commands_lock_id ON lock_commands(lock_id);
CREATE INDEX idx_lock_commands_tenant_subject_id ON lock_commands(tenant_subject_id);
CREATE INDEX idx_lock_commands_status ON lock_commands(status);
CREATE INDEX idx_lock_commands_idempotency_key ON lock_commands(idempotency_key);
CREATE INDEX idx_lock_commands_created_at ON lock_commands(created_at);

-- Trigger to update updated_at timestamp
CREATE TRIGGER lock_commands_updated_at_trigger
    BEFORE UPDATE ON lock_commands
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();

-- Function to validate status transitions
CREATE OR REPLACE FUNCTION validate_lock_command_status_transition()
RETURNS TRIGGER AS $$
BEGIN
    -- Only allow valid status transitions
    IF NEW.status <> OLD.status THEN
        CASE OLD.status
            WHEN 'REQUESTED' THEN
                IF NEW.status NOT IN ('AUTHORIZED', 'DENIED', 'CANCELLED', 'EXPIRED') THEN
                    RAISE EXCEPTION 'Invalid status transition from REQUESTED to %', NEW.status;
                END IF;
            WHEN 'AUTHORIZED' THEN
                IF NEW.status NOT IN ('DISPATCHED', 'CANCELLED', 'EXPIRED', 'TIMEOUT') THEN
                    RAISE EXCEPTION 'Invalid status transition from AUTHORIZED to %', NEW.status;
                END IF;
            WHEN 'DISPATCHED' THEN
                IF NEW.status NOT IN ('ACKNOWLEDGED', 'EXECUTED', 'FAILED', 'TIMEOUT', 'CANCELLED') THEN
                    RAISE EXCEPTION 'Invalid status transition from DISPATCHED to %', NEW.status;
                END IF;
            WHEN 'ACKNOWLEDGED' THEN
                IF NEW.status NOT IN ('EXECUTED', 'FAILED', 'CANCELLED') THEN
                    RAISE EXCEPTION 'Invalid status transition from ACKNOWLEDGED to %', NEW.status;
                END IF;
            ELSE
                RAISE EXCEPTION 'Cannot transition from % status', OLD.status;
            END CASE;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lock_commands_status_transition_trigger
    BEFORE UPDATE ON lock_commands
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION validate_lock_command_status_transition();
