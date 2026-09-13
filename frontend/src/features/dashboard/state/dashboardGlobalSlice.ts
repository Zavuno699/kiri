import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "dashboard",
    domain:
      "dashboard",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getDashboardGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setDashboardGlobalSlice(
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
