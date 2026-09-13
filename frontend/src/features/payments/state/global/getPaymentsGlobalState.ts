import {
  getStateSlice,
} from "../../../../application/globalState/registry/stateSliceRegistry";

export function getPaymentsGlobalState() {
  return getStateSlice(
    "payments",
  );
}
