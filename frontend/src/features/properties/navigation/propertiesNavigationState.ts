import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getPropertiesNavigationState() {
  return {
    domain:
      "properties",

    selectedRoute:
      getSelectedRoute(),
  };
}
