import {
  getPropertiesGlobalState,
} from "./getPropertiesGlobalState";

export function PropertiesGlobalStatus() {
  const state =
    getPropertiesGlobalState();

  return {
    domain:
      "properties",

    state,
  };
}
