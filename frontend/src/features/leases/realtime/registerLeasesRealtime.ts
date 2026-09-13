import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerLeasesRealtime(): void {
  registerDomainRealtimeSubscription(
    "leases",
    "leases",
    [
      "lease.updated",
    ],
  );
}
