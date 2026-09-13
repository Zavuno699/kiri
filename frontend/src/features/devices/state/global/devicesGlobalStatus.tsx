import {
  getDevicesGlobalState,
} from "./getDevicesGlobalState";

export function DevicesGlobalStatus() {
  const state =
    getDevicesGlobalState();

  return {
    domain:
      "devices",

    state,
  };
}
