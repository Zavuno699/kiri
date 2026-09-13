import type {
  GlobalOperatorControlState,
} from "./globalOperatorControlState";

let state: GlobalOperatorControlState = {
  initialized: false,
  authenticated: false,
  sessionActive: false,
  rbacReady: false,
  navigationReady: false,
  actionPlaneReady: false,
  securityReady: false,
  consistencyReady: false,
  degradedMode: "critical",
  domainHealthScore: 0,
  consistencyScore: 0,
  operatorReady: false,
  reasons: [],
};

export function getGlobalOperatorControlState(): GlobalOperatorControlState {
  return state;
}

export function setGlobalOperatorControlState(
  next: GlobalOperatorControlState,
): void {
  state = next;
}
