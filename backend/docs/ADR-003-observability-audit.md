# ADR-003: Observability and Audit Architecture

## Status
Accepted

## Context
KiriLock is a security-sensitive platform dealing with physical access, financial transactions, and administrative operations. Comprehensive observability and audit logging are essential for security, compliance, and operational integrity.

## Decision

### Audit Requirements
All security-sensitive operations must include:
- **Correlation ID**: UUID for tracing related operations
- **Actor**: Subject ID who performed the action
- **Action**: Operation performed (e.g., "device.provision", "payment.settle")
- **Resource**: Affected entity (type and ID)
- **Result**: Success/failure with error details
- **Timestamp**: When the operation occurred
- **IP Address**: When available
- **User Agent**: When available

### Security-Sensitive Operations
Authentication, credential operations, device provisioning, admin/super-admin changes, settlement/reconciliation state transitions must be audited.

### Audit Data Policy
- **NEVER log**: Secrets, tokens, PINs, passwords, API keys, certificates
- **NEVER log**: Full request/response bodies (log references instead)
- **ALWAYS log**: Security-relevant metadata (who, what, when, result)
- **MUST sanitize**: Any user input before logging

### Correlation IDs
Each request chain should have a correlation ID:
- Generated at request entry point
- Propagated through service calls
- Used to trace related operations across services
- Included in all audit entries

### Audit Storage
Single authoritative audit store (to be consolidated from existing competing implementations):
- Immutable audit records
- Indexed by correlation ID, actor, resource, timestamp
- Retention policy based on security/compliance requirements
- Queryable for security investigations

### Error Handling
Security errors must be logged with appropriate severity:
- Security violations: CRITICAL
- Authorization failures: WARNING (no sensitive data)
- System errors: ERROR (no secrets)
- Business logic errors: INFO

## Consequences
- Security operations are fully traceable
- Audit trail supports investigations and compliance
- Secrets are never exposed in logs
- Correlation IDs enable distributed tracing
- Single source of truth for audit data
