import type { ProjectionReplayPlan } from "./projectionReplayPlan";

export function createReplayPlan(
  steps: ProjectionReplayPlan["steps"],
  mode: ProjectionReplayPlan["mode"],
  now = new Date(),
): ProjectionReplayPlan {
  return {
    planId: `replay:${mode}:${now.getTime()}`,
    createdAt: now.toISOString(),
    mode,
    steps,
  };
}
