import {
  getPropertiesRuntimeState,
} from "../state/propertiesRuntimeState";

export function getPropertiesRuntimeDiagnostics() {
  return {
    domain:
      "properties",

    runtime:
      getPropertiesRuntimeState(),
  };
}
