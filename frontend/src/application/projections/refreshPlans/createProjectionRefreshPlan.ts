import type { ProjectionRefreshPlan } from "./projectionRefreshPlan";

export function createProjectionRefreshPlan(
  steps: ProjectionRefreshPlan["steps"],
  now = new Date(),
): ProjectionRefreshPlan {
  return {
    planId: `refresh:${now.getTime()}`,
    createdAt: now.toISOString(),
    steps,
  };
}
