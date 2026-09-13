import {
  getPropertiesObservability,
} from "../../../application/observability/adapters/propertiesObservabilityAdapter";

export function getPropertiesObservabilitySummary() {
  return getPropertiesObservability();
}
