import {
  getRealtimeConnectionState,
} from "../state/realtimeConnectionStore";

import {
  listRealtimeEvents,
} from "../state/realtimeEventStore";

import {
  listRealtimeSubscriptions,
} from "../registry/realtimeSubscriptionRegistry";

import {
  listRealtimeRefreshRules,
} from "../refresh/realtimeRefreshRuleRegistry";

export function getRealtimeDiagnostics() {
  return {
    connection:
      getRealtimeConnectionState(),

    eventCount:
      listRealtimeEvents().length,

    subscriptionCount:
      listRealtimeSubscriptions().length,

    refreshRuleCount:
      listRealtimeRefreshRules().length,

    subscriptions:
      listRealtimeSubscriptions(),

    refreshRules:
      listRealtimeRefreshRules(),

    recentEvents:
      listRealtimeEvents().slice(-25),
  };
}
