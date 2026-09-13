import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getDashboardEntityFabric() {
  return getStateSlice(
    "dashboard",
  );
}
