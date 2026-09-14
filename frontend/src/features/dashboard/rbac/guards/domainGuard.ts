import { evaluateDashboardRBAC } from "../domainPermission";

export function dashboardRBACAllowed(): boolean {
  return evaluateDashboardRBAC().allows();
}
