CREATE TABLE IF NOT EXISTS gateways (
    id UUID PRIMARY KEY,
    serial_number STRING NOT NULL UNIQUE,
    model STRING NOT NULL,
    firmware_version STRING NOT NULL,
    lifecycle_state STRING NOT NULL,
    connectivity_state STRING NOT NULL,
    last_heartbeat_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT gateways_lifecycle_state_chk
        CHECK (lifecycle_state IN (
            'PROVISIONING',
            'ACTIVE',
            'SUSPENDED',
            'RETIRED'
        )),

    CONSTRAINT gateways_connectivity_state_chk
        CHECK (connectivity_state IN (
            'ONLINE',
            'OFFLINE',
            'UNKNOWN'
        )),

    CONSTRAINT gateways_version_chk
        CHECK (version >= 1)
);

CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY,
    device_type STRING NOT NULL,
    serial_number STRING NOT NULL UNIQUE,
    model STRING NOT NULL,
    firmware_version STRING NOT NULL,
    lifecycle_state STRING NOT NULL,
    connectivity_state STRING NOT NULL,
    gateway_id UUID NULL REFERENCES gateways(id),
    last_heartbeat_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT devices_type_chk
        CHECK (device_type IN (
            'PADLOCK',
            'GATEWAY',
            'CONTROLLER'
        )),

    CONSTRAINT devices_lifecycle_state_chk
        CHECK (lifecycle_state IN (
            'PROVISIONING',
            'ACTIVE',
            'SUSPENDED',
            'RETIRED'
        )),

    CONSTRAINT devices_connectivity_state_chk
        CHECK (connectivity_state IN (
            'ONLINE',
            'OFFLINE',
            'UNKNOWN'
        )),

    CONSTRAINT devices_version_chk
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS devices_gateway_idx
    ON devices (gateway_id);

CREATE INDEX IF NOT EXISTS devices_connectivity_idx
    ON devices (connectivity_state);

CREATE TABLE IF NOT EXISTS device_capabilities (
    device_id UUID PRIMARY KEY REFERENCES devices(id) ON DELETE CASCADE,
    remote_lock BOOL NOT NULL DEFAULT false,
    remote_unlock BOOL NOT NULL DEFAULT false,
    remote_freeze BOOL NOT NULL DEFAULT false,
    tamper_detection BOOL NOT NULL DEFAULT false,
    battery_telemetry BOOL NOT NULL DEFAULT false,
    ble BOOL NOT NULL DEFAULT false,
    cellular BOOL NOT NULL DEFAULT false
);
