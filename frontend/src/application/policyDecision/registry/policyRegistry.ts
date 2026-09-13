import type {
  PolicyDefinition,
} from "../contracts/policyDefinition";

const policies = new Map<
  string,
  PolicyDefinition
>();

export function registerPolicy(
  policy: PolicyDefinition,
): void {
  policies.set(
    policy.id,
    policy,
  );
}

export function getPolicy(
  policyId: string,
): PolicyDefinition | null {
  return (
    policies.get(
      policyId,
    ) ??
    null
  );
}

export function listPolicies(): PolicyDefinition[] {
  return [
    ...policies.values(),
  ];
}

export function listPoliciesByDomain(
  domain: string,
): PolicyDefinition[] {
  return listPolicies()
    .filter(
      (policy) =>
        policy.domain ===
        domain,
    )
    .sort(
      (a, b) =>
        b.priority -
        a.priority,
    );
}
