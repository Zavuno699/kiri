import {
  getPaymentsObservability,
} from "../../../application/observability/adapters/paymentsObservabilityAdapter";

export function getPaymentsObservabilitySummary() {
  return getPaymentsObservability();
}
