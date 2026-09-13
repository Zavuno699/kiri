import {
  requireDashboardRead,
} from "../guards/requireDashboardRead";

import {
  requireDashboardWrite,
} from "../guards/requireDashboardWrite";

export const dashboardSecurityRuntime = {
  requireRead:
    requireDashboardRead,

  requireWrite:
    requireDashboardWrite,
};
