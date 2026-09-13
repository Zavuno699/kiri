
import type { AccessDecision } from "./accessDecision";

export function createAccessDecision(
  input: Omit<AccessDecision, "id" | "occurredAt">,
): AccessDecision {
  return {
    ...input,
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
  };
}

