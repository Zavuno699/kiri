import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function dashboardActionVisible(): boolean {
  return actionAllowed("dashboard.view");
}
