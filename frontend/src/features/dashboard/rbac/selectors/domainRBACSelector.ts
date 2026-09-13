import { dashboardRBACAllowed } from "../guards/domainGuard";

export const selectDashboardRBACAllowed = (): boolean =>
  dashboardRBACAllowed();
