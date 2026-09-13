import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getSecurityApiState() {
  return {
    domain:
      "security",

    api:
      getApiRuntimeState(),
  };
}
