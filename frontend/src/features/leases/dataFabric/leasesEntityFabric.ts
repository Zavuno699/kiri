import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getLeasesEntityFabric() {
  return getStateSlice(
    "leases",
  );
}
