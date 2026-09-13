import {
  getDashboardEntityFabric,
} from "../dashboardEntityFabric";

export function getDashboardDataFabricDiagnostics() {
  return {
    domain:
      "dashboard",
    state:
      getDashboardEntityFabric(),
  };
}
