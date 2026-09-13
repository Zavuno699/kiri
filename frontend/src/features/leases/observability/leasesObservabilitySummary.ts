import {
  getLeasesObservability,
} from "../../../application/observability/adapters/leasesObservabilityAdapter";

export function getLeasesObservabilitySummary() {
  return getLeasesObservability();
}
