import type { ProjectionVersion } from "../projectionVersion";
import type { ProjectionVersionVerification } from "./versionVerification";

export function verifyProjectionVersion(
  projectionKey: string,
  expected: ProjectionVersion,
  actual: ProjectionVersion,
  now = new Date(),
): ProjectionVersionVerification {
  const reasons: string[] = [];

  if (expected.major !== actual.major) {
    reasons.push("Major version mismatch");
  }

  if (expected.minor !== actual.minor) {
    reasons.push("Minor version mismatch");
  }

  if (expected.patch !== actual.patch) {
    reasons.push("Patch version mismatch");
  }

  return {
    projectionKey,
    expected,
    actual,
    compatible: reasons.length === 0,
    verifiedAt: now.toISOString(),
    reasons,
  };
}
