import {
  registerDomainRealtimeSubscription,
} from "../../../application/realtime/runtime/registerDomainSubscription";

export function registerDevicesRealtime(): void {
  registerDomainRealtimeSubscription(
    "devices",
    "devices",
    [
      "device.updated",
    ],
  );
}
