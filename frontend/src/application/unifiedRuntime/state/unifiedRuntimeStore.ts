import type {
  UnifiedRuntimeState,
} from "./unifiedRuntimeState";

let state: UnifiedRuntimeState = {
  initialized: false,
  status: "unknown",
  authenticationReady: false,
  securityReady: false,
  rbacReady: false,
  navigationReady: false,
  actionPlaneReady: false,
  consistencyReady: false,
  healthReady: false,
  orchestrationReady: false,
  degradedMode: "critical",
  consistencyScore: 0,
  domainHealthScore: 0,
  operatorReady: false,
  startedAt: null,
  lastRefreshAt: null,
  reasons: [],
};

export function getUnifiedRuntimeState(): UnifiedRuntimeState {
  return state;
}

export function setUnifiedRuntimeState(
  next: UnifiedRuntimeState,
): void {
  state = next;
}
