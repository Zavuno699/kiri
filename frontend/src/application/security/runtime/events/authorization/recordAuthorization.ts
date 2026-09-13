import { appendRuntimeSecurityEvent } from "../runtimeSecurityEventStore";

export function recordAuthorizationOutcome(
  principal: string | null,
  capability: string,
  allowed: boolean,
  reason: string,
): void {
  appendRuntimeSecurityEvent({
    type: allowed
      ? "authorization.allowed"
      : "authorization.denied",
    occurredAt: new Date().toISOString(),
    principal,
    capability,
    reason,
  });
}
