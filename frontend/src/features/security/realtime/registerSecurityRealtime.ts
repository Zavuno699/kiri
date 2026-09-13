import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerSecurityRealtime(): void {
  registerDomainRealtimeSubscription(
    "security",
    "security",
    [
      "security.updated",
    ],
  );
}
