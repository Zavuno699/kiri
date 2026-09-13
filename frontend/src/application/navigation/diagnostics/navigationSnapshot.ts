import {
  getNavigationDiagnostics,
} from "./navigationDiagnostics";

import {
  getSelectedRoute,
} from "../state/navigationStore";

export function getNavigationSnapshot() {
  const diagnostics =
    getNavigationDiagnostics();

  return {
    selectedRoute:
      getSelectedRoute(),

    ...diagnostics,
  };
}
