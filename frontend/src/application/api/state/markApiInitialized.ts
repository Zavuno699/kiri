import {
  setApiRuntimeState,
} from "./apiRuntimeState";

export function markApiInitialized(): void {
  setApiRuntimeState({
    initialized: true,
    reachable: false,
    degraded: false,
    reason: null,
    checkedAt:
      new Date().toISOString(),
  });
}
