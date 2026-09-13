import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getPaymentsApiState() {
  return {
    domain:
      "payments",

    api:
      getApiRuntimeState(),
  };
}
