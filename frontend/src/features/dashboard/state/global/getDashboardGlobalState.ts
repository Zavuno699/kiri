import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getDashboardGlobalState() {
  return getStateSlice(
    "dashboard",
  );
}
