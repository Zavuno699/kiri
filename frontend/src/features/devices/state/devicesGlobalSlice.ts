import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "devices",
    domain:
      "devices",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getDevicesGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setDevicesGlobalSlice(
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
