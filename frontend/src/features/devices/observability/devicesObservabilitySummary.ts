import {
  getDevicesObservability,
} from "../../../application/observability/adapters/devicesObservabilityAdapter";

export function getDevicesObservabilitySummary() {
  return getDevicesObservability();
}
