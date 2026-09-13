import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectIncidentCounts() {
  const state =
    getGlobalState();

  return {
    incidentCount:
      state.incidentCount,
    recoveryCount:
      state.recoveryCount,
  };
}
