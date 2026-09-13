import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getLeasesGlobalState() {
  return getStateSlice(
    "leases",
  );
}
