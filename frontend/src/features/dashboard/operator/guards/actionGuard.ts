import { dashboardActionVisible } from "../visibility/actionVisibility";

export function canUseDashboardOperatorAction(): boolean {
  return dashboardActionVisible();
}
