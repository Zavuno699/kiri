import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getLocksNavigationState() {
  return {
    domain:
      "locks",

    selectedRoute:
      getSelectedRoute(),
  };
}
