import {
  projectQueryResult,
} from "../../../projections/runtime/projectQueryResult";

export async function executeDashboardRefreshWorkflow(): Promise<unknown> {
  return projectQueryResult(
    "dashboard",
    "dashboard",
    {
      type:
        "dashboard.refresh",
    },
  );
}
