import type { ProjectionVersion } from "./projectionVersion";

export type ProjectionVersionRange = {
  minimum: ProjectionVersion;
  maximum: ProjectionVersion;
};

function numeric(version: ProjectionVersion): number {
  return (
    version.major * 1_000_000 +
    version.minor * 1_000 +
    version.patch
  );
}

export function isProjectionVersionSupported(
  version: ProjectionVersion,
  range: ProjectionVersionRange,
): boolean {
  const value = numeric(version);

  return (
    value >= numeric(range.minimum) &&
    value <= numeric(range.maximum)
  );
}
