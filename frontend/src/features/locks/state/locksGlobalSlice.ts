import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "locks",
    domain:
      "locks",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getLocksGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setLocksGlobalSlice(
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
