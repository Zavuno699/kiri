import type {
  RealtimeSubscription,
} from "../contracts/realtimeSubscription";

const subscriptions = new Map<
  string,
  RealtimeSubscription
>();

export function registerRealtimeSubscription(
  subscription: RealtimeSubscription,
): void {
  subscriptions.set(
    subscription.key,
    subscription,
  );
}

export function getRealtimeSubscription(
  key: string,
): RealtimeSubscription | null {
  return (
    subscriptions.get(key) ??
    null
  );
}

export function listRealtimeSubscriptions(): RealtimeSubscription[] {
  return [
    ...subscriptions.values(),
  ];
}
