import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerLocksRealtime(): void {
  registerDomainRealtimeSubscription(
    "locks",
    "locks",
    [
      "lock.updated",
    ],
  );
}
