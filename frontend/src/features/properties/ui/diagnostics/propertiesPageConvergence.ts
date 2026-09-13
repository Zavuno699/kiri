import {
  getPropertiesPageState,
} from "../state/propertiesPageState";

export function getPropertiesPageConvergence() {
  const state =
    getPropertiesPageState();

  return {
    domain:
      "properties",

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
