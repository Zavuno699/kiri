# KiriLock Backend

KiriLock backend services.

## Architecture principles

- Strong compile-time typing
- Strict request validation
- Explicit normalization
- Explicit authorization
- Explicit domain/business validation
- Versioned API contracts
- Versioned event contracts
- Structured metadata
- Structured errors
- Idempotent financial operations
- Transactional persistence
- Observable services
- Backward-compatible evolution

## Service boundaries

- identity-service
- billing-service
- lease-service
- lock-service
- security-service
- hardware-controller

## Shared packages

The `shared/` directory contains infrastructure and contracts shared
between services.

Business/domain logic should remain inside the owning service.
