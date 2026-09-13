import type { ProjectionRefreshRequest } from "../refresh/projectionRefreshRequest";
import type { ProjectionRefreshResult } from "../refresh/projectionRefreshResult";
import { ProjectionRefreshOrchestrator } from "./projectionRefreshOrchestrator";
import type { ProjectionRefreshPlan } from "../refreshPlans/projectionRefreshPlan";

export async function runRefreshPlan(
  plan: ProjectionRefreshPlan,
  orchestrator: ProjectionRefreshOrchestrator,
  requestFactory: (
    step: ProjectionRefreshPlan["steps"][number],
  ) => ProjectionRefreshRequest,
): Promise<ProjectionRefreshResult[]> {
  const results: ProjectionRefreshResult[] = [];

  for (const step of plan.steps) {
    const request = requestFactory(step);
    const result = await orchestrator.refresh(request);
    results.push(result);

    if (step.blocking && result.status === "failed") {
      break;
    }
  }

  return results;
}
