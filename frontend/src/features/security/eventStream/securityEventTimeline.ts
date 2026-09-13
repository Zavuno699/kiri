import {
  getSecurityEventTimeline,
} from "../../../application/eventStream/adapters/securityEventAdapter";

export function selectSecurityEventTimeline() {
  return getSecurityEventTimeline();
}
