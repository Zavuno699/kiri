import {
  getLocksEntityFabric,
} from "../locksEntityFabric";

export function getLocksDataFabricDiagnostics() {
  return {
    domain:
      "locks",
    state:
      getLocksEntityFabric(),
  };
}
