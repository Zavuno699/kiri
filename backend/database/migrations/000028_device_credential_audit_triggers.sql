-- Audit triggers for security-sensitive operations
-- Must be applied after audit_log table is created (000027)

-- Device credential operations
CREATE OR REPLACE FUNCTION audit_device_credential_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (
        event_type,
        actor_id,
        resource_type,
        resource_id,
        old_values,
        new_values,
        correlation_id,
        ip_address,
        user_agent,
        created_at
    ) VALUES (
        TG_OP,
        COALESCE(NEW.provisioned_by, OLD.provisioned_by),
        'device_credential',
        COALESCE(NEW.id, OLD.id),
        row_to_json(OLD),
        row_to_json(NEW),
        current_setting('request.correlation_id', true),
        current_setting('request.ip_address', true),
        current_setting('request.user_agent', true),
        current_timestamp
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER device_credentials_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON device_credentials
    FOR EACH ROW EXECUTE FUNCTION audit_device_credential_change();

-- Device provisioning
CREATE OR REPLACE FUNCTION audit_device_provisioning()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lifecycle_state = 'PROVISIONED' OR (NEW.credential_status = 'ACTIVE' AND OLD.credential_status != 'ACTIVE') THEN
        INSERT INTO audit_log (
            event_type,
            actor_id,
            resource_type,
            resource_id,
            old_values,
            new_values,
            correlation_id,
            ip_address,
            user_agent,
            created_at
        ) VALUES (
            CASE WHEN NEW.lifecycle_state = 'PROVISIONED' THEN 'device.provision' ELSE 'device.credential.activate' END,
            COALESCE(NEW.credential_provisioned_by, OLD.credential_provisioned_by),
            'device',
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW),
            current_setting('request.correlation_id', true),
            current_setting('request.ip_address', true),
            current_setting('request.user_agent', true),
            current_timestamp
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER device_provisioning_audit_trigger
    AFTER INSERT OR UPDATE ON devices
    FOR EACH ROW EXECUTE FUNCTION audit_device_provisioning();

-- Lock assignment
CREATE OR REPLACE FUNCTION audit_lock_assignment()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'ACTIVE' AND (OLD.status IS NULL OR OLD.status != 'ACTIVE') THEN
        INSERT INTO audit_log (
            event_type,
            actor_id,
            resource_type,
            resource_id,
            old_values,
            new_values,
            correlation_id,
            ip_address,
            user_agent,
            created_at
        ) VALUES (
            'lock.assign',
            current_setting('request.actor_id', true)::UUID,
            'lock_unit_assignment',
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW),
            current_setting('request.correlation_id', true),
            current_setting('request.ip_address', true),
            current_setting('request.user_agent', true),
            current_timestamp
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lock_assignment_audit_trigger
    AFTER INSERT OR UPDATE ON lock_unit_assignments
    FOR EACH ROW EXECUTE FUNCTION audit_lock_assignment();

-- Tenancy operations
CREATE OR REPLACE FUNCTION audit_tenancy_operation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (
        event_type,
        actor_id,
        resource_type,
        resource_id,
        old_values,
        new_values,
        correlation_id,
        ip_address,
        user_agent,
        created_at
    ) VALUES (
        CASE TG_OP WHEN 'INSERT' THEN 'tenancy.create' WHEN 'UPDATE' THEN 'tenancy.update' ELSE 'tenancy.delete' END,
        COALESCE(NEW.landlord_profile_id, OLD.landlord_profile_id),
        'tenancy',
        COALESCE(NEW.id, OLD.id),
        row_to_json(OLD),
        row_to_json(NEW),
        current_setting('request.correlation_id', true),
        current_setting('request.ip_address', true),
        current_setting('request.user_agent', true),
        current_timestamp
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenancy_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON tenancies
    FOR EACH ROW EXECUTE FUNCTION audit_tenancy_operation();

-- Payment settlement
CREATE OR REPLACE FUNCTION audit_payment_settlement()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status != 'SETTLED' AND NEW.status = 'SETTLED' THEN
        INSERT INTO audit_log (
            event_type,
            actor_id,
            resource_type,
            resource_id,
            old_values,
            new_values,
            correlation_id,
            ip_address,
            user_agent,
            created_at
        ) VALUES (
            'payment.settle',
            current_setting('request.actor_id', true)::UUID,
            'payment',
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW),
            current_setting('request.correlation_id', true),
            current_setting('request.ip_address', true),
            current_setting('request.user_agent', true),
            current_timestamp
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_settlement_audit_trigger
    AFTER UPDATE ON payments
    FOR EACH ROW
    WHEN (OLD.status != 'SETTLED' AND NEW.status = 'SETTLED')
    EXECUTE FUNCTION audit_payment_settlement();
