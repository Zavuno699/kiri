import {
  dashboardConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshDashboardConsistency() {
  return dashboardConsistencyCheck();
}
