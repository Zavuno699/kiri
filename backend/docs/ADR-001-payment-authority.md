# ADR-001: Payment Architecture Authority

## Status
Accepted

## Context
Two payment-related domains exist in the KiriLock system:
1. **billing-service**: Intended as a persisted, provider-reconciled ledger with Payment model using AmountUGX int64
2. **identity-service**: Owns payment_accounts and payment_responsibilities tables (migrations 000019, 000020) with HTTP routes

## Decision
**billing-service is the authoritative home for the revenue/intent/ledger model.**

### Rationale
- billing-service is designed for transactional settlement, idempotency, and provider reconciliation
- identity-service payment_responsibilities should reference billing-service payment intents
- This separation maintains clear domain boundaries:
  - identity-service: Identity, accounts, responsibility assignment
  - billing-service: Money, ledger, settlement, reconciliation

### Architecture
```
identity-service (identity/accounts)
  ├─ payment_accounts (provider references)
  └─ payment_responsibilities (tenant → account links)
       │
       └── references ──→ billing-service (money/ledger)
                          ├─ payment_intents (intent → invoice)
                          ├─ fee_policies (platform fee configuration)
                          ├─ payment_ledger (auditable entries)
                          └─ provider_transactions (reconciliation)
```

### Migration Path
- Keep existing identity-service payment_accounts and payment_responsibilities
- Add billing-service payment_intents with foreign key to payment_responsibilities
- Migrate payment_responsibilities.monthly_rent_amount from DECIMAL to integer minor units
- Remove hardcoded UGX currency restrictions from billing-service
- Add currency-agnostic support across both services

## Consequences
- billing-service becomes the single source of truth for financial state
- identity-service maintains account/responsibility metadata
- Cross-service communication required for payment intent creation and status updates
- Provider reconciliation centralized in billing-service
