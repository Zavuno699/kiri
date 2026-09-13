import {
  getSecurityEntityFabric,
} from "../securityEntityFabric";

export function getSecurityDataFabricDiagnostics() {
  return {
    domain:
      "security",
    state:
      getSecurityEntityFabric(),
  };
}
