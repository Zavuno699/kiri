import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "payments",
    domain:
      "payments",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getPaymentsGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setPaymentsGlobalSlice(
  data: unknown,
): void {
  slice = {
    ...slice,
    data,
    version:
      slice.version + 1,
    updatedAt:
      new Date().toISOString(),
  };
}
