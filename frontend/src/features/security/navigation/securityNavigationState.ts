import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getSecurityNavigationState() {
  return {
    domain:
      "security",

    selectedRoute:
      getSelectedRoute(),
  };
}
