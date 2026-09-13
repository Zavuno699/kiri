
import type { PolicyContext } from "./policyContext";
import type { PolicyDecision } from "./policyDecision";

export type Policy = (context: PolicyContext) => PolicyDecision;

const policies = new Map<string, Policy>();

export function registerPolicy(key: string, policy: Policy): void {
  policies.set(key, policy);
}

export function getPolicy(key: string): Policy | null {
  return policies.get(key) ?? null;
}

