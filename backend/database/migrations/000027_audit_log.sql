-- Audit log table for security-sensitive operations
-- Records: actor, action, resource, result, timestamp, correlation ID
-- Never logs secrets/tokens/PINs
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    actor_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    
    -- JSON representations of old/new values (sanitized, no secrets)
    old_values JSONB,
    new_values JSONB,
    
    -- Request metadata
    correlation_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    
    -- Result
    success BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    
    CONSTRAINT audit_log_event_type_check
        CHECK (event_type IN (
            'auth.login',
            'auth.logout',
            'auth.failed',
            'device.provision',
            'device.credential.store',
            'device.credential.revoke',
            'device.credential.delete',
            'device.assign',
            'device.unassign',
            'lock.assign',
            'lock.unassign',
            'tenancy.create',
            'tenancy.update',
            'tenancy.terminate',
            'payment.settle',
            'payment.reconcile',
            'payment.refund',
            'admin.role.grant',
            'admin.role.revoke',
            'security.key.rotate'
        ))
);

CREATE INDEX IF NOT EXISTS audit_log_actor_id_idx
    ON audit_log (actor_id);

CREATE INDEX IF NOT EXISTS audit_log_resource_idx
    ON audit_log (resource_type, resource_id);

CREATE INDEX IF NOT EXISTS audit_log_correlation_id_idx
    ON audit_log (correlation_id);

CREATE INDEX IF NOT EXISTS audit_log_created_at_idx
    ON audit_log (created_at DESC);

-- Partition by month for performance (optional, uncomment for production)
-- ALTER TABLE audit_log PARTITION BY RANGE (created_at);
