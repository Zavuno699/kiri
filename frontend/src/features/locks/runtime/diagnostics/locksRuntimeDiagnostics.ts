import {
  getLocksRuntimeState,
} from "../state/locksRuntimeState";

export function getLocksRuntimeDiagnostics() {
  return {
    domain:
      "locks",

    runtime:
      getLocksRuntimeState(),
  };
}
