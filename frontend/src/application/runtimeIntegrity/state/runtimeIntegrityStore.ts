import type { RuntimeIntegrityState } from "./runtimeIntegrityState";

let state: RuntimeIntegrityState = {
  runtimeReady: false,
  cacheConsistent: true,
  recoveryActive: false,
  reconciliationHealthy: true,
  degraded: false,
  reasons: [],
};

export function getRuntimeIntegrityState(): RuntimeIntegrityState {
  return state;
}

export function setRuntimeIntegrityState(
  next: RuntimeIntegrityState,
): void {
  state = next;
}
