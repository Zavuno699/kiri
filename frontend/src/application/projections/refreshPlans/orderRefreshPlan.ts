import type { ProjectionRefreshPlan } from "./projectionRefreshPlan";

export function orderRefreshPlan(
  plan: ProjectionRefreshPlan,
): ProjectionRefreshPlan {
  return {
    ...plan,
    steps: [...plan.steps].sort(
      (left, right) => left.order - right.order,
    ),
  };
}
