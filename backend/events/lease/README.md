# KiriLock Lease Events

Lease lifecycle events are internal domain events.

The lease service is authoritative for lease state.

Consumers must not infer entitlement from payment-provider status alone.

A payment settlement may cause a lease entitlement change, but the resulting
lease state must be persisted by the lease domain before downstream lock
authorization changes are considered authoritative.

Event metadata must include:

- event_id
- event_type
- event_version
- occurred_at
- correlation_id
- optional causation_id
- producer
