import { actionAllowed } from "../../../application/operatorActions/guards/actionGuard";

export function dashboardCommandAuthorized(): boolean {
  return actionAllowed("dashboard.view");
}
