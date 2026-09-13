import type { LockProjection } from "./lockProjection";

export function reconcileLockProjection(
  current: LockProjection | undefined,
  incoming: LockProjection,
): LockProjection {
  if (!current) return incoming;

  if (incoming.version < current.version) {
    return current;
  }

  if (
    incoming.state === "frozen" &&
    current.state !== "frozen"
  ) {
    return incoming;
  }

  return incoming;
}
