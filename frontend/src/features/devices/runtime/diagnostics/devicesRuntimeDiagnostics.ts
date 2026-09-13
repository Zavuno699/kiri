import {
  getDevicesRuntimeState,
} from "../state/devicesRuntimeState";

export function getDevicesRuntimeDiagnostics() {
  return {
    domain:
      "devices",

    runtime:
      getDevicesRuntimeState(),
  };
}
