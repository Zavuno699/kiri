import {
  getLocksPageState,
} from "../state/locksPageState";

export function getLocksPageConvergence() {
  const state =
    getLocksPageState();

  return {
    domain:
      "locks",

    runtimeReady:
      state.runtime?.status ===
      "ready",

    hasData:
      state.data?.data !==
      null &&
      state.data?.data !==
      undefined,

    stale:
      state.data?.stale ??
      false,

    error:
      state.runtime?.error ??
      null,
  };
}
