import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getDevicesApiState() {
  return {
    domain:
      "devices",

    api:
      getApiRuntimeState(),
  };
}
