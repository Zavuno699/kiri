
import type { AccessDecision } from "./accessDecision";

const decisions: AccessDecision[] = [];

export function appendAccessDecision(
  decision: AccessDecision,
): void {
  decisions.push(decision);
}

export function listAccessDecisions(): AccessDecision[] {
  return [...decisions];
}

