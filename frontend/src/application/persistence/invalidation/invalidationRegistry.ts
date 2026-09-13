import type {
  InvalidationRule,
} from "../contracts/invalidationRule";

const rules = new Map<
  string,
  InvalidationRule
>();

export function registerInvalidationRule(
  rule: InvalidationRule,
): void {
  rules.set(
    rule.key,
    rule,
  );
}

export function listInvalidationRules(): InvalidationRule[] {
  return [...rules.values()];
}

export function findInvalidationTargets(
  sourceDomain: string,
  sourceResource: string,
): InvalidationRule[] {
  return listInvalidationRules().filter(
    (rule) =>
      rule.sourceDomain === sourceDomain &&
      rule.sourceResource === sourceResource,
  );
}
