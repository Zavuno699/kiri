import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getPropertiesGlobalState() {
  return getStateSlice(
    "properties",
  );
}
