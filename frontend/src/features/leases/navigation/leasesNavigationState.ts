import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

export function getLeasesNavigationState() {
  return {
    domain:
      "leases",

    selectedRoute:
      getSelectedRoute(),
  };
}
