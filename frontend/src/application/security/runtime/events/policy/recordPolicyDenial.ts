import { appendRuntimeSecurityEvent } from "../runtimeSecurityEventStore";

export function recordPolicyDenial(
  principal: string | null,
  capability: string,
  reason: string,
): void {
  appendRuntimeSecurityEvent({
    type: "policy.denied",
    occurredAt: new Date().toISOString(),
    principal,
    capability,
    reason,
  });
}
