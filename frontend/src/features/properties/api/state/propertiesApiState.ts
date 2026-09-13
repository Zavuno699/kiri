import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getPropertiesApiState() {
  return {
    domain:
      "properties",

    api:
      getApiRuntimeState(),
  };
}
