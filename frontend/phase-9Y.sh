#!/bin/bash

set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 9Y"
echo "IMPLEMENTATION DEPTH PASS"
echo "============================================================"
echo "PWD: $PWD"
echo

mkdir -p \
  src/application/bus \
  src/application/registry \
  src/application/runtime \
  src/application/state \
  src/application/workflows \
  src/application/selectors \
  src/components/primitives \
  src/components/feedback \
  src/services/runtime \
  src/features/dashboard/runtime \
  src/features/property/runtime \
  src/features/lease/runtime \
  src/features/payment/runtime \
  src/features/device/runtime \
  src/features/lock/runtime \
  src/features/security/runtime

# ============================================================
# COMMAND BUS
# ============================================================

cat > src/application/bus/commandBus.ts <<'EOF'
export interface Command<TResponse = unknown> {
  type: string
  payload?: unknown
  execute(): Promise<TResponse>
}

export interface CommandHandler<T = unknown> {
  execute(command: Command<T>): Promise<T>
}

export class CommandBus {
  private readonly handlers =
    new Map<string, CommandHandler>()

  register(
    type: string,
    handler: CommandHandler,
  ): void {
    if (this.handlers.has(type)) {
      throw new Error(
        `Command handler already registered: ${type}`,
      )
    }

    this.handlers.set(type, handler)
  }

  async dispatch<T>(
    command: Command<T>,
  ): Promise<T> {
    const handler =
      this.handlers.get(command.type)

    if (!handler) {
      throw new Error(
        `No command handler registered for ${command.type}`,
      )
    }

    return handler.execute(command) as Promise<T>
  }

  has(type: string): boolean {
    return this.handlers.has(type)
  }
}

export const commandBus =
  new CommandBus()
EOF

# ============================================================
# QUERY BUS
# ============================================================

cat > src/application/bus/queryBus.ts <<'EOF'
export interface Query<TResponse = unknown> {
  type: string
  payload?: unknown
}

export interface QueryHandler<TQuery = unknown> {
  execute(query: TQuery): Promise<unknown>
}

export class QueryBus {
  private readonly handlers =
    new Map<string, QueryHandler>()

  register(
    type: string,
    handler: QueryHandler,
  ): void {
    this.handlers.set(type, handler)
  }

  async dispatch<T>(
    query: Query,
  ): Promise<T> {
    const handler =
      this.handlers.get(query.type)

    if (!handler) {
      throw new Error(
        `No query handler registered for ${query.type}`,
      )
    }

    return (
      await handler.execute(query)
    ) as T
  }

  has(type: string): boolean {
    return this.handlers.has(type)
  }
}

export const queryBus =
  new QueryBus()
EOF

# ============================================================
# EVENT BUS
# ============================================================

cat > src/application/bus/eventBus.ts <<'EOF'
export interface DomainEvent<T = unknown> {
  type: string
  payload: T
  occurredAt: string
  correlationId?: string
}

type EventHandler<T = unknown> =
  (event: DomainEvent<T>) =>
    void | Promise<void>

export class ApplicationEventBus {
  private readonly handlers =
    new Map<
      string,
      Set<EventHandler>
    >()

  subscribe<T>(
    type: string,
    handler: EventHandler<T>,
  ): () => void {
    const current =
      this.handlers.get(type) ??
      new Set<EventHandler>()

    current.add(
      handler as EventHandler,
    )

    this.handlers.set(type, current)

    return () => {
      current.delete(
        handler as EventHandler,
      )

      if (!current.size) {
        this.handlers.delete(type)
      }
    }
  }

  async publish<T>(
    event: DomainEvent<T>,
  ): Promise<void> {
    const handlers =
      this.handlers.get(event.type)

    if (!handlers) return

    for (const handler of handlers) {
      await handler(event)
    }
  }
}

export const applicationEventBus =
  new ApplicationEventBus()
EOF

# ============================================================
# REGISTRIES
# ============================================================

cat > src/application/registry/serviceRegistry.ts <<'EOF'
export class ServiceRegistry {
  private readonly services =
    new Map<string, unknown>()

  register<T>(
    token: string,
    service: T,
  ): void {
    this.services.set(token, service)
  }

  resolve<T>(
    token: string,
  ): T {
    const service =
      this.services.get(token)

    if (!service) {
      throw new Error(
        `Service not registered: ${token}`,
      )
    }

    return service as T
  }

  has(token: string): boolean {
    return this.services.has(token)
  }

  clear(): void {
    this.services.clear()
  }
}

export const serviceRegistry =
  new ServiceRegistry()
EOF

cat > src/application/registry/featureRegistry.ts <<'EOF'
export interface FeatureDefinition {
  id: string
  enabled: boolean
  initialize?: () => Promise<void>
  shutdown?: () => Promise<void>
}

export class FeatureRegistry {
  private readonly features =
    new Map<string, FeatureDefinition>()

  register(
    feature: FeatureDefinition,
  ): void {
    this.features.set(
      feature.id,
      feature,
    )
  }

  get(
    id: string,
  ): FeatureDefinition | undefined {
    return this.features.get(id)
  }

  list(): FeatureDefinition[] {
    return Array.from(
      this.features.values(),
    )
  }

  enabled(): FeatureDefinition[] {
    return this.list().filter(
      (feature) => feature.enabled,
    )
  }
}

export const featureRegistry =
  new FeatureRegistry()
EOF

# ============================================================
# RUNTIME STATE
# ============================================================

cat > src/application/state/resourceLifecycle.ts <<'EOF'
export type ResourceLifecycle =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "stale"
  | "error"

export interface ResourceState<T> {
  lifecycle: ResourceLifecycle
  data?: T
  error?: string
  updatedAt?: string
}

export function idleState<T>():
  ResourceState<T> {
  return {
    lifecycle: "idle",
  }
}

export function loadingState<T>(
  current?: T,
): ResourceState<T> {
  return {
    lifecycle:
      current === undefined
        ? "loading"
        : "refreshing",
    data: current,
  }
}

export function readyState<T>(
  data: T,
): ResourceState<T> {
  return {
    lifecycle: "ready",
    data,
    updatedAt:
      new Date().toISOString(),
  }
}

export function errorState<T>(
  error: unknown,
  current?: T,
): ResourceState<T> {
  return {
    lifecycle: "error",
    data: current,
    error:
      error instanceof Error
        ? error.message
        : "Resource operation failed.",
  }
}
EOF

cat > src/application/state/observableState.ts <<'EOF'
export type StateListener<T> =
  (state: T) => void

export class ObservableState<T> {
  private state: T
  private readonly listeners =
    new Set<StateListener<T>>()

  constructor(initial: T) {
    this.state = initial
  }

  get(): T {
    return this.state
  }

  set(next: T): void {
    this.state = next

    for (const listener of this.listeners) {
      listener(this.state)
    }
  }

  update(
    updater: (current: T) => T,
  ): void {
    this.set(updater(this.state))
  }

  subscribe(
    listener: StateListener<T>,
  ): () => void {
    this.listeners.add(listener)

    return () =>
      this.listeners.delete(listener)
  }
}
EOF

# ============================================================
# WORKFLOW ENGINE
# ============================================================

cat > src/application/workflows/workflowEngine.ts <<'EOF'
export interface WorkflowStep<TContext> {
  id: string
  execute(
    context: TContext,
  ): Promise<TContext>
}

export interface WorkflowDefinition<TContext> {
  id: string
  steps: WorkflowStep<TContext>[]
}

export async function executeWorkflow<
  TContext,
>(
  definition: WorkflowDefinition<TContext>,
  initial: TContext,
): Promise<TContext> {
  let context = initial

  for (const step of definition.steps) {
    context = await step.execute(context)
  }

  return context
}
EOF

cat > src/application/workflows/commandWorkflow.ts <<'EOF'
import type {
  CommandState,
} from "../commands/commandState"

export function isTerminalCommandState(
  state: CommandState,
): boolean {
  return (
    state.lifecycle === "accepted" ||
    state.lifecycle === "rejected" ||
    state.lifecycle === "failed" ||
    state.lifecycle === "complete"
  )
}

export function isCommandInFlight(
  state: CommandState,
): boolean {
  return (
    state.lifecycle === "validating" ||
    state.lifecycle === "authorized" ||
    state.lifecycle === "submitted"
  )
}
EOF

# ============================================================
# SELECTOR ENGINE
# ============================================================

cat > src/application/selectors/selectorRegistry.ts <<'EOF'
export type Selector<TState, TResult> =
  (state: TState) => TResult

export class SelectorRegistry<
  TState,
> {
  private readonly selectors =
    new Map<
      string,
      Selector<TState, unknown>
    >()

  register<TResult>(
    name: string,
    selector: Selector<TState, TResult>,
  ): void {
    this.selectors.set(
      name,
      selector as Selector<
        TState,
        unknown
      >,
    )
  }

  select<TResult>(
    name: string,
    state: TState,
  ): TResult {
    const selector =
      this.selectors.get(name)

    if (!selector) {
      throw new Error(
        `Selector not registered: ${name}`,
      )
    }

    return selector(state) as TResult
  }
}
EOF

# ============================================================
# REAL COMMAND HELPERS
# ============================================================

cat > src/application/commands/commandFactory.ts <<'EOF'
import type {
  CommandEnvelope,
} from "../../contracts/commands/commandEnvelope"

export function createCommandEnvelope<
  T,
>(
  commandType: string,
  payload: T,
  options: {
    operatorId?: string
    reason?: string
    correlationId?: string
  } = {},
): CommandEnvelope<T> {
  return {
    commandId: crypto.randomUUID(),
    commandType,
    issuedAt:
      new Date().toISOString(),
    operatorId:
      options.operatorId,
    reason:
      options.reason?.trim(),
    correlationId:
      options.correlationId ??
      crypto.randomUUID(),
    payload,
  }
}
EOF

# ============================================================
# DASHBOARD RUNTIME
# ============================================================

cat > src/features/dashboard/runtime/dashboardRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"
import {
  readyState,
} from "../../../application/state/resourceLifecycle"

export interface DashboardRuntimeState {
  lifecycle:
    | "idle"
    | "loading"
    | "ready"
    | "error"
  lastRefreshAt?: string
  error?: string
}

export const dashboardRuntime =
  new ObservableState<DashboardRuntimeState>(
    {
      lifecycle: "idle",
    },
  )

export function markDashboardReady(): void {
  dashboardRuntime.set({
    lifecycle: "ready",
    lastRefreshAt:
      readyState(
        true,
      ).updatedAt,
  })
}
EOF

# ============================================================
# DEVICE RUNTIME
# ============================================================

cat > src/features/device/runtime/deviceRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface DeviceRuntimeState {
  selectedDeviceId?: string
  commandInFlight: boolean
  lastCommandId?: string
  error?: string
}

export const deviceRuntime =
  new ObservableState<DeviceRuntimeState>(
    {
      commandInFlight: false,
    },
  )

export function selectDevice(
  deviceId: string,
): void {
  deviceRuntime.update(
    (current) => ({
      ...current,
      selectedDeviceId: deviceId,
      error: undefined,
    }),
  )
}
EOF

# ============================================================
# LOCK RUNTIME
# ============================================================

cat > src/features/lock/runtime/lockRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface LockRuntimeState {
  selectedLockId?: string
  commandInFlight: boolean
  commandState:
    | "idle"
    | "submitted"
    | "accepted"
    | "rejected"
    | "failed"
  error?: string
}

export const lockRuntime =
  new ObservableState<LockRuntimeState>(
    {
      commandInFlight: false,
      commandState: "idle",
    },
  )
EOF

# ============================================================
# PAYMENT RUNTIME
# ============================================================

cat > src/features/payment/runtime/paymentRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface PaymentRuntimeState {
  selectedPaymentId?: string
  reconciliationInFlight: boolean
  lastReconciliationAt?: string
  error?: string
}

export const paymentRuntime =
  new ObservableState<PaymentRuntimeState>(
    {
      reconciliationInFlight: false,
    },
  )
EOF

# ============================================================
# LEASE RUNTIME
# ============================================================

cat > src/features/lease/runtime/leaseRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface LeaseRuntimeState {
  selectedLeaseId?: string
  loadingEntitlement: boolean
  entitlementVerified: boolean
  error?: string
}

export const leaseRuntime =
  new ObservableState<LeaseRuntimeState>(
    {
      loadingEntitlement: false,
      entitlementVerified: false,
    },
  )
EOF

# ============================================================
# PROPERTY RUNTIME
# ============================================================

cat > src/features/property/runtime/propertyRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface PropertyRuntimeState {
  selectedPropertyId?: string
  refreshing: boolean
  error?: string
}

export const propertyRuntime =
  new ObservableState<PropertyRuntimeState>(
    {
      refreshing: false,
    },
  )
EOF

# ============================================================
# SECURITY RUNTIME
# ============================================================

cat > src/features/security/runtime/securityRuntime.ts <<'EOF'
import {
  ObservableState,
} from "../../../application/state/observableState"

export interface SecurityRuntimeState {
  emergencyFreezeActive: boolean
  credentialOperationInFlight: boolean
  auditLoading: boolean
  error?: string
}

export const securityRuntime =
  new ObservableState<SecurityRuntimeState>(
    {
      emergencyFreezeActive: false,
      credentialOperationInFlight: false,
      auditLoading: false,
    },
  )
EOF

# ============================================================
# REAL FEATURE SELECTORS
# ============================================================

cat > src/application/selectors/dashboardSelectors.ts <<'EOF'
export interface DashboardState {
  alerts: Array<{
    severity: string
  }>
  services: Array<{
    status: string
  }>
}

export function criticalAlertCount(
  state: DashboardState,
): number {
  return state.alerts.filter(
    (alert) =>
      alert.severity === "critical",
  ).length
}

export function unhealthyServiceCount(
  state: DashboardState,
): number {
  return state.services.filter(
    (service) =>
      service.status === "degraded" ||
      service.status === "offline",
  ).length
}
EOF

cat > src/application/selectors/paymentSelectors.ts <<'EOF'
export interface PaymentLike {
  status: string
  reconciliationStatus: string
  amountUGX: number
}

export function settledTotal(
  payments: PaymentLike[],
): number {
  return payments
    .filter(
      (payment) =>
        payment.status === "settled",
    )
    .reduce(
      (sum, payment) =>
        sum + payment.amountUGX,
      0,
    )
}

export function unmatchedCount(
  payments: PaymentLike[],
): number {
  return payments.filter(
    (payment) =>
      payment.reconciliationStatus ===
      "unmatched",
  ).length
}
EOF

cat > src/application/selectors/deviceSelectors.ts <<'EOF'
export interface DeviceLike {
  connectionStatus?: string
  healthStatus?: string
  batteryPercent?: number
}

export function offlineCount(
  devices: DeviceLike[],
): number {
  return devices.filter(
    (device) =>
      device.connectionStatus ===
      "offline",
  ).length
}

export function lowBatteryCount(
  devices: DeviceLike[],
  threshold = 20,
): number {
  return devices.filter(
    (device) =>
      device.batteryPercent != null &&
      device.batteryPercent <= threshold,
  ).length
}
EOF

cat > src/application/selectors/lockSelectors.ts <<'EOF'
export interface LockLike {
  state: string
  readiness: string
}

export function lockedCount(
  locks: LockLike[],
): number {
  return locks.filter(
    (lock) => lock.state === "locked",
  ).length
}

export function commandReadyCount(
  locks: LockLike[],
): number {
  return locks.filter(
    (lock) =>
      lock.readiness === "ready" &&
      lock.state !== "jammed" &&
      lock.state !== "offline",
  ).length
}
EOF

# ============================================================
# REAL UI PRIMITIVES
# ============================================================

cat > src/components/primitives/LoadingSkeleton.tsx <<'EOF'
export function LoadingSkeleton({
  className = "h-20",
}: {
  className?: string
}) {
  return (
    <div
      className={[
        "animate-pulse rounded-2xl bg-white/[0.04]",
        className,
      ].join(" ")}
    />
  )
}
EOF

cat > src/components/primitives/InlineStatus.tsx <<'EOF'
export function InlineStatus({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-kiri-text-muted">
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          active
            ? "bg-kiri-green shadow-[0_0_10px_rgba(37,201,149,.6)]"
            : "bg-kiri-text-muted/50",
        ].join(" ")}
      />
      {label}
    </span>
  )
}
EOF

cat > src/components/primitives/ActionCard.tsx <<'EOF'
import type { ReactNode } from "react"

export function ActionCard({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-900/60 p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-black">
            {title}
          </h3>

          <p className="mt-1 max-w-xl text-xs leading-5 text-kiri-text-muted">
            {description}
          </p>
        </div>

        {action ? (
          <div className="shrink-0">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  )
}
EOF

# ============================================================
# RUNTIME SERVICES
# ============================================================

cat > src/services/runtime/refreshManager.ts <<'EOF'
export interface Refreshable {
  refresh(): Promise<void>
}

export class RefreshManager {
  private readonly resources:
    Refreshable[] = []

  register(
    resource: Refreshable,
  ): void {
    this.resources.push(resource)
  }

  async refreshAll(): Promise<void> {
    for (const resource of this.resources) {
      await resource.refresh()
    }
  }
}

export const refreshManager =
  new RefreshManager()
EOF

cat > src/services/runtime/runtimeClock.ts <<'EOF'
export function nowIso(): string {
  return new Date().toISOString()
}

export function elapsedMs(
  startedAt: string,
): number {
  const started =
    new Date(startedAt).getTime()

  if (Number.isNaN(started)) {
    return 0
  }

  return Math.max(
    0,
    Date.now() - started,
  )
}
EOF

# ============================================================
# FEATURE RUNTIME INDEXES
# ============================================================

cat > src/features/dashboard/runtime/index.ts <<'EOF'
export {
  dashboardRuntime,
  markDashboardReady,
} from "./dashboardRuntime"
EOF

cat > src/features/device/runtime/index.ts <<'EOF'
export {
  deviceRuntime,
  selectDevice,
} from "./deviceRuntime"
EOF

cat > src/features/lock/runtime/index.ts <<'EOF'
export {
  lockRuntime,
} from "./lockRuntime"
EOF

cat > src/features/payment/runtime/index.ts <<'EOF'
export {
  paymentRuntime,
} from "./paymentRuntime"
EOF

cat > src/features/lease/runtime/index.ts <<'EOF'
export {
  leaseRuntime,
} from "./leaseRuntime"
EOF

cat > src/features/property/runtime/index.ts <<'EOF'
export {
  propertyRuntime,
} from "./propertyRuntime"
EOF

cat > src/features/security/runtime/index.ts <<'EOF'
export {
  securityRuntime,
} from "./securityRuntime"
EOF

# ============================================================
# APPLICATION RUNTIME REGISTRATION
# ============================================================

cat > src/application/runtime/registerCoreFeatures.ts <<'EOF'
import {
  featureRegistry,
} from "../registry/featureRegistry"

export function registerCoreFeatures(): void {
  const featureIds = [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ]

  for (const id of featureIds) {
    featureRegistry.register({
      id,
      enabled: true,
    })
  }
}
EOF

cat > src/application/runtime/registerCoreServices.ts <<'EOF'
import {
  serviceRegistry,
} from "../registry/serviceRegistry"

export function registerCoreServices(): void {
  serviceRegistry.register(
    "runtime:registered",
    true,
  )
}
EOF

# ============================================================
# FINAL PHASE OUTPUT
# ============================================================

echo
echo "============================================================"
echo "PHASE 9Y COMPLETE"
echo "============================================================"
echo "Command bus implementation: CREATED"
echo "Query bus implementation: CREATED"
echo "Event bus implementation: CREATED"
echo "Service registry: CREATED"
echo "Feature registry: CREATED"
echo "Resource lifecycle: CREATED"
echo "Observable state: CREATED"
echo "Workflow engine: CREATED"
echo "Command helpers: CREATED"
echo "Feature runtime state: CREATED"
echo "Real selectors: CREATED"
echo "Reusable UI primitives: CREATED"
echo "Runtime refresh services: CREATED"
echo "Feature runtime indexes: CREATED"
echo "Core feature registration: CREATED"
echo "Core service registration: CREATED"
echo "Tests: NOT CREATED"
echo "NO BUILD RUN"
echo "============================================================"

echo
echo "FILE COUNT SNAPSHOT"
find src -type f | wc -l

echo
echo "============================================================"
echo "NEXT: PHASE 9Z"
echo "============================================================"
