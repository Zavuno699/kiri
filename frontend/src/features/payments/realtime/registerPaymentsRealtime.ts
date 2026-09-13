import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerPaymentsRealtime(): void {
  registerDomainRealtimeSubscription(
    "payments",
    "payments",
    [
      "payment.updated",
    ],
  );
}
