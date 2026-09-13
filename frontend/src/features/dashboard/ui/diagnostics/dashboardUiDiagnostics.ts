import {
  getDashboardPageState,
} from "../state/dashboardPageState";

import {
  getDashboardPageActions,
} from "../actions/getDashboardPageActions";

export function getDashboardUiDiagnostics() {
  return {
    domain:
      "dashboard",

    state:
      getDashboardPageState(),

    actions:
      getDashboardPageActions(),
  };
}
