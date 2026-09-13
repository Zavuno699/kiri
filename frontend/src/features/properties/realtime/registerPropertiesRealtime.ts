import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerPropertiesRealtime(): void {
  registerDomainRealtimeSubscription(
    "properties",
    "properties",
    [
      "property.updated",
    ],
  );
}
