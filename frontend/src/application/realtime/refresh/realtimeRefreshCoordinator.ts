import {
  coordinateRefresh,
} from "../../persistence/runtime/coordinateRefresh";

import {
  getRealtimeRefreshRules,
} from "./realtimeRefreshTargets";

export async function refreshFromRealtimeEvent(
  eventType: string,
): Promise<string[]> {
  const targets =
    getRealtimeRefreshRules(
      eventType,
    );

  const refreshed: string[] = [];

  for (const target of targets) {
    try {
      await coordinateRefresh(
        target.domain,
        target.resourceKey,
        {
          type:
            target.queryType,
        },
      );

      refreshed.push(
        `${target.domain}:${target.resourceKey}`,
      );
    } catch {
      // Runtime refresh failures are surfaced through
      // persistence/query diagnostics; continue other targets.
    }
  }

  return refreshed;
}
