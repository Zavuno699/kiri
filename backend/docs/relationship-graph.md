# KiriLock Relationship Graph

## Entity Relationships

### Property Hierarchy
```
Property (properties)
  └─ Unit (units)
      └─ Lock Assignment (lock_unit_assignments)
          └─ Lock Device (devices)
```

### Tenancy Hierarchy
```
Landlord Profile (landlord_profiles)
  └─ Property (properties)
      └─ Unit (units)
          └─ Tenancy (tenancies)
              └─ Tenant (identity_subjects)
```

### Payment Hierarchy
```
Tenant (identity_subjects)
  └─ Tenancy (tenancies)
      └─ Payment Responsibility (payment_responsibilities)
          └─ Payment Intent (payment_intents)
              └─ Payment (payments)
                  └─ Settlement (payment_ledger)
```

### Device Hierarchy
```
Gateway Device (devices, type=GATEWAY)
  └─ Device (devices, type=PADLOCK/CONTROLLER)
      └─ Device Credential (device_credentials)
```

## Integrity Constraints

### Property → Unit
- Every unit must belong to exactly one property
- Foreign key: `units.property_id → properties.id`

### Unit → Lock Assignment
- One active lock assignment per unit
- Lock and unit must belong to same property (application-level enforcement)
- Exclusion constraint: `EXCLUDE (unit_id WITH =) WHERE (status = 'ACTIVE')`

### Lock → Unit Assignment
- One active unit per lock
- Exclusion constraint: `EXCLUDE (lock_id WITH =) WHERE (status = 'ACTIVE')`

### Tenancy → Unit + Property + Landlord
- Tenancy must reference valid unit, property, and landlord profile
- Foreign keys enforced at database level
- Prevents cross-landlord tenancy creation

### Payment Responsibility → Tenancy
- Payment responsibility must reference valid tenancy
- Prevents orphaned payment responsibilities

### Device → Gateway
- Non-gateway devices must have a gateway
- Gateway devices cannot belong to another gateway

## Isolation Guarantees

### Tenant Isolation
- Tenant can only access their own tenancy
- Tenant cannot view other tenants' units/locks
- Tenant cannot manipulate other payment responsibilities

### Landlord Isolation
- Landlord can only access their own properties
- Landlord cannot view other landlords' financial data
- Landlord cannot assign locks to units in other properties

### Device Isolation
- Device credentials are isolated per device
- Secrets never exposed to API responses
- Device provisioning requires Super Admin scope

## Cross-Cutting Concerns

### Audit Trail
- All security-sensitive operations logged to `audit_log`
- Includes: actor, action, resource, result, timestamp, correlation ID
- Never logs secrets/tokens/PINs

### Authorization
- Backend authorization in `security-service/internal/security` is authoritative
- Frontend authorization is UX only, projects backend-derived permissions
- Role-based access control with scoped permissions

### Currency Handling
- All monetary amounts stored as integer minor units
- ISO 4217 currency codes (3 uppercase letters)
- Locale-aware formatting for display only
