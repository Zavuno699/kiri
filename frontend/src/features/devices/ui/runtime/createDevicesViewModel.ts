import {
  getDevicesPageState,
} from "../state/devicesPageState";

import {
  getDevicesPageActions,
} from "../actions/getDevicesPageActions";

export function createDevicesViewModel() {
  const state =
    getDevicesPageState();

  return {
    domain:
      "devices",

    title:
      "Devices",

    data:
      state.data?.data ??
      null,

    status:
      state.runtime?.status ??
      "idle",

    error:
      state.runtime?.error ??
      null,

    actions:
      getDevicesPageActions(),
  };
}
