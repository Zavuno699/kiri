import type { ProjectionVersion } from "../projectionVersion";

export type LegacyProjectionState = {
  projection?: string;
  version?: number | string;
  data?: unknown;
  state?: unknown;
};

export type CanonicalProjectionState = {
  projectionKey: string;
  version: ProjectionVersion;
  state: unknown;
};

export function adaptLegacyProjection(
  value: LegacyProjectionState,
): CanonicalProjectionState {
  const rawVersion = value.version;

  return {
    projectionKey:
      value.projection ?? "unknown.projection",
    version: {
      major: 1,
      minor:
        typeof rawVersion === "number"
          ? rawVersion
          : 0,
      patch: 0,
    },
    state:
      value.state !== undefined
        ? value.state
        : value.data,
  };
}
