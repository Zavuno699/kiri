import {
  listPoliciesByDomain,
} from "../registry/policyRegistry";

export function selectPolicies(
  domain?: string,
) {
  if (!domain) {
    return [
      ...listPoliciesByDomain(
        "global",
      ),
    ];
  }

  return [
    ...listPoliciesByDomain(
      "global",
    ),
    ...listPoliciesByDomain(
      domain,
    ),
  ];
}
