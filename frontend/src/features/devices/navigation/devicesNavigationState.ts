import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getDevicesNavigationState() {
  return {
    domain:
      "devices",

    selectedRoute:
      getSelectedRoute(),
  };
}
