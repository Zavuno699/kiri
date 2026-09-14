import {
  getSecurityPageState,
} from "../state/securityPageState";

export function getSecurityPageConvergence() {
  const state =
    getSecurityPageState();

  return {
    domain:
      "security",

    runtimeReady:
      state.runtime?.ready ??
      false,

    hasData:
      state.data?.data !==
      null &&
      state.data?.data !==
      undefined,

    stale:
      state.runtime?.stale ??
      false,

    error:
      state.runtime?.error ??
      null,
  };
}
