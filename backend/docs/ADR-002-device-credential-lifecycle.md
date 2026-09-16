# ADR-002: Device Credential Lifecycle

## Status
Accepted

## Context
KiriLock manages physical locks and connected access devices. These devices require credentials (API keys, secrets, tokens) for communication with device providers. Storing these credentials insecurely poses significant security risks.

## Decision

### Credential Separation
Device business identity (serial number, model, vendor, state) is completely separated from credential storage:
- Device table stores only a `credential_reference` (never the actual secret)
- `credential_status` tracks the provisioning state (NONE/PENDING/ACTIVE/REVOKED/EXPIRED)
- Actual secrets are stored via a `SecretProvider` abstraction

### Secret Provider Interface
```go
type SecretProvider interface {
    StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error)
    GetCredential(ctx context.Context, reference string) (string, error)
    RevokeCredential(ctx context.Context, reference string) error
    DeleteCredential(ctx context.Context, reference string) error
}
```

### Provisioning Workflow
1. Super-Admin only (via `device.provision` scope)
2. Credentials submitted over authenticated API
3. Stored via SecretProvider (never in database columns, logs, or API responses)
4. Device record updated with credential reference and status
5. Actual secret never returned after initial storage

### Lifecycle States
Extended device lifecycle: `UNREGISTERED → INVENTORIED → PROVISIONED → ASSIGNED → ACTIVE → SUSPENDED/MAINTENANCE → RETIRED`

State transitions are validated at database level via triggers.

### Security Requirements
- Secrets never logged
- Secrets never exposed in API responses
- Secret storage uses production-ready secret manager (AWS Secrets Manager, HashiCorp Vault, etc.)
- Development/Testing uses safe in-memory implementation with clear warnings
- All credential operations are audited (actor, action, resource, result, timestamp)

## Consequences
- Device credentials are properly isolated from device identity
- Secret storage is pluggable for different environments
- Audit trail exists for all credential operations
- Security is fail-closed - missing secrets don't expose system
