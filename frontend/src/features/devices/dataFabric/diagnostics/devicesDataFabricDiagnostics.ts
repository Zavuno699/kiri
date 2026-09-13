import {
  getDevicesEntityFabric,
} from "../devicesEntityFabric";

export function getDevicesDataFabricDiagnostics() {
  return {
    domain:
      "devices",
    state:
      getDevicesEntityFabric(),
  };
}
