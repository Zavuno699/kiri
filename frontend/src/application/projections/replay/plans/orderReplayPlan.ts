import type { ProjectionReplayPlan } from "./projectionReplayPlan";

export function orderReplayPlan(
  plan: ProjectionReplayPlan,
): ProjectionReplayPlan {
  return {
    ...plan,
    steps: [...plan.steps].sort(
      (left, right) => left.order - right.order,
    ),
  };
}
