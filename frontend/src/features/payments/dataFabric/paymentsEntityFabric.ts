import {
  getStateSlice,
} from "../../../application/dataFabric/registry/stateSliceRegistry";

export function getPaymentsEntityFabric() {
  return getStateSlice(
    "payments",
  );
}
