#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10P"
echo "EVENT-DRIVEN UI SYNCHRONIZATION + LIVE OPERATIONAL STATE"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10P-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/live" \
    "src/features/$domain/live/events" \
    "src/features/$domain/live/subscriptions" \
    "src/features/$domain/live/handlers" \
    "src/features/$domain/live/reducers" \
    "src/features/$domain/live/projections" \
    "src/features/$domain/live/invalidation" \
    "src/features/$domain/live/refresh" \
    "src/features/$domain/live/notifications" \
    "src/features/$domain/live/status" \
    "src/features/$domain/live/timeline" \
    "src/features/$domain/live/synchronization" \
    "src/features/$domain/live/runtime"
done

mkdir -p \
  src/application/live \
  src/application/live/events \
  src/application/live/subscriptions \
  src/application/live/router \
  src/application/live/reducers \
  src/application/live/projections \
  src/application/live/invalidation \
  src/application/live/refresh \
  src/application/live/notifications \
  src/application/live/timeline \
  src/application/live/synchronization \
  src/application/live/runtime \
  src/application/live/resources \
  src/runtime/live \
  src/runtime/live/events \
  src/runtime/live/subscriptions \
  src/runtime/live/refresh \
  src/runtime/live/resources \
  src/runtime/live/dashboard \
  src/runtime/live/devices

# ============================================================
# LIVE EVENT CORE
# ============================================================

cat > src/application/live/events/liveEvent.ts <<'EOF'
export interface LiveEvent<T = unknown> {
  id: string
  type: string
  domain: string
  payload?: T
  occurredAt: string
  correlationId?: string
  causationId?: string
}
EOF

cat > src/application/live/events/liveEventFactory.ts <<'EOF'
import type { LiveEvent } from "./liveEvent"

export function createLiveEvent<T>(
  type: string,
  domain: string,
  payload?: T,
  correlationId?: string,
): LiveEvent<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    occurredAt: new Date().toISOString(),
    correlationId,
  }
}
EOF

cat > src/application/live/events/liveEventTypes.ts <<'EOF'
export const liveEventTypes = {
  resourceUpdated: "resource.updated",
  resourceInvalidated: "resource.invalidated",
  resourceRefreshed: "resource.refreshed",
  commandAccepted: "command.accepted",
  commandCompleted: "command.completed",
  commandFailed: "command.failed",
  commandBlocked: "command.blocked",
  entityStatusChanged: "entity.status.changed",
  timelineAppended: "timeline.appended",
  notificationCreated: "notification.created",
} as const
EOF

cat > src/application/live/subscriptions/liveSubscription.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"

export type LiveSubscriber =
  (event: LiveEvent) => void

export interface LiveSubscription {
  id: string
  unsubscribe(): void
}
EOF

cat > src/application/live/subscriptions/liveEventBus.ts <<'EOF'
import type {
  LiveEvent,
} from "../events/liveEvent"
import type {
  LiveSubscriber,
  LiveSubscription,
} from "./liveSubscription"

export interface LiveEventBus {
  subscribe(
    subscriber: LiveSubscriber,
  ): LiveSubscription

  publish(event: LiveEvent): void
}

export function createLiveEventBus():
  LiveEventBus {
  const subscribers =
    new Map<string, LiveSubscriber>()

  return {
    subscribe(subscriber) {
      const id =
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random()}`

      subscribers.set(id, subscriber)

      return {
        id,
        unsubscribe() {
          subscribers.delete(id)
        },
      }
    },

    publish(event) {
      for (const subscriber of subscribers.values()) {
        subscriber(event)
      }
    },
  }
}
EOF

# ============================================================
# EVENT ROUTING
# ============================================================

cat > src/application/live/router/liveRoute.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"

export interface LiveRoute {
  id: string
  domain?: string
  eventType?: string
  handle(
    event: LiveEvent,
  ): void
}
EOF

cat > src/application/live/router/liveRouter.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"
import type { LiveRoute } from "./liveRoute"

export interface LiveRouter {
  register(route: LiveRoute): void
  route(event: LiveEvent): void
}

export function createLiveRouter(): LiveRouter {
  const routes: LiveRoute[] = []

  return {
    register(route) {
      routes.push(route)
    },

    route(event) {
      for (const route of routes) {
        const domainMatches =
          route.domain === undefined ||
          route.domain === event.domain

        const typeMatches =
          route.eventType === undefined ||
          route.eventType === event.type

        if (domainMatches && typeMatches) {
          route.handle(event)
        }
      }
    },
  }
}
EOF

cat > src/application/live/router/createDomainRoute.ts <<'EOF'
import type { LiveRoute } from "./liveRoute"

export function createDomainRoute(
  domain: string,
  handle: LiveRoute["handle"],
): LiveRoute {
  return {
    id:
      `${domain}.live`,
    domain,
    handle,
  }
}
EOF

# ============================================================
# INVALIDATION / REFRESH
# ============================================================

cat > src/application/live/invalidation/liveInvalidation.ts <<'EOF'
export interface LiveInvalidation {
  key: string
  domain: string
  reason: string
  occurredAt: string
}
EOF

cat > src/application/live/invalidation/liveInvalidationManager.ts <<'EOF'
import type { LiveInvalidation } from "./liveInvalidation"

export interface LiveInvalidationManager {
  invalidate(
    key: string,
    domain: string,
    reason: string,
  ): void

  consume(
    key: string,
  ): LiveInvalidation | undefined

  list(): LiveInvalidation[]
}

export function createLiveInvalidationManager():
  LiveInvalidationManager {
  const values =
    new Map<string, LiveInvalidation>()

  return {
    invalidate(key, domain, reason) {
      values.set(key, {
        key,
        domain,
        reason,
        occurredAt:
          new Date().toISOString(),
      })
    },

    consume(key) {
      const value = values.get(key)
      values.delete(key)
      return value
    },

    list() {
      return [...values.values()]
    },
  }
}
EOF

cat > src/application/live/refresh/liveRefreshRequest.ts <<'EOF'
export interface LiveRefreshRequest {
  key: string
  domain: string
  reason:
    | "event"
    | "manual"
    | "stale"
    | "command"
    | "reconciliation"
  requestedAt: string
}
EOF

cat > src/application/live/refresh/liveRefreshQueue.ts <<'EOF'
import type { LiveRefreshRequest } from "./liveRefreshRequest"

export interface LiveRefreshQueue {
  enqueue(value: LiveRefreshRequest): void
  next(): LiveRefreshRequest | undefined
  list(): LiveRefreshRequest[]
}

export function createLiveRefreshQueue():
  LiveRefreshQueue {
  const values: LiveRefreshRequest[] = []

  return {
    enqueue(value) {
      if (
        values.some(
          (item) => item.key === value.key,
        )
      ) {
        return
      }

      values.push(value)
    },

    next() {
      return values.shift()
    },

    list() {
      return [...values]
    },
  }
}
EOF

cat > src/application/live/refresh/liveRefreshController.ts <<'EOF'
export interface LiveRefreshController {
  request(
    key: string,
    refresh: () => Promise<unknown>,
  ): Promise<void>
}

export function createLiveRefreshController():
  LiveRefreshController {
  return {
    async request(_key, refresh) {
      await refresh()
    },
  }
}
EOF

# ============================================================
# LIVE RESOURCE STATE
# ============================================================

cat > src/application/live/resources/liveResourceState.ts <<'EOF'
export interface LiveResourceState<T = unknown> {
  key: string
  domain: string
  data?: T
  version: number
  stale: boolean
  refreshing: boolean
  degraded: boolean
  updatedAt?: string
  error?: string
}
EOF

cat > src/application/live/resources/liveResourceStore.ts <<'EOF'
import type { LiveResourceState } from "./liveResourceState"

export interface LiveResourceStore {
  get<T>(
    key: string,
  ): LiveResourceState<T> | undefined

  set<T>(
    key: string,
    value: LiveResourceState<T>,
  ): void

  patch(
    key: string,
    value: Partial<LiveResourceState>,
  ): void

  list(): LiveResourceState[]
}

export function createLiveResourceStore():
  LiveResourceStore {
  const values =
    new Map<string, LiveResourceState>()

  return {
    get(key) {
      return values.get(key)
    },

    set(key, value) {
      values.set(key, value)
    },

    patch(key, patch) {
      const current = values.get(key)

      if (!current) {
        return
      }

      values.set(key, {
        ...current,
        ...patch,
        version:
          current.version + 1,
      })
    },

    list() {
      return [...values.values()]
    },
  }
}
EOF

# ============================================================
# LIVE REDUCTION / PROJECTION
# ============================================================

cat > src/application/live/reducers/liveResourceReducer.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"
import type { LiveResourceState } from "../resources/liveResourceState"

export function reduceLiveResource<T>(
  state: LiveResourceState<T>,
  event: LiveEvent,
): LiveResourceState<T> {
  if (
    event.type ===
    "resource.invalidated"
  ) {
    return {
      ...state,
      stale: true,
      version: state.version + 1,
      updatedAt:
        new Date().toISOString(),
    }
  }

  if (
    event.type ===
    "resource.refreshed"
  ) {
    return {
      ...state,
      stale: false,
      refreshing: false,
      version: state.version + 1,
      updatedAt:
        new Date().toISOString(),
    }
  }

  return state
}
EOF

cat > src/application/live/projections/liveCommandProjection.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"

export interface LiveCommandProjection {
  commandId?: string
  state:
    | "unknown"
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}

export function projectLiveCommand(
  event: LiveEvent,
): LiveCommandProjection {
  const payload =
    event.payload &&
    typeof event.payload === "object"
      ? event.payload as Record<
          string,
          unknown
        >
      : {}

  let state:
    LiveCommandProjection["state"] =
    "unknown"

  if (
    event.type.includes("accepted")
  ) {
    state = "accepted"
  } else if (
    event.type.includes("completed")
  ) {
    state = "completed"
  } else if (
    event.type.includes("failed")
  ) {
    state = "failed"
  } else if (
    event.type.includes("blocked")
  ) {
    state = "blocked"
  }

  return {
    commandId:
      typeof payload.commandId ===
      "string"
        ? payload.commandId
        : undefined,
    state,
    message:
      typeof payload.message ===
      "string"
        ? payload.message
        : undefined,
    updatedAt:
      new Date().toISOString(),
  }
}
EOF

cat > src/application/live/projections/liveStatusProjection.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"

export interface LiveStatusProjection {
  domain: string
  status: string
  healthy: boolean
  degraded: boolean
  updatedAt: string
}

export function projectLiveStatus(
  event: LiveEvent,
): LiveStatusProjection {
  const degraded =
    event.type.includes("degraded") ||
    event.type.includes("failed")

  return {
    domain: event.domain,
    status: event.type,
    healthy: !degraded,
    degraded,
    updatedAt:
      new Date().toISOString(),
  }
}
EOF

# ============================================================
# LIVE TIMELINE / NOTIFICATIONS
# ============================================================

cat > src/application/live/timeline/liveTimelineEntry.ts <<'EOF'
export interface LiveTimelineEntry {
  id: string
  domain: string
  type: string
  title: string
  occurredAt: string
  severity:
    | "info"
    | "warning"
    | "critical"
  correlationId?: string
}
EOF

cat > src/application/live/timeline/liveTimelineStore.ts <<'EOF'
import type { LiveTimelineEntry } from "./liveTimelineEntry"

export interface LiveTimelineStore {
  append(value: LiveTimelineEntry): void
  list(domain?: string): LiveTimelineEntry[]
}

export function createLiveTimelineStore():
  LiveTimelineStore {
  const values: LiveTimelineEntry[] = []

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

cat > src/application/live/notifications/liveNotification.ts <<'EOF'
export interface LiveNotification {
  id: string
  level:
    | "info"
    | "success"
    | "warning"
    | "error"
  domain: string
  title: string
  message: string
  read: boolean
  createdAt: string
}
EOF

cat > src/application/live/notifications/liveNotificationStore.ts <<'EOF'
import type { LiveNotification } from "./liveNotification"

export interface LiveNotificationStore {
  push(value: LiveNotification): void
  markRead(id: string): void
  list(unreadOnly?: boolean): LiveNotification[]
}

export function createLiveNotificationStore():
  LiveNotificationStore {
  const values: LiveNotification[] = []

  return {
    push(value) {
      values.unshift(value)
    },

    markRead(id) {
      const value = values.find(
        (item) => item.id === id,
      )

      if (value) {
        value.read = true
      }
    },

    list(unreadOnly) {
      return unreadOnly
        ? values.filter(
            (item) => !item.read,
          )
        : [...values]
    },
  }
}
EOF

cat > src/application/live/notifications/liveNotificationFactory.ts <<'EOF'
import type { LiveNotification } from "./liveNotification"

export function createLiveNotification(
  domain: string,
  level: LiveNotification["level"],
  title: string,
  message: string,
): LiveNotification {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    level,
    domain,
    title,
    message,
    read: false,
    createdAt:
      new Date().toISOString(),
  }
}
EOF

# ============================================================
# SYNCHRONIZATION
# ============================================================

cat > src/application/live/synchronization/liveSyncRecord.ts <<'EOF'
export interface LiveSyncRecord {
  key: string
  domain: string
  state:
    | "idle"
    | "queued"
    | "syncing"
    | "synced"
    | "stale"
    | "conflict"
    | "failed"
  version: number
  updatedAt: string
}
EOF

cat > src/application/live/synchronization/liveSyncManager.ts <<'EOF'
import type { LiveSyncRecord } from "./liveSyncRecord"

export interface LiveSyncManager {
  get(
    key: string,
  ): LiveSyncRecord | undefined

  set(value: LiveSyncRecord): void

  markStale(key: string): void
  markSynced(key: string): void

  list(domain?: string): LiveSyncRecord[]
}

export function createLiveSyncManager():
  LiveSyncManager {
  const values =
    new Map<string, LiveSyncRecord>()

  return {
    get(key) {
      return values.get(key)
    },

    set(value) {
      values.set(value.key, value)
    },

    markStale(key) {
      const current = values.get(key)

      if (current) {
        values.set(key, {
          ...current,
          state: "stale",
          version:
            current.version + 1,
          updatedAt:
            new Date().toISOString(),
        })
      }
    },

    markSynced(key) {
      const current = values.get(key)

      if (current) {
        values.set(key, {
          ...current,
          state: "synced",
          version:
            current.version + 1,
          updatedAt:
            new Date().toISOString(),
        })
      }
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
# DOMAIN LIVE GENERATOR
# ============================================================

make_live_domain() {
  local domain="$1"
  local singular="$2"
  local label="$3"
  local enabled="$4"

  cat > "src/features/$domain/live/${singular}LiveState.ts" <<EOF
export interface ${singular^}LiveState {
  domain: "${domain}"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initial${singular^}LiveState:
  ${singular^}LiveState = {
  domain: "${domain}",
  connected: ${enabled},
  stale: false,
  degraded: ${enabled} ? false : true,
}
EOF

  cat > "src/features/$domain/live/events/${singular}LiveEvent.ts" <<EOF
export interface ${singular^}LiveEvent<T = unknown> {
  id: string
  domain: "${domain}"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
EOF

  cat > "src/features/$domain/live/subscriptions/${singular}Subscription.ts" <<EOF
export interface ${singular^}Subscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function create${singular^}Subscription():
  ${singular^}Subscription {
  let active = true

  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()),

    get active() {
      return active
    },

    unsubscribe() {
      active = false
    },
  }
}
EOF

  cat > "src/features/$domain/live/handlers/${singular}LiveHandler.ts" <<EOF
import type { ${singular^}LiveEvent } from "../events/${singular}LiveEvent"

export interface ${singular^}LiveHandler {
  handle(
    event: ${singular^}LiveEvent,
  ): void
}

export function create${singular^}LiveHandler(
  handle: (
    event: ${singular^}LiveEvent,
  ) => void,
): ${singular^}LiveHandler {
  return {
    handle,
  }
}
EOF

  cat > "src/features/$domain/live/reducers/${singular}LiveReducer.ts" <<EOF
import type { ${singular^}LiveState } from "../${singular}LiveState"
import type { ${singular^}LiveEvent } from "../events/${singular}LiveEvent"

export function reduce${singular^}Live(
  state: ${singular^}LiveState,
  event: ${singular^}LiveEvent,
): ${singular^}LiveState {
  if (event.type.includes("updated")) {
    return {
      ...state,
      stale: false,
      degraded: false,
      updatedAt: event.occurredAt,
    }
  }

  if (
    event.type.includes("degraded") ||
    event.type.includes("failed")
  ) {
    return {
      ...state,
      degraded: true,
      updatedAt: event.occurredAt,
    }
  }

  return state
}
EOF

  cat > "src/features/$domain/live/projections/${singular}LiveProjection.ts" <<EOF
export interface ${singular^}LiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function project${singular^}Live(
  id: string,
  status: string,
  stale = false,
): ${singular^}LiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/live/invalidation/${singular}LiveInvalidation.ts" <<EOF
export interface ${singular^}LiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function create${singular^}LiveInvalidation(
  key: string,
  reason: string,
): ${singular^}LiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/live/refresh/${singular}LiveRefresh.ts" <<EOF
export interface ${singular^}LiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initial${singular^}LiveRefresh:
  ${singular^}LiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
EOF

  cat > "src/features/$domain/live/notifications/${singular}LiveNotification.ts" <<EOF
export interface ${singular^}LiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function create${singular^}LiveNotification(
  level: ${singular^}LiveNotification["level"],
  title: string,
  message: string,
): ${singular^}LiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/live/status/${singular}LiveStatus.ts" <<EOF
export interface ${singular^}LiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function ${singular}LiveStatus(
  degraded = false,
): ${singular^}LiveStatus {
  return {
    status:
      !${enabled}
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
EOF

  cat > "src/features/$domain/live/timeline/${singular}LiveTimeline.ts" <<EOF
export interface ${singular^}LiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function append${singular^}LiveTimeline(
  current: ${singular^}LiveTimeline[],
  item: ${singular^}LiveTimeline,
): ${singular^}LiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
EOF

  cat > "src/features/$domain/live/synchronization/${singular}LiveSync.ts" <<EOF
export interface ${singular^}LiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initial${singular^}LiveSync:
  ${singular^}LiveSync = {
  key: "${domain}:live",
  state: ${enabled} ? "synced" : "failed",
  version: 0,
}
EOF

  cat > "src/features/$domain/live/runtime/${singular}LiveRuntime.ts" <<EOF
export interface ${singular^}LiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const ${singular}LiveRuntime:
  ${singular^}LiveRuntime = {
  enabled: ${enabled},
  subscribed: false,
  eventCount: 0,
}
EOF
}

make_live_domain dashboard dashboard Dashboard true
make_live_domain properties property Properties true
make_live_domain leases lease Leases true
make_live_domain payments payment Payments true
make_live_domain devices device Devices true
make_live_domain locks lock Locks false
make_live_domain security security Security false

# ============================================================
# DEVICE LIVE STATUS PATH
# ============================================================

cat > src/features/devices/live/status/deviceConnectionState.ts <<'EOF'
export interface DeviceConnectionState {
  deviceId: string
  connected: boolean
  lastSeenAt?: string
}

export function updateDeviceConnection(
  current: DeviceConnectionState,
  connected: boolean,
  occurredAt: string,
): DeviceConnectionState {
  return {
    ...current,
    connected,
    lastSeenAt: occurredAt,
  }
}
EOF

cat > src/features/devices/live/events/deviceConnectedEvent.ts <<'EOF'
export interface DeviceConnectedEvent {
  deviceId: string
  occurredAt: string
}
EOF

cat > src/features/devices/live/events/deviceDisconnectedEvent.ts <<'EOF'
export interface DeviceDisconnectedEvent {
  deviceId: string
  occurredAt: string
}
EOF

cat > src/features/devices/live/projections/deviceStatusProjection.ts <<'EOF'
export interface DeviceStatusProjection {
  deviceId: string
  status: "online" | "offline"
  lastSeenAt?: string
}

export function projectDeviceStatus(
  deviceId: string,
  connected: boolean,
  occurredAt: string,
): DeviceStatusProjection {
  return {
    deviceId,
    status:
      connected
        ? "online"
        : "offline",
    lastSeenAt: occurredAt,
  }
}
EOF

# ============================================================
# DASHBOARD LIVE PROJECTIONS
# ============================================================

cat > src/features/dashboard/live/projections/dashboardLiveProjection.ts <<'EOF'
export interface DashboardLiveProjection {
  healthyServices: number
  degradedServices: number
  criticalEvents: number
  recentEvents: number
  updatedAt: string
}

export const initialDashboardLiveProjection:
  DashboardLiveProjection = {
  healthyServices: 0,
  degradedServices: 0,
  criticalEvents: 0,
  recentEvents: 0,
  updatedAt:
    new Date().toISOString(),
}
EOF

cat > src/features/dashboard/live/reducers/dashboardLiveReducer.ts <<'EOF'
import type {
  DashboardLiveProjection,
} from "./projections/dashboardLiveProjection"

export function reduceDashboardLive(
  state: DashboardLiveProjection,
  event: {
    type: string
  },
): DashboardLiveProjection {
  return {
    ...state,
    degradedServices:
      event.type.includes("degraded")
        ? state.degradedServices + 1
        : state.degradedServices,
    criticalEvents:
      event.type.includes("critical")
        ? state.criticalEvents + 1
        : state.criticalEvents,
    recentEvents:
      state.recentEvents + 1,
    updatedAt:
      new Date().toISOString(),
  }
}
EOF

# ============================================================
# COMMAND OUTCOME EVENT HANDLERS
# ============================================================

cat > src/application/live/events/commandOutcomeEvent.ts <<'EOF'
export interface CommandOutcomeEvent {
  commandId: string
  domain: string
  state:
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  occurredAt: string
}
EOF

cat > src/application/live/handlers/commandOutcomeHandler.ts <<'EOF'
import type {
  CommandOutcomeEvent,
} from "../events/commandOutcomeEvent"

export interface CommandOutcomeHandler {
  handle(
    event: CommandOutcomeEvent,
  ): void
}

export function createCommandOutcomeHandler(
  handle: (
    event: CommandOutcomeEvent,
  ) => void,
): CommandOutcomeHandler {
  return {
    handle,
  }
}
EOF

cat > src/application/live/handlers/statusPropagationHandler.ts <<'EOF'
import type { LiveEvent } from "../events/liveEvent"

export interface StatusPropagationHandler {
  handle(event: LiveEvent): void
}

export function createStatusPropagationHandler(
  handle: (event: LiveEvent) => void,
): StatusPropagationHandler {
  return {
    handle,
  }
}
EOF

# ============================================================
# CROSS-DOMAIN REFRESH BRIDGES
# ============================================================

cat > src/application/live/refresh/leasePaymentRefreshBridge.ts <<'EOF'
export interface LeasePaymentRefreshBridge {
  paymentChanged(leaseId?: string): string[]
}

export const leasePaymentRefreshBridge:
  LeasePaymentRefreshBridge = {
  paymentChanged(leaseId) {
    return leaseId
      ? [
          `lease:${leaseId}`,
          `payment:${leaseId}`,
        ]
      : ["lease:list", "payment:list"]
  },
}
EOF

cat > src/application/live/refresh/propertyLeaseRefreshBridge.ts <<'EOF'
export interface PropertyLeaseRefreshBridge {
  leaseChanged(propertyId?: string): string[]
}

export const propertyLeaseRefreshBridge:
  PropertyLeaseRefreshBridge = {
  leaseChanged(propertyId) {
    return propertyId
      ? [`property:${propertyId}`]
      : ["property:list"]
  },
}
EOF

cat > src/application/live/refresh/leaseDeviceRefreshBridge.ts <<'EOF'
export interface LeaseDeviceRefreshBridge {
  deviceChanged(leaseId?: string): string[]
}

export const leaseDeviceRefreshBridge:
  LeaseDeviceRefreshBridge = {
  deviceChanged(leaseId) {
    return leaseId
      ? [`lease:${leaseId}`]
      : ["lease:list"]
  },
}
EOF

# ============================================================
# RUNTIME LIVE REGISTRY
# ============================================================

cat > src/runtime/live/events/runtimeLiveEventRegistry.ts <<'EOF'
import { liveEventTypes } from "../../application/live/events/liveEventTypes"

export const runtimeLiveEventRegistry = [
  liveEventTypes.resourceUpdated,
  liveEventTypes.resourceInvalidated,
  liveEventTypes.resourceRefreshed,
  liveEventTypes.commandAccepted,
  liveEventTypes.commandCompleted,
  liveEventTypes.commandFailed,
  liveEventTypes.commandBlocked,
  liveEventTypes.entityStatusChanged,
  liveEventTypes.timelineAppended,
  liveEventTypes.notificationCreated,
]
EOF

cat > src/runtime/live/subscriptions/runtimeLiveSubscriptionState.ts <<'EOF'
export interface RuntimeLiveSubscriptionState {
  connected: boolean
  subscriptions: number
  eventsReceived: number
  lastEventAt?: string
}

export const initialRuntimeLiveSubscriptionState:
  RuntimeLiveSubscriptionState = {
  connected: false,
  subscriptions: 0,
  eventsReceived: 0,
}
EOF

cat > src/runtime/live/refresh/runtimeLiveRefreshState.ts <<'EOF'
export interface RuntimeLiveRefreshState {
  queued: number
  running: number
  completed: number
  failed: number
}

export const initialRuntimeLiveRefreshState:
  RuntimeLiveRefreshState = {
  queued: 0,
  running: 0,
  completed: 0,
  failed: 0,
}
EOF

cat > src/runtime/live/resources/runtimeLiveResourceState.ts <<'EOF'
export interface RuntimeLiveResourceState {
  total: number
  stale: number
  refreshing: number
  degraded: number
  healthy: number
}

export const initialRuntimeLiveResourceState:
  RuntimeLiveResourceState = {
  total: 0,
  stale: 0,
  refreshing: 0,
  degraded: 0,
  healthy: 0,
}
EOF

cat > src/runtime/live/dashboard/runtimeDashboardLiveState.ts <<'EOF'
export interface RuntimeDashboardLiveState {
  servicesHealthy: number
  servicesDegraded: number
  criticalEvents: number
  commandFailures: number
  updatedAt?: string
}

export const initialRuntimeDashboardLiveState:
  RuntimeDashboardLiveState = {
  servicesHealthy: 0,
  servicesDegraded: 0,
  criticalEvents: 0,
  commandFailures: 0,
}
EOF

cat > src/runtime/live/devices/runtimeDeviceLiveState.ts <<'EOF'
export interface RuntimeDeviceLiveState {
  online: number
  offline: number
  commandFailures: number
  lastEventAt?: string
}

export const initialRuntimeDeviceLiveState:
  RuntimeDeviceLiveState = {
  online: 0,
  offline: 0,
  commandFailures: 0,
}
EOF

# ============================================================
# SHARED LIVE UI
# ============================================================

cat > src/components/runtime/LiveIndicator.tsx <<'EOF'
export function LiveIndicator({
  connected,
}: {
  connected: boolean
}) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
      <span
        className={[
          "h-2 w-2 rounded-full",
          connected
            ? "bg-kiri-green-400"
            : "bg-kiri-amber-400",
        ].join(" ")}
      />
      <span className="text-kiri-text-muted">
        {connected ? "Live" : "Degraded"}
      </span>
    </div>
  )
}
EOF

cat > src/components/runtime/LiveEventBadge.tsx <<'EOF'
export function LiveEventBadge({
  type,
}: {
  type: string
}) {
  return (
    <span className="rounded-full border border-kiri-blue-500/20 bg-kiri-blue-500/5 px-2 py-1 text-[10px] font-semibold text-kiri-blue-300">
      {type}
    </span>
  )
}
EOF

cat > src/components/runtime/LiveRefreshState.tsx <<'EOF'
export function LiveRefreshState({
  refreshing,
}: {
  refreshing: boolean
}) {
  return (
    <span className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
      {refreshing ? "Refreshing" : "Current"}
    </span>
  )
}
EOF

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10P COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10P LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Live event core" \
  "$(find src/application/live/events src/application/live/subscriptions src/application/live/router -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Live resources" \
  "$(find src/application/live/resources -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Live invalidation/refresh" \
  "$(find src/application/live/invalidation src/application/live/refresh -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Live projections/reducers" \
  "$(find src/application/live/projections src/application/live/reducers -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Live notifications/timeline" \
  "$(find src/application/live/notifications src/application/live/timeline -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Live synchronization" \
  "$(find src/application/live/synchronization -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature live surfaces" \
  "$(find src/features/*/live -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime live state" \
  "$(find src/runtime/live -type f 2>/dev/null | wc -l)"

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
echo "NEXT: PHASE 10Q"
echo "FRONTEND SECURITY / AUTHORIZATION / SESSION CONTROL PLANE"
echo "============================================================"
