import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerDashboardRealtime(): void {
  registerDomainRealtimeSubscription(
    "dashboard",
    "dashboard",
    [
      "dashboard.updated",
    ],
  );
}
