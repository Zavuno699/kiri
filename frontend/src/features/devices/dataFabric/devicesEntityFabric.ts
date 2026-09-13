import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getDevicesEntityFabric() {
  return getStateSlice(
    "devices",
  );
}
