import {
  getLeasesPageState,
} from "../state/leasesPageState";

export function getLeasesPageConvergence() {
  const state =
    getLeasesPageState();

  return {
    domain:
      "leases",

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
