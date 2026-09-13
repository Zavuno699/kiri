import type {
  RuntimeControlState,
} from "../contracts/runtimeControlState";

let state: RuntimeControlState = {
  started: false,
  operational: false,
  degraded: false,
  safeMode: false,
  startedAt: null,
  lastTransitionAt: null,
  reasons: [],
};

export function getRuntimeControlState(): RuntimeControlState {
  return state;
}

export function setRuntimeControlState(
  next: RuntimeControlState,
): void {
  state = next;
}
