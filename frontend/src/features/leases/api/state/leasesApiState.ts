import {
  getApiRuntimeState,
} from "../../../../application/api/state/apiRuntimeState";

export function getLeasesApiState() {
  return {
    domain:
      "leases",

    api:
      getApiRuntimeState(),
  };
}
