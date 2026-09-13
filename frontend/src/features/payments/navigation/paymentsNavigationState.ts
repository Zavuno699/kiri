import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getPaymentsNavigationState() {
  return {
    domain:
      "payments",

    selectedRoute:
      getSelectedRoute(),
  };
}
