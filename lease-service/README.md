# KiriLock Lease Service

The Lease Service is the authoritative domain service for prepaid lease
entitlement and lifecycle state.

## States

- `ACTIVE`
- `GRACE_PERIOD`
- `LOCKED`

## Rules

Before entitlement expiry:

`ACTIVE`

After entitlement expiry but before the compliance deadline:

`GRACE_PERIOD`

After the compliance deadline:

`LOCKED`

Payment settlement may extend entitlement and restore an eligible lease.

The Lease Service does not directly trust client claims or payment-provider
status as authorization.

Lock authorization must consume authoritative lease state.

## Design principle

AI systems may provide recommendations or anomaly signals, but they do not
decide lease state transitions.
