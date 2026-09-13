import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getDevicesGlobalState() {
  return getStateSlice(
    "devices",
  );
}
