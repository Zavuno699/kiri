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
      state.runtime?.ready ??
      false,

    hasData:
      state.data?.data !==
      null &&
      state.data?.data !==
      undefined,

    stale:
      state.data?.loading ??
      false,

    error:
      state.runtime?.error ??
      null,
  };
}
