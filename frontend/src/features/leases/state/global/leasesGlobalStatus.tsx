import {
  getLeasesGlobalState,
} from "./getLeasesGlobalState";

export function LeasesGlobalStatus() {
  const state =
    getLeasesGlobalState();

  return {
    domain:
      "leases",

    state,
  };
}
