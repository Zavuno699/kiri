import type { ProjectionVersion } from "../projectionVersion";

export function canAdvanceProjectionVersion(
  current: ProjectionVersion,
  incoming: ProjectionVersion,
): boolean {
  if (incoming.major < current.major) {
    return false;
  }

  if (
    incoming.major === current.major &&
    incoming.minor < current.minor
  ) {
    return false;
  }

  if (
    incoming.major === current.major &&
    incoming.minor === current.minor &&
    incoming.patch < current.patch
  ) {
    return false;
  }

  return true;
}
