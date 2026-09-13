import type {
  PolicyDecision,
} from "../contracts/policyDecision";

const decisions: PolicyDecision[] = [];

export function appendDecision(
  decision: PolicyDecision,
): void {
  decisions.unshift(
    decision,
  );
}

export function listDecisions(): PolicyDecision[] {
  return [
    ...decisions,
  ];
}

export function getDecision(
  id: string,
): PolicyDecision | null {
  return (
    decisions.find(
      (decision) =>
        decision.id ===
        id,
    ) ??
    null
  );
}

export function listDecisionsByDomain(
  domain: string,
): PolicyDecision[] {
  return decisions.filter(
    (decision) =>
      decision.domain ===
      domain,
  );
}
