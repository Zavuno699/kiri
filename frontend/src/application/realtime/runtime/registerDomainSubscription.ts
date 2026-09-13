import {
  registerRealtimeSubscription,
} from "../registry/realtimeSubscriptionRegistry";

export function registerDomainRealtimeSubscription(
  domain: string,
  resourceKey: string,
  eventTypes: string[],
): void {
  registerRealtimeSubscription({
    key:
      `${domain}.${resourceKey}`,

    domain,
    resourceKey,
    eventTypes,
    enabled: true,
  });
}
