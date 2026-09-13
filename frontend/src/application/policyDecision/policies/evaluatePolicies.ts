import {
  listPoliciesByDomain,
} from "../registry/policyRegistry";

export interface PolicyEvaluation {
  status:
    | "pass"
    | "fail"
    | "unknown";
  policyIds: string[];
  reasons: string[];
}

export function evaluatePolicies(
  domain: string,
  action: string,
): PolicyEvaluation {
  const policies = [
    ...listPoliciesByDomain(
      "global",
    ),
    ...listPoliciesByDomain(
      domain,
    ),
  ].filter(
    (policy) =>
      policy.enabled,
  );

  const reasons: string[] = [];

  const failed =
    policies.some(
      (policy) =>
        policy.effect ===
          "deny" &&
        (
          domain ===
            "security" ||
          policy.domain ===
            "global"
        ),
    );

  if (failed) {
    reasons.push(
      "An active deny policy applies.",
    );
  }

  if (
    action.includes(
      "freeze",
    ) &&
    domain ===
      "security"
  ) {
    reasons.push(
      "Security freeze actions require elevated policy evaluation.",
    );
  }

  return {
    status:
      failed
        ? "fail"
        : "pass",
    policyIds:
      policies.map(
        (policy) =>
          policy.id,
      ),
    reasons,
  };
}
