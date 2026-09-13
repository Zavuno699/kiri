import type { LeaseProjection } from "./leaseProjection";

export function reconcileLeaseProjection(
  current: LeaseProjection | undefined,
  incoming: LeaseProjection,
): LeaseProjection {
  if (!current || incoming.version >= current.version) {
    return incoming;
  }

  return current;
}
