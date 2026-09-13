import {
  getPaymentsPageState,
} from "../state/paymentsPageState";

export function getPaymentsPageConvergence() {
  const state =
    getPaymentsPageState();

  return {
    domain:
      "payments",

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
