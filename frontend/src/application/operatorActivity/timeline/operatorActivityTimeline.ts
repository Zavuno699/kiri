import type { OperatorActivityItem } from "../activity/operatorActivityItem";

export interface OperatorActivityTimeline {
  items: OperatorActivityItem[];
  latestAt: string | null;
}

export function buildOperatorActivityTimeline(
  items: OperatorActivityItem[],
): OperatorActivityTimeline {
  return {
    items,
    latestAt: items[0]?.occurredAt ?? null,
  };
}
