import {
  getLeasesRuntimeState,
} from "../state/leasesRuntimeState";

export function getLeasesRuntimeDiagnostics() {
  return {
    domain:
      "leases",

    runtime:
      getLeasesRuntimeState(),
  };
}
