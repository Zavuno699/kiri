import {
  getDashboardPageState,
} from "../state/dashboardPageState";

export function getDashboardPageConvergence() {
  const state =
    getDashboardPageState();

  return {
    domain:
      "dashboard",

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
