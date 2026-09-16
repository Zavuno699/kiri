# Payment Identification and Reconciliation

## Payment Identification

### Provider Transaction ID
- Unique identifier from payment provider (e.g., Flutterwave charge ID)
- Stored in `payments.provider_charge_id`
- Unique constraint: `(provider, provider_charge_id)`

### Internal Reference
- KiriLock-generated payment reference
- Stored in `payments.reference`
- Unique constraint: `reference`

### Idempotency Key
- Prevents duplicate payment initiation
- Stored in `payments.idempotency_key`
- Unique constraint: `(provider, idempotency_key)`

## Reconciliation Process

### Webhook Receipt
1. Provider sends webhook notification
2. Signature verified via provider adapter
3. Payload validated
4. Idempotency checked
5. Provider transaction ID extracted

### Payment Lookup
1. Query by `provider_charge_id`
2. If found: verify amount/currency match
3. If not found: mark as unmatched
4. If multiple matches: mark as ambiguous

### Settlement
1. Lock payment row with `FOR UPDATE`
2. Verify current status (not already settled)
3. Verify amount and currency match webhook
4. Update status to `SETTLED`
5. Record `settled_at` timestamp
6. Increment version

### Reconciliation States
- `PENDING`: Payment initiated, awaiting provider confirmation
- `SETTLED`: Payment confirmed and settled
- `FAILED`: Payment failed at provider
- `CANCELLED`: Payment cancelled by user
- `UNMATCHED`: Webhook received but no matching payment found
- `AMBIGUOUS`: Multiple payments match provider transaction ID

## Fail-Closed Behavior

### Unmatched Payments
- Never auto-create payment from webhook
- Route to manual reconciliation
- Alert operations team

### Ambiguous Payments
- Never auto-settle
- Require manual investigation
- Prevent double-settlement

### Duplicate Webhooks
- Idempotency key prevents double-processing
- Provider transaction ID uniqueness enforced
- Database row lock prevents race conditions

### Amount/Currency Mismatch
- Settlement rejected with error
- Webhook logged but not applied
- Requires manual review

## Fee Calculation

### Platform Fee
- Retrieved from `platform_fee_policies` table
- Currency-scoped, effective-dated
- Immutable snapshot per payment intent

### Settlement Amount
- `gross_amount = expected_commission + expected_settlement`
- Stored in `payment_intents`
- Never mutated after payment intent creation

### Historical Fee Immutability
- Fee policy changes do not affect existing payment intents
- Each payment intent captures fee snapshot at creation time
- Historical accuracy preserved for audit
