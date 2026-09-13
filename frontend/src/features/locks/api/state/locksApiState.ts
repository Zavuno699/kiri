import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getLocksApiState() {
  return {
    domain:
      "locks",

    api:
      getApiRuntimeState(),
  };
}
