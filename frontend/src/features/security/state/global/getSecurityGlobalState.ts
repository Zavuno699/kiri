import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getSecurityGlobalState() {
  return getStateSlice(
    "security",
  );
}
