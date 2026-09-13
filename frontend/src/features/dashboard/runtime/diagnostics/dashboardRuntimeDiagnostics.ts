import {
  getDashboardRuntimeState,
} from "../state/dashboardRuntimeState";

export function getDashboardRuntimeDiagnostics() {
  return {
    domain:
      "dashboard",

    runtime:
      getDashboardRuntimeState(),
  };
}
