CREATE TABLE IF NOT EXISTS leases (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    property_id UUID NOT NULL,

    status STRING NOT NULL,

    entitlement_from TIMESTAMPTZ NOT NULL,
    entitlement_until TIMESTAMPTZ NOT NULL,

    grace_until TIMESTAMPTZ NOT NULL,
    compliance_until TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,

    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT leases_status_check
        CHECK (status IN ('ACTIVE', 'GRACE_PERIOD', 'LOCKED')),

    CONSTRAINT leases_entitlement_window_check
        CHECK (entitlement_until > entitlement_from),

    CONSTRAINT leases_grace_window_check
        CHECK (grace_until >= entitlement_until),

    CONSTRAINT leases_compliance_window_check
        CHECK (compliance_until >= grace_until),

    CONSTRAINT leases_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS leases_tenant_id_idx
    ON leases (tenant_id);

CREATE INDEX IF NOT EXISTS leases_property_id_idx
    ON leases (property_id);

CREATE INDEX IF NOT EXISTS leases_status_idx
    ON leases (status);

CREATE INDEX IF NOT EXISTS leases_expiry_idx
    ON leases (status, entitlement_until, grace_until, compliance_until);
