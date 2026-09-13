import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getLocksGlobalState() {
  return getStateSlice(
    "locks",
  );
}
