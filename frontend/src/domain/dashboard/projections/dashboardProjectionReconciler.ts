import type { DashboardProjection } from "./dashboardProjection";

export function reconcileDashboardProjection(
  current: DashboardProjection | undefined,
  next: DashboardProjection,
): DashboardProjection {
  if (!current) return next;

  return {
    ...next,
    projectionVersion: Math.max(
      current.projectionVersion,
      next.projectionVersion,
    ),
  };
}
