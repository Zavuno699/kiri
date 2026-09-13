import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getLocksEntityFabric() {
  return getStateSlice(
    "locks",
  );
}
