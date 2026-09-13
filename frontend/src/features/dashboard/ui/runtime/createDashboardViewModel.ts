import {
  getDashboardPageState,
} from "../state/dashboardPageState";

import {
  getDashboardPageActions,
} from "../actions/getDashboardPageActions";

export function createDashboardViewModel() {
  const state =
    getDashboardPageState();

  return {
    domain:
      "dashboard",

    title:
      "Dashboard",

    data:
      state.data?.data ??
      null,

    status:
      state.runtime?.status ??
      "idle",

    error:
      state.runtime?.error ??
      null,

    actions:
      getDashboardPageActions(),
  };
}
