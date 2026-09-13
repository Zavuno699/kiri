import type { SecurityProjection } from "./securityProjection";

export function reconcileSecurityProjection(
  current: SecurityProjection | undefined,
  incoming: SecurityProjection,
): SecurityProjection {
  if (!current) return incoming;

  return {
    ...incoming,
    emergencyFreezeActive:
      current.emergencyFreezeActive || incoming.emergencyFreezeActive,
    incidentCount: Math.max(
      current.incidentCount,
      incoming.incidentCount,
    ),
    credentialRevocations: Math.max(
      current.credentialRevocations,
      incoming.credentialRevocations,
    ),
    version: Math.max(current.version, incoming.version),
  };
}
