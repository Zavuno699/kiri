import {
  getLocksObservability,
} from "../../../application/observability/adapters/locksObservabilityAdapter";

export function getLocksObservabilitySummary() {
  return getLocksObservability();
}
