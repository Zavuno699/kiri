import {
  getDevicesPageState,
} from "../state/devicesPageState";

export function getDevicesPageConvergence() {
  const state =
    getDevicesPageState();

  return {
    domain:
      "devices",

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
