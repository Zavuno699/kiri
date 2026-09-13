import type {
  StateSlice,
} from "../../../application/globalState/contracts/stateSlice";

let slice:
  StateSlice = {
    key:
      "properties",
    domain:
      "properties",
    data:
      null,
    version:
      0,
    updatedAt:
      null,
  };

export function getPropertiesGlobalSlice(): StateSlice {
  return {
    ...slice,
  };
}

export function setPropertiesGlobalSlice(
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
