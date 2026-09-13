import {
  loadDashboardPage,
} from "./loadDashboardPage";

import {
  getDashboardPageState,
} from "../state/dashboardPageState";

import {
  markDomainPageStale,
} from "../../../application/ui/runtime/markDomainPageStale";

export const dashboardPageController = {
  load:
    loadDashboardPage,

  state:
    getDashboardPageState,

  invalidate() {
    markDomainPageStale(
      "dashboard",
    );
  },
};
