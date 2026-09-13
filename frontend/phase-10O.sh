#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10O"
echo "COMMAND SURFACES + OPERATOR ACTION WORKFLOWS"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10O-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/actions" \
    "src/features/$domain/actions/commands" \
    "src/features/$domain/actions/policy" \
    "src/features/$domain/actions/confirmation" \
    "src/features/$domain/actions/execution" \
    "src/features/$domain/actions/outcomes" \
    "src/features/$domain/actions/audit" \
    "src/features/$domain/actions/progress" \
    "src/features/$domain/actions/retry" \
    "src/features/$domain/actions/validation" \
    "src/features/$domain/workflows/actions" \
    "src/features/$domain/workflows/states" \
    "src/features/$domain/workflows/guards" \
    "src/features/$domain/workflows/steps" \
    "src/features/$domain/ui/actions" \
    "src/features/$domain/ui/commands" \
    "src/features/$domain/ui/confirmations" \
    "src/features/$domain/ui/progress"
done

mkdir -p \
  src/application/commands \
  src/application/commands/preparation \
  src/application/commands/authorization \
  src/application/commands/confirmation \
  src/application/commands/execution \
  src/application/commands/outcomes \
  src/application/commands/audit \
  src/application/commands/retry \
  src/application/workflows/actions \
  src/application/workflows/guards \
  src/application/workflows/steps \
  src/application/workflows/runtime \
  src/application/operator-actions \
  src/application/operator-actions/registry \
  src/application/operator-actions/policy \
  src/application/operator-actions/history \
  src/application/operator-actions/confirmation \
  src/runtime/operator-actions \
  src/runtime/operator-actions/registry \
  src/runtime/operator-actions/commands \
  src/runtime/operator-actions/workflows

# ============================================================
# COMMAND CORE
# ============================================================

cat > src/application/commands/preparation/commandPreparation.ts <<'EOF'
export interface CommandPreparation<T = unknown> {
  commandId: string
  domain: string
  type: string
  payload: T
  preparedAt: string
  correlationId: string
}

export function prepareCommand<T>(
  domain: string,
  type: string,
  payload: T,
): CommandPreparation<T> {
  return {
    commandId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    type,
    payload,
    preparedAt: new Date().toISOString(),
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
  }
}
EOF

cat > src/application/commands/authorization/authorizationDecision.ts <<'EOF'
export interface AuthorizationDecision {
  allowed: boolean
  reason?: string
  permission?: string
}
EOF

cat > src/application/commands/authorization/authorizeCommand.ts <<'EOF'
import type { AuthorizationDecision } from "./authorizationDecision"

export function authorizeCommand(
  authenticated: boolean,
  authorized: boolean,
  permission?: string,
): AuthorizationDecision {
  if (!authenticated) {
    return {
      allowed: false,
      reason: "Authentication required.",
      permission,
    }
  }

  if (!authorized) {
    return {
      allowed: false,
      reason: "Authorization denied.",
      permission,
    }
  }

  return {
    allowed: true,
    permission,
  }
}
EOF

cat > src/application/commands/confirmation/confirmationState.ts <<'EOF'
export type ConfirmationState =
  | "not-required"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "expired"
EOF

cat > src/application/commands/confirmation/commandConfirmation.ts <<'EOF'
import type { ConfirmationState } from "./confirmationState"

export interface CommandConfirmation {
  commandId: string
  state: ConfirmationState
  required: boolean
  requestedAt?: string
  confirmedAt?: string
  reason?: string
}
EOF

cat > src/application/commands/execution/commandExecution.ts <<'EOF'
export interface CommandExecution {
  commandId: string
  state:
    | "pending"
    | "running"
    | "completed"
    | "failed"
    | "blocked"
  startedAt?: string
  completedAt?: string
  error?: string
}
EOF

cat > src/application/commands/outcomes/commandOutcome.ts <<'EOF'
export interface CommandOutcome {
  commandId: string
  accepted: boolean
  state:
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  correlationId?: string
}
EOF

cat > src/application/commands/audit/commandAuditRecord.ts <<'EOF'
export interface CommandAuditRecord {
  id: string
  commandId: string
  domain: string
  action: string
  actorId?: string
  result:
    | "prepared"
    | "authorized"
    | "confirmed"
    | "completed"
    | "failed"
    | "blocked"
  occurredAt: string
  reason?: string
}
EOF

cat > src/application/commands/retry/commandRetryState.ts <<'EOF'
export interface CommandRetryState {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const defaultCommandRetryState:
  CommandRetryState = {
  attempts: 0,
  maxAttempts: 3,
  retryable: true,
  exhausted: false,
}
EOF

# ============================================================
# GENERIC OPERATOR ACTIONS
# ============================================================

cat > src/application/operator-actions/operatorActionDefinition.ts <<'EOF'
export interface OperatorActionDefinition {
  id: string
  domain: string
  label: string
  commandType: string
  destructive: boolean
  confirmationRequired: boolean
  enabled: boolean
  reason?: string
}
EOF

cat > src/application/operator-actions/registry/operatorActionRegistry.ts <<'EOF'
import type { OperatorActionDefinition } from "../operatorActionDefinition"

export interface OperatorActionRegistry {
  register(value: OperatorActionDefinition): void
  get(id: string): OperatorActionDefinition | undefined
  list(domain?: string): OperatorActionDefinition[]
}

export function createOperatorActionRegistry():
  OperatorActionRegistry {
  const values = new Map<
    string,
    OperatorActionDefinition
  >()

  return {
    register(value) {
      values.set(value.id, value)
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

cat > src/application/operator-actions/policy/operatorActionPolicy.ts <<'EOF'
export interface OperatorActionPolicy {
  authenticated: boolean
  authorized: boolean
  available: boolean
  confirmed: boolean
  allowed: boolean
  reason?: string
}

export function evaluateOperatorAction(
  input: Omit<
    OperatorActionPolicy,
    "allowed"
  >,
): OperatorActionPolicy {
  if (!input.authenticated) {
    return {
      ...input,
      allowed: false,
      reason: "Authentication required.",
    }
  }

  if (!input.authorized) {
    return {
      ...input,
      allowed: false,
      reason: "Authorization denied.",
    }
  }

  if (!input.available) {
    return {
      ...input,
      allowed: false,
      reason: "Operational capability unavailable.",
    }
  }

  if (!input.confirmed) {
    return {
      ...input,
      allowed: false,
      reason: "Confirmation required.",
    }
  }

  return {
    ...input,
    allowed: true,
  }
}
EOF

cat > src/application/operator-actions/confirmation/confirmationManager.ts <<'EOF'
export interface ConfirmationManager {
  request(
    commandId: string,
    reason?: string,
  ): void

  confirm(commandId: string): void
  cancel(commandId: string): void
  isConfirmed(commandId: string): boolean
}

export function createConfirmationManager():
  ConfirmationManager {
  const states = new Map<string, boolean>()

  return {
    request(commandId) {
      states.set(commandId, false)
    },

    confirm(commandId) {
      states.set(commandId, true)
    },

    cancel(commandId) {
      states.delete(commandId)
    },

    isConfirmed(commandId) {
      return states.get(commandId) === true
    },
  }
}
EOF

cat > src/application/operator-actions/history/operatorActionHistory.ts <<'EOF'
export interface OperatorActionHistoryEntry {
  id: string
  domain: string
  action: string
  commandId: string
  outcome: string
  occurredAt: string
}

export interface OperatorActionHistory {
  append(value: OperatorActionHistoryEntry): void
  list(domain?: string): OperatorActionHistoryEntry[]
}

export function createOperatorActionHistory():
  OperatorActionHistory {
  const values: OperatorActionHistoryEntry[] = []

  return {
    append(value) {
      values.unshift(value)
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

# ============================================================
# WORKFLOW CORE
# ============================================================

cat > src/application/workflows/actions/actionWorkflow.ts <<'EOF'
export interface ActionWorkflowContext {
  commandId: string
  domain: string
  entityId?: string
  state: string
  progress: number
  message?: string
}
EOF

cat > src/application/workflows/actions/actionWorkflowResult.ts <<'EOF'
export interface ActionWorkflowResult {
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  progress: number
  message?: string
}
EOF

cat > src/application/workflows/guards/authenticationGuard.ts <<'EOF'
export function authenticationGuard(
  authenticated: boolean,
): boolean {
  return authenticated
}
EOF

cat > src/application/workflows/guards/authorizationGuard.ts <<'EOF'
export function authorizationGuard(
  authorized: boolean,
): boolean {
  return authorized
}
EOF

cat > src/application/workflows/guards/capabilityGuard.ts <<'EOF'
export function capabilityGuard(
  available: boolean,
): boolean {
  return available
}
EOF

cat > src/application/workflows/guards/confirmationGuard.ts <<'EOF'
export function confirmationGuard(
  confirmed: boolean,
): boolean {
  return confirmed
}
EOF

cat > src/application/workflows/steps/prepareStep.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function prepareStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "prepared",
    progress: 15,
  }
}
EOF

cat > src/application/workflows/steps/authorizeStep.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function authorizeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "authorized",
    progress: 30,
  }
}
EOF

cat > src/application/workflows/steps/confirmStep.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function confirmStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "confirmed",
    progress: 45,
  }
}
EOF

cat > src/application/workflows/steps/executeStep.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function executeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "executing",
    progress: 75,
  }
}
EOF

cat > src/application/workflows/steps/completeStep.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function completeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "completed",
    progress: 100,
  }
}
EOF

cat > src/application/workflows/runtime/runActionWorkflow.ts <<'EOF'
import type { ActionWorkflowContext } from "../actions/actionWorkflow"
import { prepareStep } from "../steps/prepareStep"
import { authorizeStep } from "../steps/authorizeStep"
import { confirmStep } from "../steps/confirmStep"
import { executeStep } from "../steps/executeStep"
import { completeStep } from "../steps/completeStep"

export async function runActionWorkflow(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  let current = await prepareStep(context)
  current = await authorizeStep(current)
  current = await confirmStep(current)
  current = await executeStep(current)
  current = await completeStep(current)
  return current
}
EOF

# ============================================================
# DOMAIN ACTION GENERATOR
# ============================================================

make_domain_actions() {
  local domain="$1"
  local singular="$2"
  local label="$3"
  local enabled="$4"

  cat > "src/features/$domain/actions/commands/${singular}ActionCommand.ts" <<EOF
import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface ${singular^}ActionCommand {
  commandId: string
  type: string
  domain: "${domain}"
  entityId?: string
  payload?: unknown
}

export function create${singular^}ActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): ${singular^}ActionCommand {
  const command =
    prepareCommand(
      "${domain}",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "${domain}",
    entityId,
    payload,
  }
}
EOF

  cat > "src/features/$domain/actions/policy/${singular}ActionPolicy.ts" <<EOF
export interface ${singular^}ActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const ${singular}ActionPolicy:
  ${singular^}ActionPolicy = {
  enabled: ${enabled},
  confirmationRequired: true,
  reason:
    ${enabled}
      ? undefined
      : "Production command ingress is not verified.",
}
EOF

  cat > "src/features/$domain/actions/confirmation/${singular}Confirmation.ts" <<EOF
export interface ${singular^}Confirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function create${singular^}Confirmation(
  commandId: string,
): ${singular^}Confirmation {
  return {
    commandId,
    required: true,
    confirmed: false,
    reason:
      ${enabled}
        ? undefined
        : "Command capability is unavailable.",
  }
}
EOF

  cat > "src/features/$domain/actions/execution/${singular}Execution.ts" <<EOF
export interface ${singular^}Execution {
  commandId: string
  state:
    | "idle"
    | "pending"
    | "running"
    | "completed"
    | "failed"
    | "blocked"
  progress: number
  error?: string
}
EOF

  cat > "src/features/$domain/actions/outcomes/${singular}Outcome.ts" <<EOF
export interface ${singular^}Outcome {
  commandId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
EOF

  cat > "src/features/$domain/actions/audit/${singular}ActionAudit.ts" <<EOF
export interface ${singular^}ActionAudit {
  commandId: string
  action: string
  result: string
  occurredAt: string
}
EOF

  cat > "src/features/$domain/actions/progress/${singular}ActionProgress.ts" <<EOF
export interface ${singular^}ActionProgress {
  commandId: string
  step: string
  progress: number
}
EOF

  cat > "src/features/$domain/actions/retry/${singular}ActionRetry.ts" <<EOF
export interface ${singular^}ActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const ${singular}ActionRetry:
  ${singular^}ActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: ${enabled},
  exhausted: false,
}
EOF

  cat > "src/features/$domain/actions/validation/${singular}ActionValidation.ts" <<EOF
export interface ${singular^}ActionValidation {
  valid: boolean
  errors: string[]
}

export function validate${singular^}Action(
  entityId?: string,
): ${singular^}ActionValidation {
  const errors: string[] = []

  if (!entityId) {
    errors.push("Entity identifier is required.")
  }

  if (!${enabled}) {
    errors.push(
      "Production action capability is not verified.",
    )
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
EOF

  cat > "src/features/$domain/workflows/actions/${singular}ActionWorkflow.ts" <<EOF
import type { ActionWorkflowContext } from "../../../../application/workflows/actions/actionWorkflow"
import { runActionWorkflow } from "../../../../application/workflows/runtime/runActionWorkflow"

export async function run${singular^}ActionWorkflow(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  if (!${enabled}) {
    return {
      ...context,
      state: "blocked",
      progress: 0,
      message:
        "Production command capability is not verified.",
    }
  }

  return runActionWorkflow(context)
}
EOF

  cat > "src/features/$domain/workflows/states/${singular}ActionState.ts" <<EOF
export type ${singular^}ActionState =
  | "idle"
  | "prepared"
  | "authorized"
  | "confirmed"
  | "executing"
  | "completed"
  | "failed"
  | "blocked"
EOF

  cat > "src/features/$domain/workflows/guards/${singular}ActionGuard.ts" <<EOF
export function ${singular}ActionGuard(
  enabled: boolean,
  authenticated: boolean,
  authorized: boolean,
): boolean {
  return (
    enabled &&
    authenticated &&
    authorized
  )
}
EOF

  cat > "src/features/$domain/workflows/steps/${singular}PrepareStep.ts" <<EOF
export function prepare${singular^}Step(
  entityId: string,
) {
  return {
    entityId,
    prepared: ${enabled},
  }
}
EOF

  cat > "src/features/$domain/ui/actions/${singular}ActionPanel.tsx" <<EOF
import type { ReactNode } from "react"

export function ${singular^}ActionPanel({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        ${label} actions
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {children}
      </div>
    </section>
  )
}
EOF

  cat > "src/features/$domain/ui/commands/${singular}CommandButton.tsx" <<EOF
export function ${singular^}CommandButton({
  label,
  disabled = false,
}: {
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-kiri-text disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  )
}
EOF

  cat > "src/features/$domain/ui/confirmations/${singular}CommandConfirmation.tsx" <<EOF
export function ${singular^}CommandConfirmation({
  required,
  confirmed,
  reason,
}: {
  required: boolean
  confirmed: boolean
  reason?: string
}) {
  return (
    <div className="rounded-lg border border-white/7 bg-kiri-950/50 p-3 text-xs text-kiri-text-muted">
      {confirmed
        ? "Command confirmed."
        : required
          ? "Confirmation required before execution."
          : "Confirmation not required."}

      {reason ? (
        <div className="mt-1 text-[10px]">
          {reason}
        </div>
      ) : null}
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/progress/${singular}CommandProgress.tsx" <<EOF
export function ${singular^}CommandProgress({
  progress,
  state,
}: {
  progress: number
  state: string
}) {
  const normalized = Math.max(
    0,
    Math.min(100, progress),
  )

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-kiri-text-muted">
        <span>{state}</span>
        <span>{normalized}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-kiri-blue-500"
          style={{
            width: \`\${normalized}%\`,
          }}
        />
      </div>
    </div>
  )
}
EOF
}

make_domain_actions dashboard dashboard Dashboard false
make_domain_actions properties property Properties false
make_domain_actions leases lease Leases false
make_domain_actions payments payment Payments false
make_domain_actions devices device Devices true
make_domain_actions locks lock Locks false
make_domain_actions security security Security false

# ============================================================
# VERIFIED DEVICE OPERATION ACTIONS
# ============================================================

cat > src/features/devices/actions/commands/deviceRegisterAction.ts <<'EOF'
export interface DeviceRegisterAction {
  deviceId: string
  metadata?: Record<string, unknown>
}

export function createDeviceRegisterAction(
  deviceId: string,
  metadata?: Record<string, unknown>,
): DeviceRegisterAction {
  return {
    deviceId,
    metadata,
  }
}
EOF

cat > src/features/devices/actions/commands/deviceStatusAction.ts <<'EOF'
export interface DeviceStatusAction {
  deviceId: string
}

export function createDeviceStatusAction(
  deviceId: string,
): DeviceStatusAction {
  return {
    deviceId,
  }
}
EOF

cat > src/features/devices/actions/commands/deviceCommandAction.ts <<'EOF'
export interface DeviceCommandAction {
  deviceId: string
  command: string
  payload?: Record<string, unknown>
}

export function createDeviceCommandAction(
  deviceId: string,
  command: string,
  payload?: Record<string, unknown>,
): DeviceCommandAction {
  return {
    deviceId,
    command,
    payload,
  }
}
EOF

# ============================================================
# READ-ONLY BUSINESS DOMAIN ACTIONS
# ============================================================

cat > src/features/properties/actions/commands/propertyRefreshAction.ts <<'EOF'
export interface PropertyRefreshAction {
  propertyId?: string
}

export function createPropertyRefreshAction(
  propertyId?: string,
): PropertyRefreshAction {
  return {
    propertyId,
  }
}
EOF

cat > src/features/leases/actions/commands/leaseRefreshAction.ts <<'EOF'
export interface LeaseRefreshAction {
  leaseId?: string
}

export function createLeaseRefreshAction(
  leaseId?: string,
): LeaseRefreshAction {
  return {
    leaseId,
  }
}
EOF

cat > src/features/payments/actions/commands/paymentRefreshAction.ts <<'EOF'
export interface PaymentRefreshAction {
  paymentId?: string
}

export function createPaymentRefreshAction(
  paymentId?: string,
): PaymentRefreshAction {
  return {
    paymentId,
  }
}
EOF

cat > src/features/dashboard/actions/commands/dashboardRefreshAction.ts <<'EOF'
export interface DashboardRefreshAction {
  reason?: "manual" | "event" | "startup"
}

export function createDashboardRefreshAction(
  reason: DashboardRefreshAction["reason"] = "manual",
): DashboardRefreshAction {
  return {
    reason,
  }
}
EOF

# ============================================================
# FAIL-CLOSED LOCK / SECURITY ACTIONS
# ============================================================

cat > src/features/locks/actions/commands/lockCommandBlocked.ts <<'EOF'
export interface LockCommandBlocked {
  allowed: false
  reason: string
}

export const lockCommandBlocked:
  LockCommandBlocked = {
  allowed: false,
  reason:
    "Lock production HTTP command ingress is not verified.",
}
EOF

cat > src/features/security/actions/commands/securityCommandBlocked.ts <<'EOF'
export interface SecurityCommandBlocked {
  allowed: false
  reason: string
}

export const securityCommandBlocked:
  SecurityCommandBlocked = {
  allowed: false,
  reason:
    "Security production HTTP command ingress is not verified.",
}
EOF

# ============================================================
# RUNTIME ACTION REGISTRATION
# ============================================================

cat > src/runtime/operator-actions/registry/runtimeActionDefinitions.ts <<'EOF'
import type { OperatorActionDefinition } from "../../application/operator-actions/operatorActionDefinition"

export const runtimeActionDefinitions:
  OperatorActionDefinition[] = [
  {
    id: "dashboard.refresh",
    domain: "dashboard",
    label: "Refresh operations",
    commandType: "dashboard.refresh",
    destructive: false,
    confirmationRequired: false,
    enabled: true,
  },
  {
    id: "property.refresh",
    domain: "property",
    label: "Refresh properties",
    commandType: "property.refresh",
    destructive: false,
    confirmationRequired: false,
    enabled: true,
  },
  {
    id: "lease.refresh",
    domain: "lease",
    label: "Refresh leases",
    commandType: "lease.refresh",
    destructive: false,
    confirmationRequired: false,
    enabled: true,
  },
  {
    id: "payment.refresh",
    domain: "payment",
    label: "Refresh payments",
    commandType: "payment.refresh",
    destructive: false,
    confirmationRequired: false,
    enabled: true,
  },
  {
    id: "device.register",
    domain: "device",
    label: "Register device",
    commandType: "device.register",
    destructive: false,
    confirmationRequired: true,
    enabled: true,
  },
  {
    id: "device.command",
    domain: "device",
    label: "Send device command",
    commandType: "device.command",
    destructive: true,
    confirmationRequired: true,
    enabled: true,
  },
  {
    id: "lock.command",
    domain: "lock",
    label: "Lock command",
    commandType: "lock.command",
    destructive: true,
    confirmationRequired: true,
    enabled: false,
    reason:
      "Production lock command ingress is not verified.",
  },
  {
    id: "security.command",
    domain: "security",
    label: "Security command",
    commandType: "security.command",
    destructive: true,
    confirmationRequired: true,
    enabled: false,
    reason:
      "Production security command ingress is not verified.",
  },
]
EOF

cat > src/runtime/operator-actions/commands/runtimeCommandAvailability.ts <<'EOF'
import {
  runtimeActionDefinitions,
} from "../registry/runtimeActionDefinitions"

export function runtimeCommandAvailability(
  id: string,
) {
  return runtimeActionDefinitions.find(
    (item) => item.id === id,
  )
}
EOF

cat > src/runtime/operator-actions/workflows/runtimeActionWorkflowState.ts <<'EOF'
export interface RuntimeActionWorkflowState {
  active: number
  completed: number
  failed: number
  blocked: number
}

export const initialRuntimeActionWorkflowState:
  RuntimeActionWorkflowState = {
  active: 0,
  completed: 0,
  failed: 0,
  blocked: 0,
}
EOF

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10O COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10O LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Command core" \
  "$(find src/application/commands -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workflow core" \
  "$(find src/application/workflows -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Operator actions" \
  "$(find src/application/operator-actions -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature action surfaces" \
  "$(find src/features/*/actions -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature action workflows" \
  "$(find src/features/*/workflows/actions src/features/*/workflows/states src/features/*/workflows/guards src/features/*/workflows/steps -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Action UI surfaces" \
  "$(find src/features/*/ui/actions src/features/*/ui/commands src/features/*/ui/confirmations src/features/*/ui/progress -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime operator actions" \
  "$(find src/runtime/operator-actions -type f 2>/dev/null | wc -l)"

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
echo "NEXT: PHASE 10P"
echo "FRONTEND EVENT-DRIVEN UI SYNCHRONIZATION + LIVE OPERATIONAL STATE"
echo "============================================================"
