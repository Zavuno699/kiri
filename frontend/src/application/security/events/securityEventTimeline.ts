
import type { SecurityEvent } from "./securityEvent";

export interface SecurityEventTimeline {
  items: SecurityEvent[];
}

export function buildSecurityTimeline(
  events: SecurityEvent[],
): SecurityEventTimeline {
  return {
    items: [...events].sort(
      (left, right) =>
        Date.parse(right.occurredAt) - Date.parse(left.occurredAt),
    ),
  };
}

