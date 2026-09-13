import type {
  SecurityPolicy,
} from "../contracts/securityPolicy";

const policies = new Map<
  string,
  SecurityPolicy
>();

export function registerSecurityPolicy(
  policy: SecurityPolicy,
): void {
  policies.set(
    policy.key,
    policy,
  );
}

export function getSecurityPolicy(
  key: string,
): SecurityPolicy | null {
  return (
    policies.get(key) ??
    null
  );
}

export function listSecurityPolicies(): SecurityPolicy[] {
  return [
    ...policies.values(),
  ];
}
