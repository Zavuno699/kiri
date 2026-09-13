import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "security",
    domain:
      "security",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getSecurityGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setSecurityGlobalSlice(
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
