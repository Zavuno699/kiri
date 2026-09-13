import {
  getSecurityObservability,
} from "../../../application/observability/adapters/securityObservabilityAdapter";

export function getSecurityObservabilitySummary() {
  return getSecurityObservability();
}
