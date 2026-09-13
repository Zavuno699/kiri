import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getSecurityEntityFabric() {
  return getStateSlice(
    "security",
  );
}
