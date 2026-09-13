import {
  getPropertiesEntityFabric,
} from "../propertiesEntityFabric";

export function getPropertiesDataFabricDiagnostics() {
  return {
    domain:
      "properties",
    state:
      getPropertiesEntityFabric(),
  };
}
