#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10A.2"
echo "DOMAIN CONTRACT EXPANSION + COMPATIBILITY LAYER"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: SKIPPED BY DESIGN"
echo "TESTS: NOT CREATED / NOT RUN"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10A.2-backup-$STAMP"

mkdir -p \
  "$BACKUP" \
  src/domain/contracts \
  src/domain/normalization \
  src/domain/projections \
  src/domain/compatibility \
  src/application/contracts \
  src/application/normalization \
  src/features/properties/domain \
  src/features/leases/domain \
  src/features/payments/domain \
  src/features/devices/domain \
  src/features/locks/domain \
  src/features/security/domain

# ============================================================
# SAFE BACKUP OF KNOWN CONTRACT HOTSPOTS
# ============================================================

for f in \
  src/types/index.ts \
  src/types/domain.ts \
  src/lib/adapters/propertyAdapter.ts \
  src/lib/adapters/leaseAdapter.ts \
  src/application/viewmodels/propertyViewModel.ts \
  src/application/viewmodels/leaseViewModel.ts \
  src/features/properties/projections/propertyProjection.ts \
  src/features/properties/selectors/propertySelectors.ts \
  src/features/leases/projections/leaseProjection.ts \
  src/features/leases/selectors/leaseSelectors.ts
do
  if [[ -f "$f" ]]; then
    mkdir -p "$BACKUP/$(dirname "$f")"
    cp "$f" "$BACKUP/$f"
  fi
done

echo "Backup created: $BACKUP"
echo

# ============================================================
# CANONICAL OPERATIONAL DOMAIN CONTRACTS
# ============================================================

cat > src/domain/contracts/operationalProperty.ts <<'EOF'
export interface OperationalProperty {
  id: string
  name: string
  status?: string
  occupancy?: number
  availableUnits?: number
  totalUnits?: number
  address?: string
  currency?: string
  metadata?: Record<string, unknown>
}
EOF

cat > src/domain/contracts/operationalLease.ts <<'EOF'
export interface OperationalLease {
  id: string
  propertyId: string
  tenantId?: string
  status?: string
  startDate?: string
  endDate?: string
  amount?: number
  currency?: string
  entitlementDays?: number
  metadata?: Record<string, unknown>
}
EOF

cat > src/domain/contracts/operationalPayment.ts <<'EOF'
export interface OperationalPayment {
  id: string
  leaseId?: string
  propertyId?: string
  amount?: number
  currency?: string
  status?: string
  reference?: string
  settledAt?: string
  metadata?: Record<string, unknown>
}
EOF

cat > src/domain/contracts/operationalDevice.ts <<'EOF'
export interface OperationalDevice {
  id: string
  propertyId?: string
  leaseId?: string
  status?: string
  online?: boolean
  firmwareVersion?: string
  lastSeenAt?: string
  metadata?: Record<string, unknown>
}
EOF

cat > src/domain/contracts/operationalLock.ts <<'EOF'
export interface OperationalLock {
  id: string
  deviceId?: string
  propertyId?: string
  status?: string
  locked?: boolean
  mode?: string
  lastCommandAt?: string
  metadata?: Record<string, unknown>
}
EOF

cat > src/domain/contracts/operationalSecurity.ts <<'EOF'
export interface OperationalSecurity {
  id: string
  subjectId?: string
  status?: string
  accessGranted?: boolean
  restrictedAccess?: number
  credentialState?: string
  lastEventAt?: string
  metadata?: Record<string, unknown>
}
EOF

# ============================================================
# DOMAIN CONTRACT INDEX
# ============================================================

cat > src/domain/contracts/index.ts <<'EOF'
export * from "./operationalProperty"
export * from "./operationalLease"
export * from "./operationalPayment"
export * from "./operationalDevice"
export * from "./operationalLock"
export * from "./operationalSecurity"
EOF

# ============================================================
# NORMALIZATION HELPERS
# ============================================================

cat > src/domain/normalization/numberValue.ts <<'EOF'
export function numberValue(
  value: unknown,
  fallback = 0,
): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : fallback
}
EOF

cat > src/domain/normalization/stringValue.ts <<'EOF'
export function stringValue(
  value: unknown,
  fallback = "",
): string {
  return typeof value === "string"
    ? value
    : fallback
}
EOF

cat > src/domain/normalization/optionalNumber.ts <<'EOF'
export function optionalNumber(
  value: unknown,
): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined
}
EOF

cat > src/domain/normalization/optionalString.ts <<'EOF'
export function optionalString(
  value: unknown,
): string | undefined {
  return typeof value === "string"
    ? value
    : undefined
}
EOF

cat > src/domain/normalization/index.ts <<'EOF'
export * from "./numberValue"
export * from "./stringValue"
export * from "./optionalNumber"
export * from "./optionalString"
EOF

# ============================================================
# PROPERTY COMPATIBILITY PROJECTION
# ============================================================

cat > src/domain/compatibility/propertyRecordCompatibility.ts <<'EOF'
import type { OperationalProperty } from "../contracts"
import {
  numberValue,
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalProperty(
  value: Record<string, unknown>,
): OperationalProperty {
  const totalUnits =
    optionalNumber(value.totalUnits) ??
    optionalNumber(value.units) ??
    optionalNumber(value.capacity)

  const availableUnits =
    optionalNumber(value.availableUnits) ??
    optionalNumber(value.available)

  const occupancy =
    optionalNumber(value.occupancy) ??
    (
      totalUnits !== undefined &&
      availableUnits !== undefined &&
      totalUnits > 0
        ? ((totalUnits - availableUnits) / totalUnits) * 100
        : undefined
    )

  return {
    id: stringValue(value.id),
    name: stringValue(
      value.name ?? value.propertyName,
      "Unknown property",
    ),
    status: optionalString(value.status),
    occupancy,
    availableUnits,
    totalUnits,
    address: optionalString(value.address),
    currency: optionalString(value.currency),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}

export function propertyOccupancy(
  value: Record<string, unknown>,
): number {
  return numberValue(
    toOperationalProperty(value).occupancy,
  )
}
EOF

# ============================================================
# LEASE COMPATIBILITY PROJECTION
# ============================================================

cat > src/domain/compatibility/leaseRecordCompatibility.ts <<'EOF'
import type { OperationalLease } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalLease(
  value: Record<string, unknown>,
): OperationalLease {
  return {
    id: stringValue(value.id),
    propertyId: stringValue(
      value.propertyId ?? value.property_id,
    ),
    tenantId: optionalString(
      value.tenantId ?? value.tenant_id,
    ),
    status: optionalString(value.status),
    startDate: optionalString(
      value.startDate ??
      value.start_date ??
      value.startsAt,
    ),
    endDate: optionalString(
      value.endDate ??
      value.end_date ??
      value.endsAt,
    ),
    amount: optionalNumber(
      value.amount ??
      value.monthlyAmount ??
      value.leaseAmount,
    ),
    currency: optionalString(value.currency),
    entitlementDays: optionalNumber(
      value.entitlementDays ??
      value.daysGranted ??
      value.entitledDays,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

# ============================================================
# PAYMENT COMPATIBILITY
# ============================================================

cat > src/domain/compatibility/paymentRecordCompatibility.ts <<'EOF'
import type { OperationalPayment } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalPayment(
  value: Record<string, unknown>,
): OperationalPayment {
  return {
    id: stringValue(value.id),
    leaseId: optionalString(
      value.leaseId ?? value.lease_id,
    ),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    amount: optionalNumber(value.amount),
    currency: optionalString(value.currency),
    status: optionalString(value.status),
    reference: optionalString(
      value.reference ??
      value.paymentReference,
    ),
    settledAt: optionalString(
      value.settledAt ??
      value.settled_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

# ============================================================
# DEVICE COMPATIBILITY
# ============================================================

cat > src/domain/compatibility/deviceRecordCompatibility.ts <<'EOF'
import type { OperationalDevice } from "../contracts"
import {
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalDevice(
  value: Record<string, unknown>,
): OperationalDevice {
  const online =
    typeof value.online === "boolean"
      ? value.online
      : typeof value.connected === "boolean"
        ? value.connected
        : undefined

  return {
    id: stringValue(value.id),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    leaseId: optionalString(
      value.leaseId ?? value.lease_id,
    ),
    status: optionalString(value.status),
    online,
    firmwareVersion: optionalString(
      value.firmwareVersion ??
      value.firmware_version,
    ),
    lastSeenAt: optionalString(
      value.lastSeenAt ??
      value.last_seen_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

# ============================================================
# LOCK COMPATIBILITY
# ============================================================

cat > src/domain/compatibility/lockRecordCompatibility.ts <<'EOF'
import type { OperationalLock } from "../contracts"
import {
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalLock(
  value: Record<string, unknown>,
): OperationalLock {
  return {
    id: stringValue(value.id),
    deviceId: optionalString(
      value.deviceId ?? value.device_id,
    ),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    status: optionalString(value.status),
    locked:
      typeof value.locked === "boolean"
        ? value.locked
        : undefined,
    mode: optionalString(value.mode),
    lastCommandAt: optionalString(
      value.lastCommandAt ??
      value.last_command_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

# ============================================================
# SECURITY COMPATIBILITY
# ============================================================

cat > src/domain/compatibility/securityRecordCompatibility.ts <<'EOF'
import type { OperationalSecurity } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalSecurity(
  value: Record<string, unknown>,
): OperationalSecurity {
  return {
    id: stringValue(value.id),
    subjectId: optionalString(
      value.subjectId ??
      value.subject_id,
    ),
    status: optionalString(value.status),
    accessGranted:
      typeof value.accessGranted === "boolean"
        ? value.accessGranted
        : undefined,
    restrictedAccess: optionalNumber(
      value.restrictedAccess ??
      value.restrictedAccesses,
    ),
    credentialState: optionalString(
      value.credentialState ??
      value.credential_state,
    ),
    lastEventAt: optionalString(
      value.lastEventAt ??
      value.last_event_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

cat > src/domain/compatibility/index.ts <<'EOF'
export * from "./propertyRecordCompatibility"
export * from "./leaseRecordCompatibility"
export * from "./paymentRecordCompatibility"
export * from "./deviceRecordCompatibility"
export * from "./lockRecordCompatibility"
export * from "./securityRecordCompatibility"
EOF

# ============================================================
# GENERIC DOMAIN PROJECTION TYPES
# ============================================================

cat > src/domain/projections/entityProjection.ts <<'EOF'
export interface EntityProjection<T> {
  entity: T
  projectedAt: string
  source: "api" | "event" | "cache" | "local"
  version?: number
}

export function projectEntity<T>(
  entity: T,
  source: EntityProjection<T>["source"],
  version?: number,
): EntityProjection<T> {
  return {
    entity,
    projectedAt: new Date().toISOString(),
    source,
    version,
  }
}
EOF

cat > src/domain/projections/operationalSummary.ts <<'EOF'
export interface OperationalSummary {
  total: number
  active: number
  degraded: number
  unavailable: number
  lastUpdatedAt?: string
}

export function emptyOperationalSummary(): OperationalSummary {
  return {
    total: 0,
    active: 0,
    degraded: 0,
    unavailable: 0,
  }
}
EOF

cat > src/domain/projections/index.ts <<'EOF'
export * from "./entityProjection"
export * from "./operationalSummary"
EOF

# ============================================================
# APPLICATION CONTRACTS
# ============================================================

cat > src/application/contracts/resourceState.ts <<'EOF'
export type ResourceLifecycle =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "degraded"
  | "failed"

export interface ResourceState<T> {
  lifecycle: ResourceLifecycle
  data?: T
  error?: string
  updatedAt?: string
}

export function idleResource<T>(): ResourceState<T> {
  return {
    lifecycle: "idle",
  }
}
EOF

cat > src/application/contracts/domainResource.ts <<'EOF'
import type { ResourceState } from "./resourceState"

export interface DomainResource<T> {
  readonly key: string
  state: ResourceState<T>
  readonly refreshable: boolean
  readonly commandable: boolean
}
EOF

cat > src/application/contracts/index.ts <<'EOF'
export * from "./resourceState"
export * from "./domainResource"
EOF

# ============================================================
# APPLICATION NORMALIZATION
# ============================================================

cat > src/application/normalization/propertyNormalization.ts <<'EOF'
import {
  toOperationalProperty,
} from "../../domain/compatibility"
import type { OperationalProperty } from "../../domain/contracts"

export function normalizeProperty(
  value: unknown,
): OperationalProperty {
  return toOperationalProperty(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/leaseNormalization.ts <<'EOF'
import {
  toOperationalLease,
} from "../../domain/compatibility"
import type { OperationalLease } from "../../domain/contracts"

export function normalizeLease(
  value: unknown,
): OperationalLease {
  return toOperationalLease(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/paymentNormalization.ts <<'EOF'
import {
  toOperationalPayment,
} from "../../domain/compatibility"
import type { OperationalPayment } from "../../domain/contracts"

export function normalizePayment(
  value: unknown,
): OperationalPayment {
  return toOperationalPayment(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/deviceNormalization.ts <<'EOF'
import {
  toOperationalDevice,
} from "../../domain/compatibility"
import type { OperationalDevice } from "../../domain/contracts"

export function normalizeDevice(
  value: unknown,
): OperationalDevice {
  return toOperationalDevice(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/lockNormalization.ts <<'EOF'
import {
  toOperationalLock,
} from "../../domain/compatibility"
import type { OperationalLock } from "../../domain/contracts"

export function normalizeLock(
  value: unknown,
): OperationalLock {
  return toOperationalLock(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/securityNormalization.ts <<'EOF'
import {
  toOperationalSecurity,
} from "../../domain/compatibility"
import type { OperationalSecurity } from "../../domain/contracts"

export function normalizeSecurity(
  value: unknown,
): OperationalSecurity {
  return toOperationalSecurity(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
EOF

cat > src/application/normalization/index.ts <<'EOF'
export * from "./propertyNormalization"
export * from "./leaseNormalization"
export * from "./paymentNormalization"
export * from "./deviceNormalization"
export * from "./lockNormalization"
export * from "./securityNormalization"
EOF

# ============================================================
# PROPERTY DOMAIN SERVICES
# ============================================================

cat > src/features/properties/domain/propertyMetrics.ts <<'EOF'
import type { OperationalProperty } from "../../../domain/contracts"

export function propertyOccupancyPercentage(
  property: OperationalProperty,
): number {
  if (
    property.occupancy !== undefined &&
    Number.isFinite(property.occupancy)
  ) {
    return property.occupancy
  }

  if (
    property.totalUnits !== undefined &&
    property.availableUnits !== undefined &&
    property.totalUnits > 0
  ) {
    return (
      (property.totalUnits - property.availableUnits) /
      property.totalUnits
    ) * 100
  }

  return 0
}
EOF

cat > src/features/properties/domain/propertyAvailability.ts <<'EOF'
import type { OperationalProperty } from "../../../domain/contracts"

export function propertyAvailableUnits(
  property: OperationalProperty,
): number {
  return property.availableUnits ?? 0
}

export function propertyTotalUnits(
  property: OperationalProperty,
): number {
  return property.totalUnits ?? 0
}
EOF

cat > src/features/properties/domain/index.ts <<'EOF'
export * from "./propertyMetrics"
export * from "./propertyAvailability"
EOF

# ============================================================
# LEASE DOMAIN SERVICES
# ============================================================

cat > src/features/leases/domain/leaseDates.ts <<'EOF'
import type { OperationalLease } from "../../../domain/contracts"

export function leaseStartDate(
  lease: OperationalLease,
): string | undefined {
  return lease.startDate
}

export function leaseEndDate(
  lease: OperationalLease,
): string | undefined {
  return lease.endDate
}
EOF

cat > src/features/leases/domain/leaseStatus.ts <<'EOF'
import type { OperationalLease } from "../../../domain/contracts"

export function leaseStatus(
  lease: OperationalLease,
): string {
  return lease.status ?? "unknown"
}

export function isLeaseActive(
  lease: OperationalLease,
): boolean {
  const status = lease.status?.toLowerCase()
  return status === "active" || status === "current"
}
EOF

cat > src/features/leases/domain/index.ts <<'EOF'
export * from "./leaseDates"
export * from "./leaseStatus"
EOF

# ============================================================
# FEATURE DOMAIN INDEX EXPOSURE
# ============================================================

for feature in properties leases payments devices locks security
do
  mkdir -p "src/features/$feature/domain"
done

cat > src/features/payments/domain/paymentState.ts <<'EOF'
import type { OperationalPayment } from "../../../domain/contracts"

export function paymentStatus(
  payment: OperationalPayment,
): string {
  return payment.status ?? "unknown"
}

export function paymentIsSettled(
  payment: OperationalPayment,
): boolean {
  const status = payment.status?.toLowerCase()
  return status === "settled" || status === "completed"
}
EOF

cat > src/features/payments/domain/index.ts <<'EOF'
export * from "./paymentState"
EOF

cat > src/features/devices/domain/deviceState.ts <<'EOF'
import type { OperationalDevice } from "../../../domain/contracts"

export function deviceIsOnline(
  device: OperationalDevice,
): boolean {
  return device.online ?? false
}
EOF

cat > src/features/devices/domain/index.ts <<'EOF'
export * from "./deviceState"
EOF

cat > src/features/locks/domain/lockState.ts <<'EOF'
import type { OperationalLock } from "../../../domain/contracts"

export function lockIsEngaged(
  lock: OperationalLock,
): boolean {
  if (lock.locked !== undefined) {
    return lock.locked
  }

  return lock.status?.toLowerCase() === "locked"
}
EOF

cat > src/features/locks/domain/index.ts <<'EOF'
export * from "./lockState"
EOF

cat > src/features/security/domain/securityState.ts <<'EOF'
import type { OperationalSecurity } from "../../../domain/contracts"

export function securityAccessGranted(
  security: OperationalSecurity,
): boolean {
  return security.accessGranted ?? false
}
EOF

cat > src/features/security/domain/index.ts <<'EOF'
export * from "./securityState"
EOF

# ============================================================
# ROOT DOMAIN INDEX
# ============================================================

cat > src/domain/index.ts <<'EOF'
export * from "./contracts"
export * from "./normalization"
export * from "./compatibility"
export * from "./projections"
EOF

# ============================================================
# APP INDEX EXTENSIONS
# ============================================================

append_export() {
  local file="$1"
  local line="$2"

  if [[ -f "$file" ]]; then
    if ! grep -Fqx "$line" "$file" 2>/dev/null; then
      printf '\n%s\n' "$line" >> "$file"
    fi
  fi
}

append_export src/application/index.ts \
  'export * from "./contracts"'

append_export src/application/index.ts \
  'export * from "./normalization"'

append_export src/application/index.ts \
  'export * from "./facades"'

append_export src/features/properties/index.ts \
  'export * from "./domain"'

append_export src/features/leases/index.ts \
  'export * from "./domain"'

append_export src/features/payments/index.ts \
  'export * from "./domain"'

append_export src/features/devices/index.ts \
  'export * from "./domain"'

append_export src/features/locks/index.ts \
  'export * from "./domain"'

append_export src/features/security/index.ts \
  'export * from "./domain"'

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10A.2 COMPLETE"
echo "============================================================"
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo
echo "Source files:"
find src -type f | wc -l

echo
echo "New domain contract files:"
find src/domain -type f | wc -l

echo
echo "Application normalization files:"
find src/application/normalization -type f | wc -l

echo
echo "Property domain files:"
find src/features/properties/domain -type f | wc -l

echo
echo "Lease domain files:"
find src/features/leases/domain -type f | wc -l

echo
echo "Payment domain files:"
find src/features/payments/domain -type f | wc -l

echo
echo "Device domain files:"
find src/features/devices/domain -type f | wc -l

echo
echo "Lock domain files:"
find src/features/locks/domain -type f | wc -l

echo
echo "Security domain files:"
find src/features/security/domain -type f | wc -l

echo
echo "Backup:"
echo "  $BACKUP"

echo
echo "============================================================"
echo "NEXT: PHASE 10B"
echo "FRONTEND FEATURE DEPTH + CROSS-DOMAIN ORCHESTRATION"
echo "============================================================"
