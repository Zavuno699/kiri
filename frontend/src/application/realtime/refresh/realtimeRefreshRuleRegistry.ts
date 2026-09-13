import type {
  RealtimeRefreshRule,
} from "../contracts/realtimeRefreshRule";

const rules = new Map<
  string,
  RealtimeRefreshRule
>();

export function registerRealtimeRefreshRule(
  rule: RealtimeRefreshRule,
): void {
  rules.set(
    rule.key,
    rule,
  );
}

export function listRealtimeRefreshRules(): RealtimeRefreshRule[] {
  return [...rules.values()];
}

export function findRealtimeRefreshRules(
  eventType: string,
): RealtimeRefreshRule[] {
  return listRealtimeRefreshRules().filter(
    (rule) =>
      rule.eventTypes.includes(
        eventType,
      ),
  );
}
