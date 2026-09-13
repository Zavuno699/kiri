import type { ProjectionFreshnessPolicy } from "./projectionFreshness";

export const defaultProjectionFreshnessPolicy: ProjectionFreshnessPolicy = {
  freshWithinMs: 5_000,
  agingWithinMs: 30_000,
};

export const strictProjectionFreshnessPolicy: ProjectionFreshnessPolicy = {
  freshWithinMs: 2_000,
  agingWithinMs: 10_000,
};
