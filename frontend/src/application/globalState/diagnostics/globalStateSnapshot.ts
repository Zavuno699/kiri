import {
  getGlobalState,
} from "../state/globalStateStore";

export function getGlobalStateSnapshot() {
  const state =
    getGlobalState();

  return {
    initialized:
      state.initialized,

    operational:
      state.operational,

    degraded:
      state.degraded,

    activeDomain:
      state.activeDomain,

    activeRoute:
      state.activeRoute,

    selectedResourceId:
      state.selectedResourceId,

    incidentCount:
      state.incidentCount,

    recoveryCount:
      state.recoveryCount,

    version:
      state.version,

    updatedAt:
      state.updatedAt,
  };
}
