import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getDashboardNavigationState() {
  return {
    domain:
      "dashboard",

    selectedRoute:
      getSelectedRoute(),
  };
}
