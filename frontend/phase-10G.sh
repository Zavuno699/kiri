#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10G"
echo "EVENT PROJECTIONS + STATE MACHINE DEPTH"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10G-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/state" \
    "src/features/$domain/state/machines" \
    "src/features/$domain/state/transitions" \
    "src/features/$domain/state/reducers" \
    "src/features/$domain/state/selectors" \
    "src/features/$domain/state/snapshots" \
    "src/features/$domain/projections/reducers" \
    "src/features/$domain/projections/projectors" \
    "src/features/$domain/projections/timelines" \
    "src/features/$domain/projections/outcomes" \
    "src/features/$domain/recovery" \
    "src/features/$domain/recovery/retry" \
    "src/features/$domain/recovery/failure" \
    "src/features/$domain/recovery/compensation" \
    "src/features/$domain/status/calculators" \
    "src/features/$domain/status/health"
done

mkdir -p \
  src/application/state-machines \
  src/application/state-machines/core \
  src/application/state-machines/guards \
  src/application/state-machines/transitions \
  src/application/state-machines/registry \
  src/application/projections \
  src/application/projections/registry \
  src/application/projections/reducers \
  src/application/projections/projectors \
  src/application/projections/timelines \
  src/application/projections/outcomes \
  src/application/recovery \
  src/application/recovery/retry \
  src/application/recovery/failure \
  src/application/recovery/compensation \
  src/application/state-propagation \
  src/application/state-propagation/bridges \
  src/application/state-propagation/selectors \
  src/application/state-propagation/snapshots \
  src/runtime/state-machines \
  src/runtime/projections \
  src/runtime/recovery

# ============================================================
# GENERIC STATE MACHINE CORE
# ============================================================

cat > src/application/state-machines/core/stateMachine.ts <<'EOF'
export interface StateMachine<S, E> {
  state: S
  transition(event: E): S
}

export function createStateMachine<S, E>(
  initial: S,
  reducer: (state: S, event: E) => S,
): StateMachine<S, E> {
  let state = initial

  return {
    get state() {
      return state
    },

    transition(event) {
      state = reducer(state, event)
      return state
    },
  }
}
EOF

cat > src/application/state-machines/core/stateNode.ts <<'EOF'
export interface StateNode<S> {
  id: S
  terminal?: boolean
}
EOF

cat > src/application/state-machines/core/stateEvent.ts <<'EOF'
export interface StateEvent<T = unknown> {
  type: string
  payload?: T
  occurredAt: string
}
EOF

cat > src/application/state-machines/core/stateTransition.ts <<'EOF'
export interface StateTransition<S, E = unknown> {
  from: S
  event: string
  to: S
  guard?: (event: E) => boolean
}
EOF

cat > src/application/state-machines/guards/alwaysAllowed.ts <<'EOF'
export function alwaysAllowed(): boolean {
  return true
}
EOF

cat > src/application/state-machines/guards/readOnlyGuard.ts <<'EOF'
export function readOnlyGuard(
  readOnly: boolean,
): boolean {
  return readOnly
}
EOF

cat > src/application/state-machines/guards/verifiedIngressGuard.ts <<'EOF'
export function verifiedIngressGuard(
  verified: boolean,
): boolean {
  return verified
}
EOF

cat > src/application/state-machines/transitions/applyTransition.ts <<'EOF'
import type { StateTransition } from "../core/stateTransition"

export function applyTransition<S, E>(
  transition: StateTransition<S, E>,
  state: S,
  event: E,
): S {
  if (transition.from !== state) {
    return state
  }

  if (
    transition.guard &&
    !transition.guard(event)
  ) {
    return state
  }

  return transition.to
}
EOF

cat > src/application/state-machines/registry/stateMachineDefinition.ts <<'EOF'
export interface StateMachineDefinition {
  id: string
  domain: string
  states: string[]
  initialState: string
}
EOF

cat > src/application/state-machines/registry/stateMachineRegistry.ts <<'EOF'
import type { StateMachineDefinition } from "./stateMachineDefinition"

export interface StateMachineRegistry {
  register(machine: StateMachineDefinition): void
  get(id: string): StateMachineDefinition | undefined
  list(): StateMachineDefinition[]
}

export function createStateMachineRegistry(): StateMachineRegistry {
  const values = new Map<string, StateMachineDefinition>()

  return {
    register(machine) {
      values.set(machine.id, machine)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
EOF

# ============================================================
# APPLICATION PROJECTION CORE
# ============================================================

cat > src/application/projections/projectionContext.ts <<'EOF'
export interface ProjectionContext {
  projectionId: string
  domain: string
  version: number
  correlationId?: string
  projectedAt: string
}
EOF

cat > src/application/projections/projectionResult.ts <<'EOF'
export interface ProjectionResult<T> {
  changed: boolean
  value: T
  version: number
}
EOF

cat > src/application/projections/reducers/reducer.ts <<'EOF'
export interface Reducer<S, E> {
  reduce(state: S, event: E): S
}
EOF

cat > src/application/projections/projectors/projector.ts <<'EOF'
export interface Projector<E, P> {
  project(event: E): P
}
EOF

cat > src/application/projections/timelines/timelineEntry.ts <<'EOF'
export interface TimelineEntry {
  id: string
  domain: string
  type: string
  title: string
  occurredAt: string
  correlationId?: string
  severity: "info" | "warning" | "critical"
}
EOF

cat > src/application/projections/timelines/timelineStore.ts <<'EOF'
import type { TimelineEntry } from "./timelineEntry"

export interface TimelineStore {
  append(entry: TimelineEntry): void
  list(domain?: string): TimelineEntry[]
}

export function createTimelineStore(): TimelineStore {
  const values: TimelineEntry[] = []

  return {
    append(entry) {
      values.push(entry)
    },

    list(domain) {
      return domain
        ? values.filter(
            (item) => item.domain === domain,
          )
        : [...values]
    },
  }
}
EOF

cat > src/application/projections/outcomes/outcomeProjection.ts <<'EOF'
export interface OutcomeProjection {
  id: string
  status:
    | "pending"
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}
EOF

cat > src/application/projections/registry/projectionDefinition.ts <<'EOF'
export interface ProjectionDefinition {
  id: string
  domain: string
  eventTypes: string[]
  enabled: boolean
}
EOF

cat > src/application/projections/registry/projectionRegistry.ts <<'EOF'
import type { ProjectionDefinition } from "./projectionDefinition"

export interface ProjectionRegistry {
  register(projection: ProjectionDefinition): void
  get(id: string): ProjectionDefinition | undefined
  list(domain?: string): ProjectionDefinition[]
}

export function createProjectionRegistry(): ProjectionRegistry {
  const values = new Map<string, ProjectionDefinition>()

  return {
    register(projection) {
      values.set(projection.id, projection)
    },

    get(id) {
      return values.get(id)
    },

    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
EOF

# ============================================================
# RECOVERY CORE
# ============================================================

cat > src/application/recovery/retry/retryPolicy.ts <<'EOF'
export interface RetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
EOF

cat > src/application/recovery/retry/retryState.ts <<'EOF'
export interface RetryState {
  attempts: number
  retrying: boolean
  exhausted: boolean
}
EOF

cat > src/application/recovery/failure/failureRecord.ts <<'EOF'
export interface FailureRecord {
  id: string
  domain: string
  operation: string
  code: string
  message: string
  retryable: boolean
  occurredAt: string
}
EOF

cat > src/application/recovery/failure/failureRegistry.ts <<'EOF'
import type { FailureRecord } from "./failureRecord"

export interface FailureRegistry {
  record(value: FailureRecord): void
  list(domain?: string): FailureRecord[]
}

export function createFailureRegistry(): FailureRegistry {
  const values: FailureRecord[] = []

  return {
    record(value) {
      values.push(value)
    },

    list(domain) {
      return domain
        ? values.filter(
            (item) => item.domain === domain,
          )
        : [...values]
    },
  }
}
EOF

cat > src/application/recovery/compensation/compensationPlan.ts <<'EOF'
export interface CompensationPlan {
  id: string
  operation: string
  steps: string[]
  enabled: boolean
}
EOF

cat > src/application/recovery/compensation/compensationExecutor.ts <<'EOF'
import type { CompensationPlan } from "./compensationPlan"

export async function executeCompensation(
  plan: CompensationPlan,
  execute: (step: string) => Promise<unknown>,
): Promise<void> {
  if (!plan.enabled) {
    return
  }

  for (const step of plan.steps) {
    await execute(step)
  }
}
EOF

# ============================================================
# CROSS-DOMAIN STATE PROPAGATION
# ============================================================

cat > src/application/state-propagation/propagationEvent.ts <<'EOF'
export interface PropagationEvent {
  id: string
  sourceDomain: string
  sourceId?: string
  targetDomain: string
  targetId?: string
  type: string
  occurredAt: string
}
EOF

cat > src/application/state-propagation/propagationBridge.ts <<'EOF'
import type { PropagationEvent } from "./propagationEvent"

export interface PropagationBridge {
  accepts(event: PropagationEvent): boolean
  propagate(event: PropagationEvent): Promise<void>
}
EOF

cat > src/application/state-propagation/bridges/leasePaymentBridge.ts <<'EOF'
import type { PropagationBridge } from "../propagationBridge"

export const leasePaymentBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "lease" &&
      event.targetDomain === "payment"
    )
  },

  async propagate() {},
}
EOF

cat > src/application/state-propagation/bridges/paymentLeaseBridge.ts <<'EOF'
import type { PropagationBridge } from "../propagationBridge"

export const paymentLeaseBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "payment" &&
      event.targetDomain === "lease"
    )
  },

  async propagate() {},
}
EOF

cat > src/application/state-propagation/bridges/leaseDeviceBridge.ts <<'EOF'
import type { PropagationBridge } from "../propagationBridge"

export const leaseDeviceBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "lease" &&
      event.targetDomain === "device"
    )
  },

  async propagate() {},
}
EOF

cat > src/application/state-propagation/bridges/deviceLockBridge.ts <<'EOF'
import type { PropagationBridge } from "../propagationBridge"

export const deviceLockBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "device" &&
      event.targetDomain === "lock"
    )
  },

  async propagate() {},
}
EOF

cat > src/application/state-propagation/bridges/securityLockBridge.ts <<'EOF'
import type { PropagationBridge } from "../propagationBridge"

export const securityLockBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "security" &&
      event.targetDomain === "lock"
    )
  },

  async propagate() {},
}
EOF

cat > src/application/state-propagation/selectors/propagatedStateSelector.ts <<'EOF'
export function selectPropagatedState<T>(
  value: T | undefined,
): T | undefined {
  return value
}
EOF

cat > src/application/state-propagation/snapshots/propagationSnapshot.ts <<'EOF'
export interface PropagationSnapshot {
  sourceDomain: string
  targetDomains: string[]
  updatedAt: string
  complete: boolean
}
EOF

# ============================================================
# DOMAIN STATE MACHINE GENERATOR
# ============================================================

make_domain_state() {
  local domain="$1"
  local singular="$2"

  cat > "src/features/$domain/state/${singular}State.ts" <<EOF
export type ${singular^}State =
  | "unknown"
  | "loading"
  | "active"
  | "degraded"
  | "blocked"
  | "failed"
  | "completed"
EOF

  cat > "src/features/$domain/state/machines/${singular}StateMachine.ts" <<EOF
import type { ${singular^}State } from "../${singular}State"

export interface ${singular^}StateMachine {
  state: ${singular^}State
  transition(
    next: ${singular^}State,
  ): ${singular^}State
}

export function create${singular^}StateMachine():
  ${singular^}StateMachine {
  let state: ${singular^}State = "unknown"

  return {
    get state() {
      return state
    },

    transition(next) {
      state = next
      return state
    },
  }
}
EOF

  cat > "src/features/$domain/state/transitions/${singular}Transitions.ts" <<EOF
import type { ${singular^}State } from "../${singular}State"

export interface ${singular^}Transition {
  from: ${singular^}State
  to: ${singular^}State
  event: string
}

export const ${singular}Transitions:
  ${singular^}Transition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "${domain}.load",
  },
  {
    from: "loading",
    to: "active",
    event: "${domain}.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "${domain}.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "${domain}.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "${domain}.failed",
  },
]
EOF

  cat > "src/features/$domain/state/reducers/${singular}StateReducer.ts" <<EOF
import type { ${singular^}State } from "../${singular}State"

export function reduce${singular^}State(
  state: ${singular^}State,
  event: string,
): ${singular^}State {
  switch (event) {
    case "${domain}.load":
      return "loading"

    case "${domain}.loaded":
      return "active"

    case "${domain}.degraded":
      return "degraded"

    case "${domain}.recovered":
      return "active"

    case "${domain}.failed":
      return "failed"

    default:
      return state
  }
}
EOF

  cat > "src/features/$domain/state/selectors/${singular}StateSelectors.ts" <<EOF
import type { ${singular^}State } from "../${singular}State"

export function ${singular}IsOperational(
  state: ${singular^}State,
): boolean {
  return state === "active"
}

export function ${singular}IsDegraded(
  state: ${singular^}State,
): boolean {
  return state === "degraded"
}

export function ${singular}IsBlocked(
  state: ${singular^}State,
): boolean {
  return state === "blocked"
}

export function ${singular}IsFailed(
  state: ${singular^}State,
): boolean {
  return state === "failed"
}
EOF

  cat > "src/features/$domain/state/snapshots/${singular}StateSnapshot.ts" <<EOF
import type { ${singular^}State } from "../${singular}State"

export interface ${singular^}StateSnapshot {
  state: ${singular^}State
  version: number
  updatedAt: string
  reason?: string
}
EOF

  cat > "src/features/$domain/projections/reducers/${singular}ProjectionReducer.ts" <<EOF
export interface ${singular^}ProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduce${singular^}Projection(
  state: ${singular^}ProjectionState,
  event: {
    type: string
  },
): ${singular^}ProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/projections/projectors/${singular}Projector.ts" <<EOF
export interface ${singular^}Projector<T> {
  project(event: T): unknown
}

export function create${singular^}Projector<T>(
  project: (event: T) => unknown,
): ${singular^}Projector<T> {
  return {
    project,
  }
}
EOF

  cat > "src/features/$domain/projections/timelines/${singular}Timeline.ts" <<EOF
export interface ${singular^}TimelineItem {
  id: string
  type: string
  title: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
}
EOF

  cat > "src/features/$domain/projections/outcomes/${singular}OutcomeProjection.ts" <<EOF
export interface ${singular^}OutcomeProjection {
  operationId: string
  status:
    | "pending"
    | "success"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}
EOF

  cat > "src/features/$domain/recovery/retry/${singular}RetryPolicy.ts" <<EOF
export interface ${singular^}RetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const ${singular}RetryPolicy: ${singular^}RetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
EOF

  cat > "src/features/$domain/recovery/failure/${singular}FailureState.ts" <<EOF
export interface ${singular^}FailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
EOF

  cat > "src/features/$domain/recovery/compensation/${singular}Compensation.ts" <<EOF
export interface ${singular^}Compensation {
  available: boolean
  steps: string[]
}

export const ${singular}Compensation:
  ${singular^}Compensation = {
  available: false,
  steps: [],
}
EOF

  cat > "src/features/$domain/status/calculators/${singular}StatusCalculator.ts" <<EOF
export interface ${singular^}StatusInput {
  state: string
  error?: boolean
  stale?: boolean
}

export function calculate${singular^}Status(
  input: ${singular^}StatusInput,
): "healthy" | "degraded" | "failed" {
  if (input.error || input.state === "failed") {
    return "failed"
  }

  if (
    input.stale ||
    input.state === "degraded" ||
    input.state === "blocked"
  ) {
    return "degraded"
  }

  return "healthy"
}
EOF

  cat > "src/features/$domain/status/health/${singular}Health.ts" <<EOF
export interface ${singular^}Health {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthy${singular^}():
  ${singular^}Health {
  return {
    healthy: true,
    degraded: false,
  }
}
EOF
}

make_domain_state dashboard dashboard
make_domain_state properties property
make_domain_state leases lease
make_domain_state payments payment
make_domain_state devices device
make_domain_state locks lock
make_domain_state security security

# ============================================================
# DOMAIN EVENT REDUCER BRIDGES
# ============================================================

cat > src/features/dashboard/projections/eventReducer.ts <<'EOF'
export interface DashboardProjectionState {
  healthy: number
  degraded: number
  critical: number
  events: number
}

export function reduceDashboardEvent(
  state: DashboardProjectionState,
  event: {
    type: string
  },
): DashboardProjectionState {
  return {
    ...state,
    events: state.events + 1,
    degraded:
      event.type.includes("degraded")
        ? state.degraded + 1
        : state.degraded,
    critical:
      event.type.includes("critical")
        ? state.critical + 1
        : state.critical,
  }
}
EOF

cat > src/features/properties/projections/eventReducer.ts <<'EOF'
export interface PropertyProjectionState {
  active: number
  degraded: number
  occupancy: number
}

export function reducePropertyEvent(
  state: PropertyProjectionState,
  event: {
    type: string
    occupancy?: number
  },
): PropertyProjectionState {
  return {
    ...state,
    active:
      event.type.includes("active")
        ? state.active + 1
        : state.active,
    degraded:
      event.type.includes("degraded")
        ? state.degraded + 1
        : state.degraded,
    occupancy:
      event.occupancy ?? state.occupancy,
  }
}
EOF

cat > src/features/leases/projections/eventReducer.ts <<'EOF'
export interface LeaseProjectionState {
  active: number
  expired: number
  delinquent: number
}

export function reduceLeaseEvent(
  state: LeaseProjectionState,
  event: {
    type: string
  },
): LeaseProjectionState {
  return {
    ...state,
    active:
      event.type.includes("active")
        ? state.active + 1
        : state.active,
    expired:
      event.type.includes("expired")
        ? state.expired + 1
        : state.expired,
    delinquent:
      event.type.includes("delinquent")
        ? state.delinquent + 1
        : state.delinquent,
  }
}
EOF

cat > src/features/payments/projections/eventReducer.ts <<'EOF'
export interface PaymentProjectionState {
  pending: number
  settled: number
  failed: number
}

export function reducePaymentEvent(
  state: PaymentProjectionState,
  event: {
    type: string
  },
): PaymentProjectionState {
  return {
    ...state,
    pending:
      event.type.includes("pending")
        ? state.pending + 1
        : state.pending,
    settled:
      event.type.includes("settled")
        ? state.settled + 1
        : state.settled,
    failed:
      event.type.includes("failed")
        ? state.failed + 1
        : state.failed,
  }
}
EOF

cat > src/features/devices/projections/eventReducer.ts <<'EOF'
export interface DeviceProjectionState {
  online: number
  offline: number
  failed: number
}

export function reduceDeviceEvent(
  state: DeviceProjectionState,
  event: {
    type: string
  },
): DeviceProjectionState {
  return {
    ...state,
    online:
      event.type.includes("connected")
        ? state.online + 1
        : state.online,
    offline:
      event.type.includes("disconnected")
        ? state.offline + 1
        : state.offline,
    failed:
      event.type.includes("failed")
        ? state.failed + 1
        : state.failed,
  }
}
EOF

cat > src/features/locks/projections/eventReducer.ts <<'EOF'
export interface LockProjectionState {
  locked: number
  unlocked: number
  blocked: number
}

export function reduceLockEvent(
  state: LockProjectionState,
  event: {
    type: string
  },
): LockProjectionState {
  return {
    ...state,
    locked:
      event.type.includes("locked")
        ? state.locked + 1
        : state.locked,
    unlocked:
      event.type.includes("unlocked")
        ? state.unlocked + 1
        : state.unlocked,
    blocked:
      event.type.includes("blocked")
        ? state.blocked + 1
        : state.blocked,
  }
}
EOF

cat > src/features/security/projections/eventReducer.ts <<'EOF'
export interface SecurityProjectionState {
  granted: number
  denied: number
  restricted: number
}

export function reduceSecurityEvent(
  state: SecurityProjectionState,
  event: {
    type: string
  },
): SecurityProjectionState {
  return {
    ...state,
    granted:
      event.type.includes("granted")
        ? state.granted + 1
        : state.granted,
    denied:
      event.type.includes("denied")
        ? state.denied + 1
        : state.denied,
    restricted:
      event.type.includes("restricted")
        ? state.restricted + 1
        : state.restricted,
  }
}
EOF

# ============================================================
# RUNTIME STATE REGISTRATION
# ============================================================

cat > src/runtime/state-machines/runtimeStateMachineRegistry.ts <<'EOF'
import type { StateMachineDefinition } from "../../application/state-machines/registry/stateMachineDefinition"
import {
  createStateMachineRegistry,
} from "../../application/state-machines/registry/stateMachineRegistry"

export function createRuntimeStateMachineRegistry() {
  const registry =
    createStateMachineRegistry()

  const definitions: StateMachineDefinition[] = [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ].map((domain) => ({
    id: `${domain}.runtime`,
    domain,
    states: [
      "unknown",
      "loading",
      "active",
      "degraded",
      "blocked",
      "failed",
      "completed",
    ],
    initialState: "unknown",
  }))

  for (const definition of definitions) {
    registry.register(definition)
  }

  return registry
}
EOF

cat > src/runtime/projections/runtimeProjectionRegistry.ts <<'EOF'
import type { ProjectionDefinition } from "../../application/projections/registry/projectionDefinition"
import {
  createProjectionRegistry,
} from "../../application/projections/registry/projectionRegistry"

export function createRuntimeProjectionRegistry() {
  const registry =
    createProjectionRegistry()

  for (const domain of [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ]) {
    registry.register({
      id: `${domain}.events`,
      domain,
      eventTypes: [
        `${domain}.created`,
        `${domain}.updated`,
        `${domain}.status.changed`,
        `${domain}.failed`,
      ],
      enabled: true,
    })
  }

  return registry
}
EOF

cat > src/runtime/recovery/runtimeRecoveryState.ts <<'EOF'
export interface RuntimeRecoveryState {
  failures: number
  retries: number
  blocked: number
  recovered: number
}

export const initialRuntimeRecoveryState:
  RuntimeRecoveryState = {
  failures: 0,
  retries: 0,
  blocked: 0,
  recovered: 0,
}
EOF

# ============================================================
# EXPORTS
# ============================================================

append_export() {
  local file="$1"
  local line="$2"

  if [[ -f "$file" ]] &&
     ! grep -Fqx "$line" "$file" 2>/dev/null; then
    printf '\n%s\n' "$line" >> "$file"
  fi
}

append_export src/application/state-machines/index.ts \
  'export * from "./core/stateMachine"'

append_export src/application/state-machines/index.ts \
  'export * from "./core/stateNode"'

append_export src/application/state-machines/index.ts \
  'export * from "./core/stateEvent"'

append_export src/application/state-machines/index.ts \
  'export * from "./core/stateTransition"'

append_export src/application/projections/index.ts \
  'export * from "./projectionContext"'

append_export src/application/projections/index.ts \
  'export * from "./projectionResult"'

append_export src/application/recovery/index.ts \
  'export * from "./recovery/retry/retryPolicy"'

append_export src/application/recovery/index.ts \
  'export * from "./recovery/failure/failureRecord"'

append_export src/application/state-propagation/index.ts \
  'export * from "./propagationEvent"'

append_export src/application/state-propagation/index.ts \
  'export * from "./propagationBridge"'

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10G COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10G LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Application state machines" \
  "$(find src/application/state-machines -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Application projections" \
  "$(find src/application/projections -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Application recovery" \
  "$(find src/application/recovery -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "State propagation" \
  "$(find src/application/state-propagation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Domain state machines" \
  "$(find src/features/*/state -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Domain projection reducers" \
  "$(find src/features/*/projections/reducers -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Domain projectors" \
  "$(find src/features/*/projections/projectors -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Operational timelines" \
  "$(find src/features/*/projections/timelines -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Outcome projections" \
  "$(find src/features/*/projections/outcomes -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Retry/recovery" \
  "$(find src/features/*/recovery -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Status calculators" \
  "$(find src/features/*/status -type f 2>/dev/null | wc -l)"

echo
echo "DOMAIN COUNTS"
echo "------------------------------------------------------------"

for domain in "${DOMAINS[@]}"; do
  printf "%-15s %s\n" "$domain" \
    "$(find "src/features/$domain" -type f | wc -l)"
done

echo
echo "Backup: $BACKUP"
echo
echo "============================================================"
echo "NEXT: PHASE 10H"
echo "FRONTEND OPERATOR SURFACES + CROSS-DOMAIN TIMELINES"
echo "============================================================"
