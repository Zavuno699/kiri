import {
  getDashboardObservability,
} from "../../../application/observability/adapters/dashboardObservabilityAdapter";

export function getDashboardObservabilitySummary() {
  return getDashboardObservability();
}
