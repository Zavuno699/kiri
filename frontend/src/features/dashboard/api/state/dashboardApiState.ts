import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getDashboardApiState() {
  return {
    domain:
      "dashboard",

    api:
      getApiRuntimeState(),
  };
}
