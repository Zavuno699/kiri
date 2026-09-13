import type { ProjectionVersion } from "./projectionVersion";

export type ProjectionCompatibility =
  | "compatible"
  | "migration-required"
  | "rebuild-required"
  | "unsupported";

export function evaluateProjectionCompatibility(
  current: ProjectionVersion,
  target: ProjectionVersion,
): ProjectionCompatibility {
  if (
    current.major === target.major &&
    current.minor === target.minor &&
    current.patch === target.patch
  ) {
    return "compatible";
  }

  if (current.major === target.major) {
    return "migration-required";
  }

  if (target.major > current.major) {
    return "rebuild-required";
  }

  return "unsupported";
}
