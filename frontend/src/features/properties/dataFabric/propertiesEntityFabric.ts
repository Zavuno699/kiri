import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getPropertiesEntityFabric() {
  return getStateSlice(
    "properties",
  );
}
