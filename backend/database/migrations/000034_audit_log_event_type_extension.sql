-- Extend audit_log event_type CHECK constraint to include tenancy and lock authorization events
-- Events added in 12P.25 and 12P.26 but missing from original constraint
ALTER TABLE audit_log DROP CONSTRAINT IF EXISTS audit_log_event_type_check;

ALTER TABLE audit_log ADD CONSTRAINT audit_log_event_type_check
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
        'lock.authorized',
        'lock.denied',
        'tenancy.create',
        'tenancy.update',
        'tenancy.activate',
        'tenancy.revoke',
        'tenancy.resend',
        'tenancy.terminate',
        'payment.settle',
        'payment.reconcile',
        'payment.refund',
        'admin.role.grant',
        'admin.role.revoke',
        'security.key.rotate'
    ));
