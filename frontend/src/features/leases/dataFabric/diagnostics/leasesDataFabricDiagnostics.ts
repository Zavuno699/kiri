import {
  getLeasesEntityFabric,
} from "../leasesEntityFabric";

export function getLeasesDataFabricDiagnostics() {
  return {
    domain:
      "leases",
    state:
      getLeasesEntityFabric(),
  };
}
