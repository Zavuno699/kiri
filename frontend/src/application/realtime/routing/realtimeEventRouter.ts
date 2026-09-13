import type {
  RealtimeEvent,
} from "../contracts/realtimeEvent";

import {
  recordRealtimeEvent,
} from "../state/realtimeEventStore";

import {
  findRealtimeRefreshRules,
} from "../refresh/realtimeRefreshRuleRegistry";

import {
  invalidatePersistence,
} from "../../persistence/cache/invalidatePersistence";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

import {
  projectRealtimeEvent,
} from "../runtime/projectRealtimeEvent";

import {
  bridgeRealtimeEvent,
} from "../../globalState/runtime/bridgeRealtimeEvent";


export function routeRealtimeEvent(
  event: RealtimeEvent,
): string[] {
  recordRealtimeEvent(event);
  projectRealtimeEvent(event);
  void bridgeRealtimeEvent(event);

  const rules =
    findRealtimeRefreshRules(
      event.eventType,
    );

  const actions: string[] = [];

  for (const rule of rules) {
    const persistenceKey =
      `${rule.domain}:${rule.resourceKey}`;

    if (
      rule.invalidatePersistence
    ) {
      invalidatePersistence(
        persistenceKey,
      );

      actions.push(
        `invalidate:${persistenceKey}`,
      );
    }

    if (
      rule.refreshProjection
    ) {
      markResourceStale(
        rule.resourceKey,
      );

      actions.push(
        `stale:${rule.resourceKey}`,
      );
    }
  }

  return actions;
}
