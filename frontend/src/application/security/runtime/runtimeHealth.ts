import type { SecurityRuntimeContract } from "./runtimeContract";

export interface SecurityRuntimeHealth {
  ready: boolean;
  degraded: boolean;
  reasons: string[];
}

export function evaluateSecurityRuntimeHealth(
  state: SecurityRuntimeContract,
): SecurityRuntimeHealth {
  const reasons: string[] = [];

  if (!state.initialized) reasons.push("runtime-not-initialized");
  if (!state.authenticated) reasons.push("authentication-unavailable");
  if (!state.sessionActive) reasons.push("session-inactive");
  if (!state.authorizationReady) reasons.push("authorization-unavailable");
  if (!state.policyReady) reasons.push("policy-unavailable");
  if (state.frozen) reasons.push("operations-frozen");

  return {
    ready: reasons.length === 0,
    degraded: reasons.length > 0,
    reasons,
  };
}
