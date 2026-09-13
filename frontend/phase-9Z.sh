#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 9Z"
echo "DEEP DOMAIN IMPLEMENTATION BATCH"
echo "============================================================"
echo "PWD: $PWD"
echo

# ============================================================
# DIRECTORIES
# ============================================================

for feature in dashboard property lease payment device lock security
do
  mkdir -p \
    "src/features/$feature/application" \
    "src/features/$feature/queries" \
    "src/features/$feature/commands" \
    "src/features/$feature/presenters" \
    "src/features/$feature/models" \
    "src/features/$feature/actions" \
    "src/features/$feature/timeline" \
    "src/features/$feature/tables" \
    "src/features/$feature/details" \
    "src/features/$feature/workflows" \
    "src/features/$feature/events"
done

mkdir -p \
  src/components/tables/cells \
  src/components/timeline \
  src/components/details \
  src/components/actions \
  src/components/metrics \
  src/components/panels

# ============================================================
# SHARED DOMAIN PRESENTATION
# ============================================================

cat > src/components/metrics/MetricValue.tsx <<'EOF'
export function MetricValue({
  value,
  detail,
}: {
  value: string
  detail?: string
}) {
  return (
    <div>
      <div className="text-2xl font-black text-kiri-text">
        {value}
      </div>
      {detail ? (
        <div className="mt-1 text-[10px] text-kiri-text-muted">
          {detail}
        </div>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/metrics/MetricDelta.tsx <<'EOF'
export function MetricDelta({
  value,
  direction = "flat",
}: {
  value: string
  direction?: "up" | "down" | "flat"
}) {
  const tone =
    direction === "up"
      ? "text-kiri-green"
      : direction === "down"
        ? "text-kiri-red"
        : "text-kiri-text-muted"

  return (
    <span className={tone}>
      {value}
    </span>
  )
}
EOF

cat > src/components/timeline/TimelineItem.tsx <<'EOF'
import type { ReactNode } from "react"

export function TimelineItem({
  title,
  detail,
  timestamp,
  meta,
  children,
}: {
  title: string
  detail?: string
  timestamp?: string
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <article className="relative rounded-2xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div>
          <div className="text-sm font-semibold text-kiri-text">
            {title}
          </div>

          {detail ? (
            <div className="mt-1 text-xs leading-5 text-kiri-text-muted">
              {detail}
            </div>
          ) : null}
        </div>

        {timestamp ? (
          <div className="shrink-0 text-[10px] text-kiri-text-muted">
            {timestamp}
          </div>
        ) : null}
      </div>

      {meta ? (
        <div className="mt-3">
          {meta}
        </div>
      ) : null}

      {children ? (
        <div className="mt-3">
          {children}
        </div>
      ) : null}
    </article>
  )
}
EOF

cat > src/components/details/DetailField.tsx <<'EOF'
export function DetailField({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-kiri-text-muted">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-kiri-text-soft">
        {value ?? "—"}
      </div>
    </div>
  )
}
EOF

cat > src/components/actions/ActionCluster.tsx <<'EOF'
import type { ReactNode } from "react"

export function ActionCluster({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  )
}
EOF

cat > src/components/panels/PanelHeader.tsx <<'EOF'
export function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-blue-400">
        {eyebrow}
      </div>

      <h3 className="mt-2 text-lg font-black text-kiri-text">
        {title}
      </h3>

      {description ? (
        <p className="mt-2 text-xs leading-5 text-kiri-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}
EOF

# ============================================================
# DASHBOARD
# ============================================================

cat > src/features/dashboard/models/dashboardViewModel.ts <<'EOF'
export interface DashboardViewModel {
  title: string
  serviceCount: number
  criticalAlertCount: number
  degradedServiceCount: number
  operational: boolean
}

export function buildDashboardViewModel(
  serviceCount: number,
  criticalAlertCount: number,
  degradedServiceCount: number,
): DashboardViewModel {
  return {
    title: "Operations",
    serviceCount,
    criticalAlertCount,
    degradedServiceCount,
    operational:
      criticalAlertCount === 0 &&
      degradedServiceCount === 0,
  }
}
EOF

cat > src/features/dashboard/queries/dashboardQuery.ts <<'EOF'
export interface DashboardQuery {
  window:
    | "hour"
    | "day"
    | "week"
    | "month"
}

export function createDashboardQuery(
  window: DashboardQuery["window"] = "day",
): DashboardQuery {
  return { window }
}
EOF

cat > src/features/dashboard/commands/refreshDashboard.ts <<'EOF'
export interface RefreshDashboardCommand {
  reason: string
}

export function createRefreshDashboardCommand(
  reason: string,
): RefreshDashboardCommand {
  return {
    reason: reason.trim(),
  }
}
EOF

cat > src/features/dashboard/presenters/dashboardPresenter.ts <<'EOF'
import {
  buildDashboardViewModel,
} from "../models/dashboardViewModel"

export function presentDashboard(
  input: {
    serviceCount: number
    criticalAlertCount: number
    degradedServiceCount: number
  },
) {
  return buildDashboardViewModel(
    input.serviceCount,
    input.criticalAlertCount,
    input.degradedServiceCount,
  )
}
EOF

cat > src/features/dashboard/application/dashboardApplication.ts <<'EOF'
export interface DashboardApplication {
  refresh(): Promise<void>
}
EOF

cat > src/features/dashboard/timeline/dashboardTimeline.ts <<'EOF'
export interface DashboardTimelineEvent {
  id: string
  category: string
  title: string
  severity: "info" | "warning" | "critical"
  occurredAt: string
}
EOF

cat > src/features/dashboard/tables/dashboardTableModel.ts <<'EOF'
export interface DashboardTableRow {
  id: string
  service: string
  status: string
  detail: string
  updatedAt?: string
}
EOF

cat > src/features/dashboard/details/dashboardDetail.ts <<'EOF'
export interface DashboardDetail {
  environment: string
  version: string
  apiAvailable: boolean
  ready: boolean
  correlationId?: string
}
EOF

cat > src/features/dashboard/workflows/dashboardRefresh.ts <<'EOF'
export type DashboardRefreshStep =
  | "prepare"
  | "load"
  | "project"
  | "complete"

export interface DashboardRefreshState {
  step: DashboardRefreshStep
  startedAt?: string
  completedAt?: string
  error?: string
}
EOF

cat > src/features/dashboard/events/dashboardEventProjection.ts <<'EOF'
export interface DashboardEventProjection {
  id: string
  title: string
  detail: string
  severity: "info" | "warning" | "critical"
  occurredAt: string
}
EOF

cat > src/features/dashboard/actions/dashboardActions.ts <<'EOF'
export const dashboardActions = {
  refresh: "dashboard.refresh",
  inspectHealth: "dashboard.inspect-health",
  inspectAlerts: "dashboard.inspect-alerts",
} as const
EOF

# ============================================================
# PROPERTY
# ============================================================

cat > src/features/property/models/propertyViewModel.ts <<'EOF'
export interface PropertyViewModel {
  id: string
  name: string
  status: string
  occupancy: string
  units: number
  occupiedUnits: number
  availableUnits: number
  occupancyPercent: number
}

export function buildPropertyViewModel(
  property: {
    id: string
    name: string
    status: string
    occupancy?: string
    units?: number
    occupiedUnits?: number
    availableUnits?: number
  },
): PropertyViewModel {
  const units = property.units ?? 0
  const occupied = property.occupiedUnits ?? 0

  return {
    id: property.id,
    name: property.name,
    status: property.status,
    occupancy:
      property.occupancy ?? "unknown",
    units,
    occupiedUnits: occupied,
    availableUnits:
      property.availableUnits ?? 0,
    occupancyPercent:
      units > 0
        ? Math.round((occupied / units) * 100)
        : 0,
  }
}
EOF

cat > src/features/property/queries/propertyQuery.ts <<'EOF'
export interface PropertyQuery {
  search?: string
  status?: string
  occupancy?: string
  region?: string
}
EOF

cat > src/features/property/commands/refreshProperty.ts <<'EOF'
export interface RefreshPropertyCommand {
  propertyId: string
  reason: string
}
EOF

cat > src/features/property/presenters/propertyPresenter.ts <<'EOF'
import {
  buildPropertyViewModel,
} from "../models/propertyViewModel"

export function presentProperty(
  property: Parameters<
    typeof buildPropertyViewModel
  >[0],
) {
  return buildPropertyViewModel(property)
}
EOF

cat > src/features/property/application/propertyApplication.ts <<'EOF'
export interface PropertyApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
}
EOF

cat > src/features/property/tables/propertyTableModel.ts <<'EOF'
export interface PropertyTableRow {
  id: string
  name: string
  status: string
  occupancy: string
  units: string
  available: string
}
EOF

cat > src/features/property/details/propertyDetail.ts <<'EOF'
export interface PropertyDetail {
  id: string
  name: string
  status: string
  address?: string
  region?: string
  units: number
  occupiedUnits: number
  availableUnits: number
}
EOF

cat > src/features/property/timeline/propertyTimeline.ts <<'EOF'
export interface PropertyTimelineEvent {
  id: string
  propertyId: string
  type: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/property/workflows/propertyRefresh.ts <<'EOF'
export type PropertyRefreshStep =
  | "select"
  | "load"
  | "project"
  | "complete"

export interface PropertyRefreshState {
  step: PropertyRefreshStep
  propertyId?: string
}
EOF

cat > src/features/property/events/propertyEventProjection.ts <<'EOF'
export interface PropertyEventProjection {
  propertyId: string
  status?: string
  occupancy?: string
  occurredAt: string
}
EOF

cat > src/features/property/actions/propertyActions.ts <<'EOF'
export const propertyActions = {
  inspect: "property.inspect",
  refresh: "property.refresh",
  reconcile: "property.reconcile",
} as const
EOF

# ============================================================
# LEASE
# ============================================================

cat > src/features/lease/models/leaseViewModel.ts <<'EOF'
export interface LeaseViewModel {
  id: string
  propertyId: string
  tenantId: string
  status: string
  startDate: string
  endDate: string
  periodLabel: string
  daysRemaining?: number
}

export function buildLeaseViewModel(
  lease: {
    id: string
    propertyId: string
    tenantId: string
    status: string
    startDate: string
    endDate: string
  },
): LeaseViewModel {
  return {
    ...lease,
    periodLabel:
      `${lease.startDate} → ${lease.endDate}`,
  }
}
EOF

cat > src/features/lease/queries/leaseQuery.ts <<'EOF'
export interface LeaseQuery {
  search?: string
  status?: string
  propertyId?: string
  tenantId?: string
}
EOF

cat > src/features/lease/commands/changeLeaseState.ts <<'EOF'
export type LeaseStateCommand =
  | "activate"
  | "suspend"
  | "freeze"
  | "terminate"

export interface ChangeLeaseStateCommand {
  leaseId: string
  command: LeaseStateCommand
  reason: string
  expectedVersion?: number
}
EOF

cat > src/features/lease/presenters/leasePresenter.ts <<'EOF'
import {
  buildLeaseViewModel,
} from "../models/leaseViewModel"

export function presentLease(
  lease: Parameters<
    typeof buildLeaseViewModel
  >[0],
) {
  return buildLeaseViewModel(lease)
}
EOF

cat > src/features/lease/application/leaseApplication.ts <<'EOF'
export interface LeaseApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
}
EOF

cat > src/features/lease/tables/leaseTableModel.ts <<'EOF'
export interface LeaseTableRow {
  id: string
  tenant: string
  property: string
  status: string
  period: string
  version: string
}
EOF

cat > src/features/lease/details/leaseDetail.ts <<'EOF'
export interface LeaseDetail {
  id: string
  tenantId: string
  propertyId: string
  status: string
  startDate: string
  endDate: string
  version: number
  entitlementThrough?: string
  graceUntil?: string
}
EOF

cat > src/features/lease/timeline/leaseTimeline.ts <<'EOF'
export interface LeaseTimelineEvent {
  id: string
  leaseId: string
  type: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/lease/workflows/leaseLifecycle.ts <<'EOF'
export type LeaseLifecycleStep =
  | "inspect"
  | "validate"
  | "entitlement"
  | "payment"
  | "access"
  | "complete"

export interface LeaseLifecycleState {
  step: LeaseLifecycleStep
  leaseId: string
  error?: string
}
EOF

cat > src/features/lease/events/leaseEventProjection.ts <<'EOF'
export interface LeaseEventProjection {
  leaseId: string
  status?: string
  entitlementChanged: boolean
  occurredAt: string
}
EOF

cat > src/features/lease/actions/leaseActions.ts <<'EOF'
export const leaseActions = {
  inspect: "lease.inspect",
  activate: "lease.activate",
  suspend: "lease.suspend",
  freeze: "lease.freeze",
  terminate: "lease.terminate",
} as const
EOF

# ============================================================
# PAYMENT
# ============================================================

cat > src/features/payment/models/paymentViewModel.ts <<'EOF'
export interface PaymentViewModel {
  id: string
  reference: string
  amountLabel: string
  status: string
  reconciliation: string
  leaseId?: string
  tenantId: string
}

export function buildPaymentViewModel(
  payment: {
    id: string
    reference: string
    amountUGX: number
    currency: string
    status: string
    reconciliationStatus: string
    leaseId?: string
    tenantId: string
  },
): PaymentViewModel {
  return {
    id: payment.id,
    reference: payment.reference,
    amountLabel:
      new Intl.NumberFormat("en-UG", {
        style: "currency",
        currency: payment.currency,
        maximumFractionDigits: 0,
      }).format(payment.amountUGX),
    status: payment.status,
    reconciliation:
      payment.reconciliationStatus,
    leaseId: payment.leaseId,
    tenantId: payment.tenantId,
  }
}
EOF

cat > src/features/payment/queries/paymentQuery.ts <<'EOF'
export interface PaymentQuery {
  search?: string
  tenantId?: string
  leaseId?: string
  status?: string
  reconciliationStatus?: string
  provider?: string
}
EOF

cat > src/features/payment/commands/reconcilePayment.ts <<'EOF'
export interface ReconcilePaymentCommand {
  paymentId: string
  reason: string
  idempotencyKey?: string
}
EOF

cat > src/features/payment/commands/retryPayment.ts <<'EOF'
export interface RetryPaymentCommand {
  paymentId: string
  reason: string
  idempotencyKey?: string
}
EOF

cat > src/features/payment/presenters/paymentPresenter.ts <<'EOF'
import {
  buildPaymentViewModel,
} from "../models/paymentViewModel"

export function presentPayment(
  payment: Parameters<
    typeof buildPaymentViewModel
  >[0],
) {
  return buildPaymentViewModel(payment)
}
EOF

cat > src/features/payment/application/paymentApplication.ts <<'EOF'
export interface PaymentApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
  reconcile(id: string, reason: string): Promise<unknown>
}
EOF

cat > src/features/payment/tables/paymentTableModel.ts <<'EOF'
export interface PaymentTableRow {
  id: string
  reference: string
  tenant: string
  amount: string
  status: string
  reconciliation: string
  provider: string
}
EOF

cat > src/features/payment/details/paymentDetail.ts <<'EOF'
export interface PaymentDetail {
  id: string
  reference: string
  amountUGX: number
  currency: string
  status: string
  reconciliationStatus: string
  provider?: string
  providerReference?: string
  tenantId: string
  leaseId?: string
  createdAt?: string
  settledAt?: string
}
EOF

cat > src/features/payment/timeline/paymentTimeline.ts <<'EOF'
export interface PaymentTimelineEvent {
  id: string
  paymentId: string
  type: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/payment/workflows/paymentSettlement.ts <<'EOF'
export type PaymentSettlementStep =
  | "inspect"
  | "validate"
  | "settlement"
  | "reconciliation"
  | "entitlement"
  | "complete"

export interface PaymentSettlementState {
  step: PaymentSettlementStep
  paymentId: string
  error?: string
}
EOF

cat > src/features/payment/events/paymentEventProjection.ts <<'EOF'
export interface PaymentEventProjection {
  paymentId: string
  status?: string
  reconciliationStatus?: string
  entitlementImpact?: string
  occurredAt: string
}
EOF

cat > src/features/payment/actions/paymentActions.ts <<'EOF'
export const paymentActions = {
  inspect: "payment.inspect",
  reconcile: "payment.reconcile",
  retry: "payment.retry",
  reverse: "payment.reverse",
} as const
EOF

# ============================================================
# DEVICE
# ============================================================

cat > src/features/device/models/deviceViewModel.ts <<'EOF'
export interface DeviceViewModel {
  id: string
  name: string
  serialNumber?: string
  connection: string
  health: string
  battery: string
  firmware: string
}

export function buildDeviceViewModel(
  device: {
    id: string
    name: string
    serialNumber?: string
    connectionStatus: string
    healthStatus: string
    batteryPercent?: number
    firmwareVersion?: string
  },
): DeviceViewModel {
  return {
    id: device.id,
    name: device.name,
    serialNumber: device.serialNumber,
    connection:
      device.connectionStatus,
    health: device.healthStatus,
    battery:
      device.batteryPercent == null
        ? "Unknown"
        : `${device.batteryPercent}%`,
    firmware:
      device.firmwareVersion ?? "Unknown",
  }
}
EOF

cat > src/features/device/queries/deviceQuery.ts <<'EOF'
export interface DeviceQuery {
  deviceId: string
}
EOF

cat > src/features/device/commands/deviceCommand.ts <<'EOF'
export interface DeviceCommand {
  deviceId: string
  commandType: string
  payload?: unknown
  reason: string
  correlationId?: string
}
EOF

cat > src/features/device/commands/refreshDevice.ts <<'EOF'
export interface RefreshDeviceCommand {
  deviceId: string
  reason: string
}
EOF

cat > src/features/device/presenters/devicePresenter.ts <<'EOF'
import {
  buildDeviceViewModel,
} from "../models/deviceViewModel"

export function presentDevice(
  device: Parameters<
    typeof buildDeviceViewModel
  >[0],
) {
  return buildDeviceViewModel(device)
}
EOF

cat > src/features/device/application/deviceApplication.ts <<'EOF'
export interface DeviceApplication {
  get(id: string): Promise<unknown>
  executeCommand(
    input: unknown,
  ): Promise<unknown>
}
EOF

cat > src/features/device/tables/deviceTableModel.ts <<'EOF'
export interface DeviceTableRow {
  id: string
  name: string
  connection: string
  health: string
  battery: string
  firmware: string
}
EOF

cat > src/features/device/details/deviceDetail.ts <<'EOF'
export interface DeviceDetail {
  id: string
  name: string
  serialNumber?: string
  propertyId?: string
  lockId?: string
  connectionStatus: string
  healthStatus: string
  batteryPercent?: number
  firmwareVersion?: string
  lastSeenAt?: string
}
EOF

cat > src/features/device/timeline/deviceTimeline.ts <<'EOF'
export interface DeviceTimelineEvent {
  id: string
  deviceId: string
  type: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/device/workflows/deviceCommandWorkflow.ts <<'EOF'
export type DeviceCommandWorkflowStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "observe"
  | "complete"

export interface DeviceCommandWorkflowState {
  step: DeviceCommandWorkflowStep
  deviceId: string
  commandType: string
  commandId?: string
  error?: string
}
EOF

cat > src/features/device/events/deviceEventProjection.ts <<'EOF'
export interface DeviceEventProjection {
  deviceId: string
  connectionStatus?: string
  commandStatus?: string
  commandId?: string
  occurredAt: string
}
EOF

cat > src/features/device/actions/deviceActions.ts <<'EOF'
export const deviceActions = {
  inspect: "device.inspect",
  refresh: "device.refresh",
  register: "device.register",
  connect: "device.connect",
  disconnect: "device.disconnect",
  command: "device.command",
} as const
EOF

# ============================================================
# LOCK
# ============================================================

cat > src/features/lock/models/lockViewModel.ts <<'EOF'
export interface LockViewModel {
  id: string
  name: string
  state: string
  readiness: string
  battery: string
  commandReady: boolean
}

export function buildLockViewModel(
  lock: {
    id: string
    name: string
    state: string
    readiness: string
    batteryPercent?: number
  },
): LockViewModel {
  return {
    id: lock.id,
    name: lock.name,
    state: lock.state,
    readiness: lock.readiness,
    battery:
      lock.batteryPercent == null
        ? "Unknown"
        : `${lock.batteryPercent}%`,
    commandReady:
      lock.readiness === "ready" &&
      lock.state !== "jammed" &&
      lock.state !== "offline",
  }
}
EOF

cat > src/features/lock/queries/lockQuery.ts <<'EOF'
export interface LockQuery {
  search?: string
  state?: string
  readiness?: string
  leaseId?: string
  deviceId?: string
}
EOF

cat > src/features/lock/commands/lockCommand.ts <<'EOF'
export interface LockCommand {
  lockId: string
  command:
    | "lock"
    | "unlock"
    | "freeze"
    | "release"
    | "revoke_access"
  reason: string
}
EOF

cat > src/features/lock/presenters/lockPresenter.ts <<'EOF'
import {
  buildLockViewModel,
} from "../models/lockViewModel"

export function presentLock(
  lock: Parameters<
    typeof buildLockViewModel
  >[0],
) {
  return buildLockViewModel(lock)
}
EOF

cat > src/features/lock/application/lockApplication.ts <<'EOF'
export interface LockApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
  execute(
    command: unknown,
  ): Promise<never>
}
EOF

cat > src/features/lock/tables/lockTableModel.ts <<'EOF'
export interface LockTableRow {
  id: string
  name: string
  state: string
  readiness: string
  battery: string
  leaseId: string
  deviceId: string
}
EOF

cat > src/features/lock/details/lockDetail.ts <<'EOF'
export interface LockDetail {
  id: string
  name: string
  propertyId?: string
  leaseId?: string
  deviceId?: string
  state: string
  readiness: string
  batteryPercent?: number
  firmwareVersion?: string
}
EOF

cat > src/features/lock/timeline/lockTimeline.ts <<'EOF'
export interface LockTimelineEvent {
  id: string
  lockId: string
  commandId?: string
  type: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/lock/workflows/lockCommandWorkflow.ts <<'EOF'
export type LockCommandWorkflowStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "await-result"
  | "complete"
  | "failed"

export interface LockCommandWorkflowState {
  step: LockCommandWorkflowStep
  lockId: string
  command: string
  commandId?: string
  error?: string
}
EOF

cat > src/features/lock/events/lockEventProjection.ts <<'EOF'
export interface LockEventProjection {
  lockId?: string
  deviceId?: string
  state?: string
  commandId?: string
  commandStatus?: string
  occurredAt: string
}
EOF

cat > src/features/lock/actions/lockActions.ts <<'EOF'
export const lockActions = {
  inspect: "lock.inspect",
  lock: "lock.lock",
  unlock: "lock.unlock",
  freeze: "lock.freeze",
  release: "lock.release",
  revokeAccess: "lock.revoke-access",
} as const
EOF

# ============================================================
# SECURITY
# ============================================================

cat > src/features/security/models/securityViewModel.ts <<'EOF'
export interface SecurityViewModel {
  posture: string
  emergencyFreeze: string
  activeCredentials: string
  revokedCredentials: string
  restrictedAccess: string
  criticalEvents: string
}

export function buildSecurityViewModel(
  input: {
    posture: string
    emergencyFreezeActive: boolean
    activeCredentials: number
    revokedCredentials: number
    restrictedAccesses: number
    criticalEvents: number
  },
): SecurityViewModel {
  return {
    posture: input.posture,
    emergencyFreeze:
      input.emergencyFreezeActive
        ? "ACTIVE"
        : "INACTIVE",
    activeCredentials:
      input.activeCredentials.toLocaleString(),
    revokedCredentials:
      input.revokedCredentials.toLocaleString(),
    restrictedAccess:
      input.restrictedAccesses.toLocaleString(),
    criticalEvents:
      input.criticalEvents.toLocaleString(),
  }
}
EOF

cat > src/features/security/queries/securityQuery.ts <<'EOF'
export interface SecurityQuery {
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  severity?: string
}
EOF

cat > src/features/security/commands/accessCommand.ts <<'EOF'
export interface AccessCommand {
  subjectId: string
  action:
    | "grant"
    | "restrict"
    | "revoke"
    | "freeze"
  propertyId?: string
  leaseId?: string
  lockId?: string
  reason: string
}
EOF

cat > src/features/security/commands/emergencyFreeze.ts <<'EOF'
export interface EmergencyFreezeCommand {
  propertyId?: string
  leaseId?: string
  reason: string
  correlationId?: string
}
EOF

cat > src/features/security/presenters/securityPresenter.ts <<'EOF'
import {
  buildSecurityViewModel,
} from "../models/securityViewModel"

export function presentSecurity(
  input: Parameters<
    typeof buildSecurityViewModel
  >[0],
) {
  return buildSecurityViewModel(input)
}
EOF

cat > src/features/security/application/securityApplication.ts <<'EOF'
export interface SecurityApplication {
  summary(): Promise<unknown>
  credentials(): Promise<unknown[]>
  access(): Promise<unknown[]>
  events(): Promise<unknown[]>
}
EOF

cat > src/features/security/tables/securityTableModel.ts <<'EOF'
export interface SecurityTableRow {
  id: string
  type: string
  subject: string
  severity: string
  message: string
  occurredAt: string
}
EOF

cat > src/features/security/details/securityDetail.ts <<'EOF'
export interface SecurityDetail {
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  accessState?: string
  credentialStatus?: string
  frozen: boolean
}
EOF

cat > src/features/security/timeline/securityTimeline.ts <<'EOF'
export interface SecurityTimelineEvent {
  id: string
  type: string
  severity: "info" | "warning" | "critical"
  message: string
  occurredAt: string
}
EOF

cat > src/features/security/workflows/emergencyFreezeWorkflow.ts <<'EOF'
export type EmergencyFreezeWorkflowStep =
  | "inspect"
  | "authorize"
  | "freeze"
  | "revoke"
  | "observe"
  | "complete"
  | "failed"

export interface EmergencyFreezeWorkflowState {
  step: EmergencyFreezeWorkflowStep
  propertyId?: string
  leaseId?: string
  error?: string
}
EOF

cat > src/features/security/events/securityEventProjection.ts <<'EOF'
export interface SecurityEventProjection {
  type: string
  severity: "info" | "warning" | "critical"
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  occurredAt: string
}
EOF

cat > src/features/security/actions/securityActions.ts <<'EOF'
export const securityActions = {
  inspect: "security.inspect",
  grant: "security.grant",
  restrict: "security.restrict",
  revoke: "security.revoke",
  freeze: "security.freeze",
  audit: "security.audit",
} as const
EOF

# ============================================================
# INDEXES
# ============================================================

for feature in dashboard property lease payment device lock security
do
cat > "src/features/$feature/application/index.ts" <<EOF
export * from "./${feature}Application"
EOF

cat > "src/features/$feature/queries/index.ts" <<EOF
export * from "./${feature}Query"
EOF

done

echo
echo "============================================================"
echo "PHASE 9Z COMPLETE"
echo "============================================================"
echo "Dashboard implementation depth: CREATED"
echo "Property implementation depth: CREATED"
echo "Lease implementation depth: CREATED"
echo "Payment implementation depth: CREATED"
echo "Device implementation depth: CREATED"
echo "Lock implementation depth: CREATED"
echo "Security implementation depth: CREATED"
echo "Shared domain presentation: CREATED"
echo "Commands/queries/actions: CREATED"
echo "Detail/table/timeline models: CREATED"
echo "Workflow state machines: CREATED"
echo "Event projections: CREATED"
echo "Tests: NOT CREATED"
echo "NO BUILD RUN"
echo "============================================================"

echo
echo "FILE COUNT SNAPSHOT"
find src -type f | wc -l

echo
echo "============================================================"
echo "NEXT: PHASE 10A"
echo "============================================================"
